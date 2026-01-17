import { Component, input, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CSS_CLASS_NAME, GRID_COLUMNS_NUMBER } from '../constants';
import { LayoutGridComponent } from '../layout-grid.component';
import { LayoutGridColDirective } from './layout-grid-col.directive';
import { LayoutGridRowDirective } from './layout-grid-row.directive';

const CUSTOM_CLASS = 'custom-col-class';

@Component({
    template: `
        <fd-layout-grid>
            <div fdLayoutGridRow>
                <div
                    fd-layout-grid-col
                    [fdLayoutGridCol]="fdLayoutGridCol()"
                    [colMd]="colMd()"
                    [colLg]="colLg()"
                    [colXl]="colXl()"
                    [colOffset]="colOffset()"
                    [colOffsetMd]="colOffsetMd()"
                    [colOffsetLg]="colOffsetLg()"
                    [colOffsetXl]="colOffsetXl()"
                    [colGrow]="colGrow()"
                    [class]="class()"
                ></div>
            </div>
        </fd-layout-grid>
    `,
    imports: [LayoutGridColDirective, LayoutGridRowDirective, LayoutGridComponent]
})
class TestNestedContainerComponent {
    readonly fdLayoutGridCol = input<number | undefined>(undefined);
    readonly colMd = input<number | undefined>(undefined);
    readonly colLg = input<number | undefined>(undefined);
    readonly colXl = input<number | undefined>(undefined);
    readonly colOffset = input<number | undefined>(undefined);
    readonly colOffsetMd = input<number | undefined>(undefined);
    readonly colOffsetLg = input<number | undefined>(undefined);
    readonly colOffsetXl = input<number | undefined>(undefined);
    readonly colGrow = input(false);
    readonly class = input<string>('');

    readonly directiveElement = viewChild.required(LayoutGridColDirective);
}

