import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserMenuHeaderDirective } from './user-menu-header.directive';

@Component({
    template: `<div fd-user-menu-header #directiveElement>User Menu Header Test</div>`,
    standalone: true,
    imports: [UserMenuHeaderDirective]
})
class TestComponent {
    @ViewChild('directiveElement', { static: true })
    ref!: ElementRef;
}

describe('UserMenuHeaderDirective', () => {
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
        expect(component.ref.nativeElement.classList.contains('fd-user-menu__header')).toBeTrue();
    });
});
