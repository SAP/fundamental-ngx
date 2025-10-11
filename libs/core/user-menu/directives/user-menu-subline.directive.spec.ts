import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UserMenuSublineDirective } from './user-menu-subline.directive';

@Component({
    template: `<span fd-user-menu-subline [truncate]="isTruncate">User Menu Subline Test</span>`,
    standalone: true,
    imports: [UserMenuSublineDirective]
})
class TestComponent {
    isTruncate = false;
}

describe('UserMenuSublineDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let debugElement: DebugElement;
    let directiveInstance: UserMenuSublineDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        debugElement = fixture.debugElement.query(By.directive(UserMenuSublineDirective));
        directiveInstance = debugElement.injector.get(UserMenuSublineDirective);
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
        expect(directiveInstance).toBeTruthy();
    });

    it('should add base class to host', () => {
        expect(debugElement.nativeElement.classList).toContain('fd-user-menu__subline');
    });

    it('should not have truncate class by default', () => {
        expect(debugElement.nativeElement.classList).not.toContain('fd-user-menu__subline--truncate');
    });

    it('should add truncate class when truncate is true (via input binding)', () => {
        fixture.componentInstance.isTruncate = true;
        fixture.detectChanges();

        expect(debugElement.nativeElement.classList).toContain('fd-user-menu__subline--truncate');
    });
});
