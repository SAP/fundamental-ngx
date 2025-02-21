import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserMenuUserNameDirective } from './user-menu-user-name.directive';

@Component({
    template: `<div fd-user-menu-user-name #directiveElement> User Menu User Name Test </div>`,
    standalone: true,
    imports: [UserMenuUserNameDirective]
})
class TestComponent {
    @ViewChild('directiveElement', { static: true })
    ref!: ElementRef;
}

describe('UserMenuUserNameDirective', () => {
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

    it('should assign base class', () => {
        expect(component.ref.nativeElement.classList.contains('fd-user-menu__user-name')).toBeTrue();
    });
});
