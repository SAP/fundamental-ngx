import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UserMenuListComponent } from './user-menu-list.component';

@Component({
    template: `
        <fd-user-menu-list>
            <li class="fd-menu__item">Item 1</li>
            <li class="fd-menu__item">Item 2</li>
        </fd-user-menu-list>
    `,
    standalone: true,
    imports: [UserMenuListComponent]
})
class TestHostComponent {}

describe('UserMenuListComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('should render projected content', () => {
        const menuElement = fixture.nativeElement.querySelector('.fd-menu__list');
        expect(menuElement).toBeTruthy();
        expect(menuElement.children.length).toBe(2);
        expect(menuElement.children[0].textContent.trim()).toBe('Item 1');
        expect(menuElement.children[1].textContent.trim()).toBe('Item 2');
    });
});
