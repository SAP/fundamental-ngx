import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SettingsSpacingDirective } from './settings-spacing.directive';

@Component({
    template: `<span #directiveElement fd-settings-spacing>Settings Spacing Directive Test</span>`,
    standalone: true,
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

    it('should assign class', () => {
        expect(component.ref.nativeElement.className).toContain('fd-settings__spacing');
    });
});
