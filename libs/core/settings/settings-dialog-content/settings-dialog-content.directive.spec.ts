import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SettingsDialogContentDirective } from './settings-dialog-content.directive';

@Component({
    template: `<div #directiveElement fd-settings-dialog-content>Settings Dialog Content Directive Test</div>`,
    standalone: true,
    imports: [SettingsDialogContentDirective]
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}
describe('SettingsDialogContentDirective', () => {
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
        expect(component.ref.nativeElement.className).toContain('fd-settings__dialog-content');
    });
});
