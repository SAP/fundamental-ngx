import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UserMenuUserNameDirective } from './user-menu-user-name.directive';

@Component({
    template: `<span fd-user-menu-user-name [truncate]="isTruncate">User Menu User Name Test</span>`,
    standalone: true,
    imports: [UserMenuUserNameDirective]
})
class TestComponent {
    isTruncate = false;
}

describe('UserMenuUserNameDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let debugElement: DebugElement;
    let directiveInstance: UserMenuUserNameDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        debugElement = fixture.debugElement.query(By.directive(UserMenuUserNameDirective));
        directiveInstance = debugElement.injector.get(UserMenuUserNameDirective);
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
        expect(directiveInstance).toBeTruthy();
    });

    it('should add base class to host', () => {
        expect(debugElement.nativeElement.classList).toContain('fd-user-menu__user-name');
    });

    it('should not have truncate class by default', () => {
        expect(debugElement.nativeElement.classList).not.toContain('fd-user-menu__user-name--truncate');
    });

    it('should add truncate class when truncate is true (via input binding)', () => {
        fixture.componentInstance.isTruncate = true;
        fixture.detectChanges();

        expect(debugElement.nativeElement.classList).toContain('fd-user-menu__user-name--truncate');
    });
});
