import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SettingsProfileCardNameDirective } from './settings-profile-card-name.directive';

@Component({
    template: `<div #directiveElement fd-settings-profile-card-name>Settings Profile Card Name Directive Test</div>`,
    standalone: true,
    imports: [SettingsProfileCardNameDirective]
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}
describe('SettingsProfileCardNameDirective', () => {
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
        expect(component.ref.nativeElement.className).toContain('fd-settings__profile-card-name');
    });
});
