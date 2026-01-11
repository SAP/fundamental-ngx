import { Component, ElementRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionBarBackDirective } from './action-bar-back.directive';

@Component({
    template: ` <div #directiveElement fd-action-bar-back>Action Bar Back Test Text</div> `,
    imports: [ActionBarBackDirective]
})
class TestComponent {
    readonly ref = viewChild.required<ElementRef>('directiveElement');
}

describe('ActionBarBackDirective', () => {
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
        expect(component.ref().nativeElement.className).toBe('fd-action-bar__back');
    });
});
