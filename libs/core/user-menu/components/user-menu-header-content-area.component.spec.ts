import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserMenuHeaderContentAreaComponent } from './user-menu-header-content-area.component';

@Component({
    template: `<div fd-user-menu-header-content-area #elRef>
        <span class="projected-content">Test Content</span>
    </div>`,
    imports: [UserMenuHeaderContentAreaComponent]
})
class TestComponent {
    @ViewChild('elRef', { read: ElementRef })
    elRef: ElementRef;
}

describe('UserMenuHeaderContentAreaComponent', () => {
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
        expect(component.elRef.nativeElement.classList).toContain('fd-user-menu__header-content-area');
    });

    it('should project content', () => {
        const projectedContent = component.elRef.nativeElement.querySelector('.projected-content');
        expect(projectedContent).toBeTruthy();
        expect(projectedContent.textContent).toBe('Test Content');
    });
});
