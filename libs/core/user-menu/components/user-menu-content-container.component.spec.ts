import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserMenuContentContainerComponent } from './user-menu-content-container.component';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    template: `<div fd-user-menu-content-container #elRef>Content</div>`,
    imports: [UserMenuContentContainerComponent]
})
class TestComponent {
    @ViewChild('elRef', { read: ElementRef })
    elRef: ElementRef;
}

describe('UserMenuContentContainerComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.elRef.nativeElement.classList).toContain('fd-user-menu__content-container');
    });
});
