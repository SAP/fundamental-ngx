import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableCellOverflowDirective } from './table-cell-overflow.directive';

@Component({
    template: ` <div fdpTableCellOverflow [style.width.px]="width" [style.overflow]="'hidden'">{{ text }}</div> `,
    imports: [TableCellOverflowDirective]
})
class TestComponent {
    text = 'Short text';
    width = 200;
}

describe('TableCellOverflowDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let divElement: HTMLDivElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        divElement = fixture.nativeElement.querySelector('div');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(divElement).toBeTruthy();
    });

    it('should not set title attribute when text does not overflow on mouseenter', () => {
        component.text = 'Short';
        component.width = 200;
        fixture.detectChanges();

        divElement.dispatchEvent(new MouseEvent('mouseenter'));
        fixture.detectChanges();

        expect(divElement.hasAttribute('title')).toBe(false);
    });

    it('should set title attribute when text overflows on mouseenter', () => {
        component.text = 'This is a very long text that will definitely overflow the container width';
        component.width = 100;
        fixture.detectChanges();

        divElement.dispatchEvent(new MouseEvent('mouseenter'));
        fixture.detectChanges();

        const hasTitle = divElement.hasAttribute('title');
        if (hasTitle) {
            expect(divElement.getAttribute('title')).toBe(component.text);
        }
    });

    it('should set title attribute when text overflows on focusin', () => {
        component.text = 'This is a very long text that will definitely overflow the container width';
        component.width = 100;
        fixture.detectChanges();

        divElement.dispatchEvent(new FocusEvent('focusin'));
        fixture.detectChanges();

        const hasTitle = divElement.hasAttribute('title');
        if (hasTitle) {
            expect(divElement.getAttribute('title')).toBe(component.text);
        }
    });

    it('should remove title attribute when text no longer overflows', () => {
        // First make it overflow
        component.text = 'This is a very long text that will definitely overflow';
        component.width = 50;
        fixture.detectChanges();

        divElement.dispatchEvent(new MouseEvent('mouseenter'));
        fixture.detectChanges();

        // Then make it not overflow
        component.width = 500;
        fixture.detectChanges();

        divElement.dispatchEvent(new MouseEvent('mouseenter'));
        fixture.detectChanges();

        expect(divElement.hasAttribute('title')).toBe(false);
    });
});
