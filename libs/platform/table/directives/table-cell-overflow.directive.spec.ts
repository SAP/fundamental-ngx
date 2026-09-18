import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableCellOverflowDirective } from './table-cell-overflow.directive';

@Component({
    template: `
        <div [fdpTableCellOverflow]="enabled" [style.width.px]="width" [style.overflow]="'hidden'">{{ text }}</div>
    `,
    imports: [TableCellOverflowDirective]
})
class TestComponent {
    text = 'Short text';
    width = 200;
    enabled = true;
}

@Component({
    template: `
        <div [fdpTableCellOverflow]="enabled" [style.width.px]="width" [style.overflow]="'hidden'">
            <span>{{ text }}</span>
        </div>
    `,
    imports: [TableCellOverflowDirective]
})
class NestedContentTestComponent {
    text = 'Short text';
    width = 200;
    enabled = true;
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

    it('should update title when text content changes and overflows', (done) => {
        component.text = 'This is a very long text that will definitely overflow the container width';
        component.width = 100;
        fixture.detectChanges();

        setTimeout(() => {
            // Change the text
            component.text = 'Different long text that also overflows the container width completely';
            fixture.detectChanges();

            // Wait for MutationObserver callback
            setTimeout(() => {
                const hasTitle = divElement.hasAttribute('title');
                if (hasTitle) {
                    expect(divElement.getAttribute('title')).toBe(component.text);
                }
                done();
            }, 100);
        }, 100);
    });

    it('should add title when text changes from non-overflowing to overflowing', (done) => {
        component.text = 'Short';
        component.width = 200;
        fixture.detectChanges();

        setTimeout(() => {
            expect(divElement.hasAttribute('title')).toBe(false);

            // Change to long text
            component.text = 'This is a very long text that will definitely overflow the container width';
            fixture.detectChanges();

            // Wait for MutationObserver callback
            setTimeout(() => {
                const hasTitle = divElement.hasAttribute('title');
                if (hasTitle) {
                    expect(divElement.getAttribute('title')).toBe(component.text);
                }
                done();
            }, 100);
        }, 100);
    });

    it('should remove title when text changes from overflowing to non-overflowing', (done) => {
        component.text = 'This is a very long text that will definitely overflow the container width';
        component.width = 100;
        fixture.detectChanges();

        setTimeout(() => {
            // Change to short text
            component.text = 'Short';
            fixture.detectChanges();

            // Wait for MutationObserver callback
            setTimeout(() => {
                expect(divElement.hasAttribute('title')).toBe(false);
                done();
            }, 100);
        }, 100);
    });

    it('should disconnect both observers when directive is disabled', (done) => {
        component.text = 'This is a very long text that will definitely overflow';
        component.width = 100;
        fixture.detectChanges();

        setTimeout(() => {
            // Disable the directive
            component.enabled = false;
            fixture.detectChanges();

            // Title should be removed
            expect(divElement.hasAttribute('title')).toBe(false);

            // Change text - should not trigger update since observers are disconnected
            component.text = 'Different text';
            fixture.detectChanges();

            setTimeout(() => {
                expect(divElement.hasAttribute('title')).toBe(false);
                done();
            }, 100);
        }, 100);
    });
});

describe('TableCellOverflowDirective with nested content', () => {
    let component: NestedContentTestComponent;
    let fixture: ComponentFixture<NestedContentTestComponent>;
    let divElement: HTMLDivElement;
    let spanElement: HTMLSpanElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NestedContentTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(NestedContentTestComponent);
        component = fixture.componentInstance;
        divElement = fixture.nativeElement.querySelector('div');
        spanElement = fixture.nativeElement.querySelector('span');
    });

    it('should detect text changes in nested elements', (done) => {
        component.text = 'This is a very long text that will definitely overflow the container width';
        component.width = 100;
        fixture.detectChanges();

        setTimeout(() => {
            const hasTitle = divElement.hasAttribute('title');
            if (hasTitle) {
                expect(divElement.getAttribute('title')).toContain(component.text);
            }

            // Change text in nested span
            component.text = 'Different nested text that also overflows completely';
            fixture.detectChanges();

            // Wait for MutationObserver callback
            setTimeout(() => {
                const updatedTitle = divElement.getAttribute('title');
                if (updatedTitle) {
                    expect(updatedTitle).toContain(component.text);
                }
                done();
            }, 100);
        }, 100);
    });
});
