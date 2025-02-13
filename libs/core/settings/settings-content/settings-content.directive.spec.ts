import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SettingsContentDirective } from '@fundamental-ngx/core/settings';

@Component({
    template: ` <div #directiveElement fd-settings-content [noPadding]="noPadding" [noBackground]="noBackground">Settings Content Test Text</div> `,
    standalone: true,
    imports: [SettingsContentDirective]
})
class TestComponent {
    @ViewChild('directiveElement', { static: true })
    ref!: ElementRef;

    noPadding = false;
    noBackground = false;
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

    it('should assign base class', () => {
        expect(component.ref.nativeElement.classList.contains('fd-settings__content')).toBeTrue();
    });

    it('should not have no-padding class by default', () => {
        expect(component.ref.nativeElement.classList.contains('fd-settings__content--no-padding')).toBeFalse();
    });

    it('should not have no-background class by default', () => {
        expect(component.ref.nativeElement.classList.contains('fd-settings__content--no-background')).toBeFalse();
    });

    it('should add no-padding class when noPadding is true', () => {
        component.noPadding = true;
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList.contains('fd-settings__content--no-padding')).toBeTrue();
    });

    it('should remove no-padding class when noPadding is set to false', () => {
        component.noPadding = true;
        fixture.detectChanges();
        component.noPadding = false;
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList.contains('fd-settings__content--no-padding')).toBeFalse();
    });

    it('should add no-background class when noBackground is true', () => {
        component.noBackground = true;
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList.contains('fd-settings__content--no-background')).toBeTrue();
    });

    it('should remove no-background class when noBackground is set to false', () => {
        component.noBackground = true;
        fixture.detectChanges();
        component.noBackground = false;
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList.contains('fd-settings__content--no-background')).toBeFalse();
    });
});
