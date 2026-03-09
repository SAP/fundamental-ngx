import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MenuTitleDirective } from './menu-title.directive';

@Component({
    template: '<div fd-menu-title [truncate]="truncate">{{ titleText }}</div>',
    imports: [MenuTitleDirective]
})
class TestComponent {
    @ViewChild(MenuTitleDirective) directive: MenuTitleDirective;
    titleText = 'Menu Title';
    truncate = false;
}

describe('MenuTitleDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directive: MenuTitleDirective;
    let directiveElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        directive = component.directive;
        directiveElement = fixture.debugElement.query(By.directive(MenuTitleDirective));
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });

    it('should apply fd-menu__title class', () => {
        expect(directiveElement.nativeElement.classList.contains('fd-menu__title')).toBe(true);
    });

    it('should return element textContent as title', () => {
        expect(directive.title).toBe('Menu Title');
    });

    it('should bind title attribute to element textContent', () => {
        expect(directiveElement.nativeElement.getAttribute('title')).toBe('Menu Title');
    });

    it('should update title when textContent changes', () => {
        component.titleText = 'Updated Title';
        fixture.detectChanges();

        expect(directive.title).toBe('Updated Title');
        expect(directiveElement.nativeElement.getAttribute('title')).toBe('Updated Title');
    });

    it('should handle empty content', () => {
        component.titleText = '';
        fixture.detectChanges();

        expect(directive.title).toBe('');
        expect(directiveElement.nativeElement.getAttribute('title')).toBe('');
    });

    it('should not apply truncate class by default', () => {
        expect(directiveElement.nativeElement.classList.contains('fd-menu__title--truncate')).toBe(false);
    });

    it('should apply truncate class when truncate is true', () => {
        component.truncate = true;
        fixture.detectChanges();

        expect(directiveElement.nativeElement.classList.contains('fd-menu__title--truncate')).toBe(true);
    });

    it('should remove truncate class when truncate is set back to false', () => {
        component.truncate = true;
        fixture.detectChanges();
        expect(directiveElement.nativeElement.classList.contains('fd-menu__title--truncate')).toBe(true);

        component.truncate = false;
        fixture.detectChanges();
        expect(directiveElement.nativeElement.classList.contains('fd-menu__title--truncate')).toBe(false);
    });
});
