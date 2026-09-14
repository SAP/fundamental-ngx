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

    it('should not set title attribute when text does not overflow', () => {
        component.text = 'Short';
        component.width = 200;
        fixture.detectChanges();

        // Wait for ResizeObserver callback
        setTimeout(() => {
            expect(divElement.hasAttribute('title')).toBe(false);
        }, 100);
    });

    it('should set title attribute when text overflows', (done) => {
        component.text = 'This is a very long text that will definitely overflow the container width';
        component.width = 100;
        fixture.detectChanges();

        // Wait for ResizeObserver callback
        setTimeout(() => {
            const hasTitle = divElement.hasAttribute('title');
            if (hasTitle) {
                expect(divElement.getAttribute('title')).toBe(component.text);
            }
            done();
        }, 100);
    });

    it('should remove title attribute when text no longer overflows', (done) => {
        // First make it overflow
        component.text = 'This is a very long text that will definitely overflow';
        component.width = 50;
        fixture.detectChanges();

        setTimeout(() => {
            // Then make it not overflow
            component.width = 500;
            fixture.detectChanges();

            setTimeout(() => {
                expect(divElement.hasAttribute('title')).toBe(false);
                done();
            }, 100);
        }, 100);
    });
});
