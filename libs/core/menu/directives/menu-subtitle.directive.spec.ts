import { Component, DebugElement, ViewChild, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MenuSubtitleDirective } from './menu-subtitle.directive';

@Component({
    template: '<div fd-menu-subtitle [truncate]="truncate()">{{ subtitleText() }}</div>',
    imports: [MenuSubtitleDirective]
})
class TestComponent {
    @ViewChild(MenuSubtitleDirective) directive: MenuSubtitleDirective;
    readonly subtitleText = input('Menu Subtitle');
    readonly truncate = input(false);
}

describe('MenuSubtitleDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directive: MenuSubtitleDirective;
    let directiveElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        directive = component.directive;
        directiveElement = fixture.debugElement.query(By.directive(MenuSubtitleDirective));
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });

    it('should apply fd-menu__subtitle class', () => {
        expect(directiveElement.nativeElement.classList.contains('fd-menu__subtitle')).toBe(true);
    });

    it('should return element textContent as subtitle', () => {
        expect(directive.subtitle).toBe('Menu Subtitle');
    });

    it('should update subtitle when textContent changes', () => {
        fixture.componentRef.setInput('subtitleText', 'Updated Subtitle');
        fixture.detectChanges();

        expect(directive.subtitle).toBe('Updated Subtitle');
    });

    it('should handle empty content', () => {
        fixture.componentRef.setInput('subtitleText', '');
        fixture.detectChanges();

        expect(directive.subtitle).toBe('');
    });

    it('should not apply truncate class by default', () => {
        expect(directiveElement.nativeElement.classList.contains('fd-menu__subtitle--truncate')).toBe(false);
    });

    it('should apply truncate class when truncate is true', () => {
        fixture.componentRef.setInput('truncate', true);
        fixture.detectChanges();

        expect(directiveElement.nativeElement.classList.contains('fd-menu__subtitle--truncate')).toBe(true);
    });

    it('should remove truncate class when truncate is set back to false', () => {
        fixture.componentRef.setInput('truncate', true);
        fixture.detectChanges();
        expect(directiveElement.nativeElement.classList.contains('fd-menu__subtitle--truncate')).toBe(true);

        fixture.componentRef.setInput('truncate', false);
        fixture.detectChanges();
        expect(directiveElement.nativeElement.classList.contains('fd-menu__subtitle--truncate')).toBe(false);
    });
});
