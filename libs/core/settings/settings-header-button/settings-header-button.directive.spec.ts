import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SettingsHeaderButtonDirective } from '@fundamental-ngx/core/settings';

@Component({
    template: ` <div #directiveElement fd-settings-header-button>Settings Header Button Test Text</div> `,
    standalone: true,
    imports: [SettingsHeaderButtonDirective]
})
class TestComponent {
    @ViewChild('directiveElement', { static: true })
    ref!: ElementRef;
}

describe('SettingsHeaderButtonDirective', () => {
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
});
