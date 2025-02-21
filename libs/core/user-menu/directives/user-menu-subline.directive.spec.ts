import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserMenuSublineDirective } from './user-menu-subline.directive';

@Component({
    template: `<div fd-user-menu-subline #directiveElement> User Menu Subline Test </div>`,
    standalone: true,
    imports: [UserMenuSublineDirective]
})
class TestComponent {
    @ViewChild('directiveElement', { static: true })
    ref!: ElementRef;
}

describe('UserMenuSublineDirective', () => {
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
        expect(component.ref.nativeElement.classList.contains('fd-user-menu__subline')).toBeTrue();
    });
});
