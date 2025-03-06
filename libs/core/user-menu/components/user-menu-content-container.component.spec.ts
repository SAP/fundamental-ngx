import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UserMenuContentContainerComponent } from './user-menu-content-container.component';

@Component({
    template: `<div fd-user-menu-content-container><p>Content Container Content</p></div>`
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

    it('should create the component', () => {
        const contentContainerEl = fixture.nativeElement.querySelector('[fd-user-menu-content-container]');
        expect(contentContainerEl).toBeTruthy();
    });

    it('should project content inside', () => {
        const contentContainerEl = fixture.nativeElement.querySelector('[fd-user-menu-content-container]');
        expect(contentContainerEl.textContent).toContain('Content Container Content');
    });
});
