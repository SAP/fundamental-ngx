import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserMenuContentContainerComponent } from './user-menu-content-container.component';
import { Component } from '@angular/core';

@Component({
    template: `<div fd-user-menu-content-container>Content</div>`
})
class TestHostComponent {}

describe('UserMenuContentContainerComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent],
            imports: [UserMenuContentContainerComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should apply the correct class', () => {
        const element = fixture.nativeElement.querySelector('div');
        expect(element.classList.contains('fd-user-menu__content-container')).toBeTruthy();
    });

    it('should project content inside the component', () => {
        const element = fixture.nativeElement.querySelector('div');
        expect(element.textContent.trim()).toBe('Content');
    });
});
