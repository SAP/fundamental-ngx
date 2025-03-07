import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UserMenuHeaderContainerDirective } from './user-menu-header-container.directive';

@Component({
    template: `<span fd-user-menu-header-container>User Menu Header Container Test</span>`,
    standalone: true,
    imports: [UserMenuHeaderContainerDirective]
})
class TestComponent {}

describe('UserMenuHeaderContainerDirective', () => {
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

        debugElement = fixture.debugElement.query(By.directive(UserMenuHeaderContainerDirective));
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add class to host', () => {
        expect(debugElement.nativeElement.className.includes('fd-user-menu__header-container')).toBe(true);
    });
});
