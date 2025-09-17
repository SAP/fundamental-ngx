import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UserMenuControlElementDirective } from './user-menu-control-element.directive';

@Component({
    template: `<span fd-user-menu-control-element>User Menu Control Element Test</span>`,
    standalone: true,
    imports: [UserMenuControlElementDirective]
})
class TestComponent {}

describe('UserMenuControlElementDirective', () => {
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

        debugElement = fixture.debugElement.query(By.directive(UserMenuControlElementDirective));
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });
});
