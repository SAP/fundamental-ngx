import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SettingsContentDirective } from './settings-content.directive';

@Component({
    template: `<div #directiveElement fd-settings-content [noPadding]="noPadding" [noBackground]="noBackground">Settings Content Directive Test</div>`,
    standalone: true,
    imports: [SettingsContentDirective]
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;

    noBackground = false;
    noPadding = false;
}
describe('SettingsContentDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.className).toContain('fd-settings__content');
    });

    it('should add modifier class for no padding', () => {
        expect(component.ref.nativeElement.className).not.toContain('fd-settings__content--no-padding');
        component.noPadding = true;
        fixture.detectChanges();
        expect(component.ref.nativeElement.className).toContain('fd-settings__content--no-padding');
    });

    it('should add modifier class for no background', () => {
        expect(component.ref.nativeElement.className).not.toContain('fd-settings__content--no-background');
        component.noBackground = true;
        fixture.detectChanges();
        expect(component.ref.nativeElement.className).toContain('fd-settings__content--no-background');
    });
});
