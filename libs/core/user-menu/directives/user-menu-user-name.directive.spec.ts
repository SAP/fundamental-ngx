import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UserMenuUserNameDirective } from './user-menu-user-name.directive';

@Component({
    template: `<span fd-user-menu-user-name>User Menu User Name Test</span>`,
    standalone: true,
    imports: [UserMenuUserNameDirective]
})
class TestComponent {}

describe('UserMenuUserNameDirective', () => {
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

        debugElement = fixture.debugElement.query(By.directive(UserMenuUserNameDirective));
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add class to host', () => {
        expect(debugElement.nativeElement.className.includes('fd-user-menu__user-name')).toBe(true);
    });
});
