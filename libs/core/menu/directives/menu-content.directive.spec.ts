import { Component, DebugElement, ViewChild, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MenuContentDirective } from './menu-content.directive';

@Component({
    template: '<div fd-menu-content>{{ contentText() }}</div>',
    imports: [MenuContentDirective]
})
class TestComponent {
    @ViewChild(MenuContentDirective) directive: MenuContentDirective;
    readonly contentText = input('Menu Content');
}

describe('MenuContentDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directive: MenuContentDirective;
    let directiveElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        directive = component.directive;
        directiveElement = fixture.debugElement.query(By.directive(MenuContentDirective));
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });

    it('should apply fd-menu__content class', () => {
        expect(directiveElement.nativeElement.classList.contains('fd-menu__content')).toBe(true);
    });

    it('should render projected content', () => {
        expect(directiveElement.nativeElement.textContent).toBe('Menu Content');
    });

    it('should update when content changes', () => {
        fixture.componentRef.setInput('contentText', 'Updated Content');
        fixture.detectChanges();

        expect(directiveElement.nativeElement.textContent).toBe('Updated Content');
    });
});
