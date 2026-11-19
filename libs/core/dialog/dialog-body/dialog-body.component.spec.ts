import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Component, viewChild } from '@angular/core';
import { DialogConfig } from '../utils/dialog-config.class';
import { DialogRef } from '../utils/dialog-ref.class';
import { DialogBodyComponent } from './dialog-body.component';

@Component({
    template: `
        <fd-dialog-body [role]="customRole" [ariaLabel]="customAriaLabel">
            <p>Custom attributes body</p>
        </fd-dialog-body>
    `,
    imports: [DialogBodyComponent]
})
class CustomAttributesBodyTestComponent {
    dialogBodyRef = viewChild.required(DialogBodyComponent);
    customRole = 'main';
    customAriaLabel = 'Custom body label';
}

describe('DialogBodyComponent', () => {
    let component: DialogBodyComponent;
    let fixture: ComponentFixture<DialogBodyComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DialogBodyComponent, CustomAttributesBodyTestComponent],
            providers: [DialogConfig, DialogRef]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogBodyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have proper css classes', () => {
        expect(fixture.nativeElement.classList).toContain('fd-dialog__body');
        expect(fixture.nativeElement.classList).not.toContain('fd-dialog__body--no-vertical-padding');

        component.dialogConfig.verticalPadding = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('fd-dialog__body--no-vertical-padding');
    });

    it('should display in loading state', () => {
        expect(fixture.nativeElement.querySelector('fd-busy-indicator')).toBeFalsy();

        component.dialogRef.loading(true);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('fd-busy-indicator')).toBeTruthy();
    });

    it('should have default role attribute', () => {
        expect(fixture.nativeElement.getAttribute('role')).toBe('region');
    });

    it('should allow custom role attribute', () => {
        const customFixture = TestBed.createComponent(CustomAttributesBodyTestComponent);
        customFixture.detectChanges();

        expect(customFixture.nativeElement.querySelector('fd-dialog-body').getAttribute('role')).toBe('main');
    });

    it('should have default aria-label from translation', () => {
        expect(fixture.nativeElement.getAttribute('aria-label')).toBe('Content');
    });

    it('should allow custom aria-label', () => {
        const customFixture = TestBed.createComponent(CustomAttributesBodyTestComponent);
        customFixture.detectChanges();

        expect(customFixture.nativeElement.querySelector('fd-dialog-body').getAttribute('aria-label')).toBe(
            'Custom body label'
        );
    });
});