describe('LayoutGridColDirective', () => {
    let component: TestNestedContainerComponent;
    let directiveElement: LayoutGridColDirective;
    let fixture: ComponentFixture<TestNestedContainerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestNestedContainerComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNestedContainerComponent);
        component = fixture.componentInstance;
        directiveElement = component.directiveElement();
        fixture.detectChanges();
    });

    function getColElement(): HTMLElement {
        return fixture.nativeElement.querySelector('[fd-layout-grid-col]');
    }

    describe('base functionality', () => {
        it('should apply base col class', () => {
            const element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.col)).toBeTruthy();
        });

        it('should apply custom class from input', () => {
            fixture.componentRef.setInput('class', CUSTOM_CLASS);
            fixture.detectChanges();
            const element = getColElement();
            expect(element.classList.contains(CUSTOM_CLASS)).toBeTruthy();
        });
    });

    describe('column sizes', () => {
        it('should apply default column size class', () => {
            fixture.componentRef.setInput('fdLayoutGridCol', 6);
            fixture.detectChanges();
            const element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.colSizePrefix + '6')).toBeTruthy();
        });

        it('should apply medium column size class', () => {
            fixture.componentRef.setInput('colMd', 8);
            fixture.detectChanges();
            const element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.mdColSizePrefix + '8')).toBeTruthy();
        });

        it('should apply large column size class', () => {
            fixture.componentRef.setInput('colLg', 4);
            fixture.detectChanges();
            const element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.lgColSizePrefix + '4')).toBeTruthy();
        });

        it('should apply extra-large column size class', () => {
            fixture.componentRef.setInput('colXl', 3);
            fixture.detectChanges();
            const element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.xlColSizePrefix + '3')).toBeTruthy();
        });

        it('should apply all column size classes together', () => {
            fixture.componentRef.setInput('fdLayoutGridCol', 12);
            fixture.componentRef.setInput('colMd', 6);
            fixture.componentRef.setInput('colLg', 4);
            fixture.componentRef.setInput('colXl', 3);
            fixture.detectChanges();
            const element = getColElement();

            expect(element.classList.contains(CSS_CLASS_NAME.colSizePrefix + '12')).toBeTruthy();
            expect(element.classList.contains(CSS_CLASS_NAME.mdColSizePrefix + '6')).toBeTruthy();
            expect(element.classList.contains(CSS_CLASS_NAME.lgColSizePrefix + '4')).toBeTruthy();
            expect(element.classList.contains(CSS_CLASS_NAME.xlColSizePrefix + '3')).toBeTruthy();
        });

        it('should not apply column size class for value greater than grid columns', () => {
            fixture.componentRef.setInput('fdLayoutGridCol', GRID_COLUMNS_NUMBER + 1);
            fixture.detectChanges();
            const element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.colSizePrefix + (GRID_COLUMNS_NUMBER + 1))).toBeFalsy();
        });

        it('should not apply column size class for value less than 1', () => {
            fixture.componentRef.setInput('fdLayoutGridCol', 0);
            fixture.detectChanges();
            const element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.colSizePrefix + '0')).toBeFalsy();
        });

        it('should accept string number as column size', () => {
            fixture.componentRef.setInput('fdLayoutGridCol', '6');
            fixture.detectChanges();
            const element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.colSizePrefix + '6')).toBeTruthy();
        });
    });

    describe('column offsets', () => {
        it('should apply default offset class', () => {
            fixture.componentRef.setInput('colOffset', 2);
            fixture.detectChanges();
            const element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.colOffsetPrefix + '2')).toBeTruthy();
        });

        it('should apply medium offset class', () => {
            fixture.componentRef.setInput('colOffsetMd', 3);
            fixture.detectChanges();
            const element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.mdColOffsetPrefix + '3')).toBeTruthy();
        });

        it('should apply large offset class', () => {
            fixture.componentRef.setInput('colOffsetLg', 4);
            fixture.detectChanges();
            const element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.lgColOffsetPrefix + '4')).toBeTruthy();
        });

        it('should apply extra-large offset class', () => {
            fixture.componentRef.setInput('colOffsetXl', 5);
            fixture.detectChanges();
            const element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.xlColOffsetPrefix + '5')).toBeTruthy();
        });

        it('should not apply offset class for value greater than grid columns', () => {
            fixture.componentRef.setInput('colOffset', GRID_COLUMNS_NUMBER + 1);
            fixture.detectChanges();
            const element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.colOffsetPrefix + (GRID_COLUMNS_NUMBER + 1))).toBeFalsy();
        });

        it('should not apply offset class for value less than 1', () => {
            fixture.componentRef.setInput('colOffset', 0);
            fixture.detectChanges();
            const element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.colOffsetPrefix + '0')).toBeFalsy();
        });
    });

    describe('column grow', () => {
        it('should apply colGrow class when input is true', () => {
            fixture.componentRef.setInput('colGrow', true);
            fixture.detectChanges();
            const element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.colGrow)).toBeTruthy();
        });

        it('should not apply colGrow class when input is false', () => {
            fixture.componentRef.setInput('colGrow', false);
            fixture.detectChanges();
            const element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.colGrow)).toBeFalsy();
        });
    });

    describe('reactivity', () => {
        it('should update classes when column size changes', () => {
            fixture.componentRef.setInput('fdLayoutGridCol', 6);
            fixture.detectChanges();
            let element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.colSizePrefix + '6')).toBeTruthy();

            fixture.componentRef.setInput('fdLayoutGridCol', 12);
            fixture.detectChanges();
            element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.colSizePrefix + '6')).toBeFalsy();
            expect(element.classList.contains(CSS_CLASS_NAME.colSizePrefix + '12')).toBeTruthy();
        });

        it('should update classes when offset changes', () => {
            fixture.componentRef.setInput('colOffset', 2);
            fixture.detectChanges();
            let element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.colOffsetPrefix + '2')).toBeTruthy();

            fixture.componentRef.setInput('colOffset', 4);
            fixture.detectChanges();
            element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.colOffsetPrefix + '2')).toBeFalsy();
            expect(element.classList.contains(CSS_CLASS_NAME.colOffsetPrefix + '4')).toBeTruthy();
        });

        it('should update colGrow class when input changes', () => {
            fixture.componentRef.setInput('colGrow', false);
            fixture.detectChanges();
            let element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.colGrow)).toBeFalsy();

            fixture.componentRef.setInput('colGrow', true);
            fixture.detectChanges();
            element = getColElement();
            expect(element.classList.contains(CSS_CLASS_NAME.colGrow)).toBeTruthy();
        });

        it('should update multiple classes simultaneously', () => {
            fixture.componentRef.setInput('fdLayoutGridCol', 6);
            fixture.componentRef.setInput('colMd', 4);
            fixture.componentRef.setInput('colGrow', true);
            fixture.componentRef.setInput('colOffset', 2);
            fixture.detectChanges();
            const element = getColElement();

            expect(element.classList.contains(CSS_CLASS_NAME.colSizePrefix + '6')).toBeTruthy();
            expect(element.classList.contains(CSS_CLASS_NAME.mdColSizePrefix + '4')).toBeTruthy();
            expect(element.classList.contains(CSS_CLASS_NAME.colGrow)).toBeTruthy();
            expect(element.classList.contains(CSS_CLASS_NAME.colOffsetPrefix + '2')).toBeTruthy();
        });
    });

    describe('elementRef', () => {
        it('should expose elementRef for external access', () => {
            expect(directiveElement.elementRef).toBeDefined();
            expect(directiveElement.elementRef.nativeElement).toBe(getColElement());
        });
    });
});
