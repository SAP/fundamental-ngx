import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MenuTitleDirective } from './menu-title.directive';

@Component({
    template: '<div fd-menu-title>{{ menuTitle }}</div>',
    standalone: true,
    imports: [MenuTitleDirective]
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
            imports: [TestComponent]
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
