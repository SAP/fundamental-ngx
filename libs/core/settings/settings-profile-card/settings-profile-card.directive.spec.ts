import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SettingsProfileCardDirective } from './settings-profile-card.directive';

@Component({
    template: `<div #directiveElement fd-settings-profile-card>Settings Profile Card Directive Test</div>`,
    standalone: true,
    imports: [SettingsProfileCardDirective]
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}
describe('SettingsProfileCardDirective', () => {
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
        expect(component.ref.nativeElement.className).toContain('fd-settings__profile-card');
    });
});
