import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductSwitchBodyComponent } from './product-switch-body.component';
import { ButtonModule } from '../../button/button.module';
import { ProductSwitchItem } from './product-switch.item';
import { PopoverModule } from '../../popover/popover.module';
import { DragAndDropModule } from '../../utils/drag-and-drop/drag-and-drop.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { createKeyboardEvent } from '../../utils/tests/event-objects';
import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';

@Component({
    selector: 'fd-test-component',
    template: '<fd-product-switch-body [products]="list"> </fd-product-switch-body>'
})
export class TestComponent {
    list: ProductSwitchItem[] = [
        {
            title: 'Home',
            subtitle: 'Central Home',
            icon: 'home',
            stickToPosition: true,
            disabledDragAndDrop: true
        },
        {
            title: 'Analytics Cloud',
            subtitle: 'Analytics Cloud',
            icon: 'business-objects-experience',
            selected: true
        },
        {
            title: 'Catalog',
            subtitle: 'Ariba',
            icon: 'contacts'
        },
        {
            title: 'Guided Buying',
            icon: 'credit-card'
        },
        {
            title: 'Strategic Procurement',
            icon: 'cart-3'
        }
    ];
}

describe('ProductSwitchBodyComponent', () => {
    let fixture: ComponentFixture<TestComponent>, debugElement: DebugElement, element: HTMLElement;

    let component, componentInstance: ProductSwitchBodyComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule, ButtonModule, DragAndDropModule, DragDropModule],
            declarations: [ProductSwitchBodyComponent, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
        fixture.detectChanges();
        component = debugElement.query(By.directive(ProductSwitchBodyComponent));
        componentInstance = component.injector.get(ProductSwitchBodyComponent);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle keydown enter', () => {
        const el = fixture.debugElement.query(By.css('li'));
        spyOn(el.nativeElement, 'click');
        el.nativeElement.focus();
        const keyboardEvent = createKeyboardEvent('keydown', ENTER, 'Enter', el.nativeElement);
        spyOn(keyboardEvent, 'preventDefault');
        el.nativeElement.dispatchEvent(keyboardEvent);

        expect(keyboardEvent.preventDefault).toHaveBeenCalled();
        expect(el.nativeElement.click).toHaveBeenCalled();
    });

    it('should handle no list keydown arrow right', () => {
        spyOn(componentInstance, 'isListMode').and.returnValue(false);
        const el = fixture.debugElement.query(By.css('li'));
        const nextEl = el.nativeElement.nextElementSibling;
        el.nativeElement.focus();
        const keyboardEvent = createKeyboardEvent('keydown', RIGHT_ARROW, 'ArrowRight', el.nativeElement);
        el.nativeElement.dispatchEvent(keyboardEvent);

        expect(document.activeElement).toBe(nextEl);
    });

    it('should handle no list keydown arrow left', () => {
        spyOn(componentInstance, 'isListMode').and.returnValue(false);
        const el = fixture.debugElement.query(By.css('li'));
        const nextEl = el.nativeElement.nextElementSibling;
        nextEl.focus();
        const keyboardEvent = createKeyboardEvent('keydown', LEFT_ARROW, 'ArrowLeft', nextEl);
        nextEl.dispatchEvent(keyboardEvent);

        expect(document.activeElement).toBe(el.nativeElement);
    });

    it('should handle no list keydown arrow down', () => {
        spyOn(componentInstance, 'isListMode').and.returnValue(false);
        const el = fixture.debugElement.query(By.css('li'));
        const nextElDown = el.nativeElement.nextElementSibling.nextElementSibling.nextElementSibling;
        el.nativeElement.focus();
        const keyboardEvent = createKeyboardEvent('keydown', DOWN_ARROW, 'ArrowDown', el.nativeElement);
        el.nativeElement.dispatchEvent(keyboardEvent);

        expect(document.activeElement).toBe(nextElDown);
    });

    it('should handle no list keydown arrow up', () => {
        spyOn(componentInstance, 'isListMode').and.returnValue(false);
        const el = fixture.debugElement.query(By.css('li'));
        const nextElDown = el.nativeElement.nextElementSibling.nextElementSibling.nextElementSibling;
        nextElDown.focus();
        const keyboardEvent = createKeyboardEvent('keydown', UP_ARROW, 'ArrowUp', nextElDown);
        nextElDown.dispatchEvent(keyboardEvent);

        expect(document.activeElement).toBe(el.nativeElement);
    });

    it('should handle list arrow up/down', () => {
        spyOn(componentInstance, 'isListMode').and.returnValue(true);
        const el = fixture.debugElement.query(By.css('li'));
        const nextElDown = el.nativeElement.nextElementSibling;
        el.nativeElement.focus();
        let keyboardEvent = createKeyboardEvent('keydown', DOWN_ARROW, 'ArrowDown', el.nativeElement);
        el.nativeElement.dispatchEvent(keyboardEvent);
        expect(document.activeElement).toBe(nextElDown);
        keyboardEvent = createKeyboardEvent('keydown', UP_ARROW, 'ArrowUp', nextElDown);
        nextElDown.dispatchEvent(keyboardEvent);
        expect(document.activeElement).toBe(el.nativeElement);
    });
});
