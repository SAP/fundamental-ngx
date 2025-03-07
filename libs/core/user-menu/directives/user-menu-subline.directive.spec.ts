import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UserMenuSublineDirective } from './user-menu-subline.directive';

@Component({
    template: `<span fd-user-menu-subline>User Menu Subline Test</span>`,
    standalone: true,
    imports: [UserMenuSublineDirective]
})
class TestComponent {}

describe('UserMenuSublineDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);

        fixture.detectChanges();

        debugElement = fixture.debugElement.query(By.directive(UserMenuSublineDirective));
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add class to host', () => {
        expect(debugElement.nativeElement.className.includes('fd-user-menu__subline')).toBe(true);
    });
});
