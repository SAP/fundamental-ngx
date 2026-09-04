import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SettingsSpacingDirective } from './settings-spacing.directive';

@Component({
    template: `<span #directiveElement fd-settings-spacing>Settings Spacing Directive Test</span>`,
    imports: [SettingsSpacingDirective]
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}

describe('SettingsSpacingDirective', () => {
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
        expect(component.ref.nativeElement.className).toContain('fd-settings__spacing');
    });

    it('should have proper ARIA attributes', () => {
        expect(component.ref.nativeElement.getAttribute('role')).toBe('presentation');
        expect(component.ref.nativeElement.getAttribute('aria-hidden')).toBe('true');
    });
});

describe('SettingsSpacingDirective with size modifiers', () => {
    it('should apply small modifier class', () => {
        @Component({
            template: `<span fd-settings-spacing size="small"></span>`,
            standalone: true,
            imports: [SettingsSpacingDirective]
        })
        class TestSmallComponent {}

        const fixture = TestBed.createComponent(TestSmallComponent);
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('span');

        expect(element.className).toContain('fd-settings__spacing');
        expect(element.className).toContain('fd-settings__spacing--small');
    });

    it('should apply medium modifier class', () => {
        @Component({
            template: `<span fd-settings-spacing size="medium"></span>`,
            standalone: true,
            imports: [SettingsSpacingDirective]
        })
        class TestMediumComponent {}

        const fixture = TestBed.createComponent(TestMediumComponent);
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('span');

        expect(element.className).toContain('fd-settings__spacing');
        expect(element.className).toContain('fd-settings__spacing--medium');
    });

    it('should apply large modifier class', () => {
        @Component({
            template: `<span fd-settings-spacing size="large"></span>`,
            standalone: true,
            imports: [SettingsSpacingDirective]
        })
        class TestLargeComponent {}

        const fixture = TestBed.createComponent(TestLargeComponent);
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('span');

        expect(element.className).toContain('fd-settings__spacing');
        expect(element.className).toContain('fd-settings__spacing--large');
    });

    it('should apply form modifier class', () => {
        @Component({
            template: `<span fd-settings-spacing size="form"></span>`,
            standalone: true,
            imports: [SettingsSpacingDirective]
        })
        class TestFormComponent {}

        const fixture = TestBed.createComponent(TestFormComponent);
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('span');

        expect(element.className).toContain('fd-settings__spacing');
        expect(element.className).toContain('fd-settings__spacing--form');
    });

    it('should only have base class when size is not provided', () => {
        @Component({
            template: `<span fd-settings-spacing></span>`,
            standalone: true,
            imports: [SettingsSpacingDirective]
        })
        class TestNoSizeComponent {}

        const fixture = TestBed.createComponent(TestNoSizeComponent);
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('span');

        expect(element.className).toBe('fd-settings__spacing');
        expect(element.className).not.toContain('--small');
        expect(element.className).not.toContain('--medium');
        expect(element.className).not.toContain('--large');
        expect(element.className).not.toContain('--form');
    });
});
