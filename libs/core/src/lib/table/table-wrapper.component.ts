import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';

/**
 * The component that represents a table wrapper, it will add fd-table class to its first child.
 * A table is a set of tabular data. Line items can support data, images and actions.
 * ```html
 * <table-wrapper>
 * <table></table>
 * </table-wrapper>
 * ```
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'fd-table-wrapper',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableWrapperComponent implements AfterContentInit {

    constructor(
        private elementRef: ElementRef
    ) {}

    public ngAfterContentInit(): void {
        if (this.elementRef.nativeElement && this.elementRef.nativeElement.firstChild) {
            this.elementRef.nativeElement.firstChild.classList.add('fd-table')
        }
    }
}
