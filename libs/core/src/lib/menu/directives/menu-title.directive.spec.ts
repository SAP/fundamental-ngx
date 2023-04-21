import { MenuTitleDirective } from './menu-title.directive';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

@Component({
    template: '<div fd-menu-title>{{ menuTitle }}</div>',
    standalone: true
})
class TestComponent {
    @ViewChild(MenuTitleDirective) menuTitleDirective: MenuTitleDirective;

    menuTitle = 'Test title';
}

describe('MenuTitleDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let directive: MenuTitleDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent, MenuTitleDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        directive = fixture.componentInstance.menuTitleDirective;
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should return proper title', () => {
        expect(directive.title).toBe(fixture.componentInstance.menuTitle);
    });
});
