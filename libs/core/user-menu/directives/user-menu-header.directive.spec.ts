import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UserMenuHeaderDirective } from './user-menu-header.directive';

@Component({
    template: `<span fd-user-menu-header>User Menu Header Test</span>`,
    standalone: true,
    imports: [UserMenuHeaderDirective]
})
class TestComponent {}

describe('UserMenuHeaderDirective', () => {
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

        debugElement = fixture.debugElement.query(By.directive(UserMenuHeaderDirective));
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add class to host', () => {
        expect(debugElement.nativeElement.className.includes('fd-user-menu__header')).toBe(true);
    });
});
