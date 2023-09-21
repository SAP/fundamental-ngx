import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogConfig } from '../utils/dialog-config.class';
import { DialogRef } from '../utils/dialog-ref.class';
import { DialogBodyComponent } from './dialog-body.component';

describe('DialogBodyComponent', () => {
    let component: DialogBodyComponent;
    let fixture: ComponentFixture<DialogBodyComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DialogBodyComponent],
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
});
