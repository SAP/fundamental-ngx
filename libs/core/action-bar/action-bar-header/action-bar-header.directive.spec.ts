import { Component, ElementRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionBarHeaderDirective } from './action-bar-header.directive';

@Component({
    template: ` <div #directiveElement fd-action-bar-header>Action Bar Header Test Text</div> `,
    imports: [ActionBarHeaderDirective]
})
class TestComponent {
    readonly ref = viewChild.required<ElementRef>('directiveElement');
}

describe('ActionBarHeaderDirective', () => {
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
        expect(component.ref().nativeElement.className).toBe('fd-action-bar__header');
    });
});
