import { Component, ElementRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionBarMobileDirective } from './action-bar-mobile.directive';

@Component({
    template: ` <div #directiveElement fd-action-bar-mobile>Action Bar Mobile Test Text</div> `,
    imports: [ActionBarMobileDirective]
})
class TestComponent {
    readonly ref = viewChild.required<ElementRef>('directiveElement');
}

describe('ActionBarMobileDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref().nativeElement.classList.contains('fd-action-bar__mobile')).toBe(true);
    });
});
