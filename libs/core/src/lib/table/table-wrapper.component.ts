import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    ViewEncapsulation
} from '@angular/core';
import {
    ContentDensityObserver,
    contentDensityObserverProviders,
    ContentDensityObserverTarget
} from '@fundamental-ngx/core/content-density';

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
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'fd-table-wrapper',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [contentDensityObserverProviders()]
})
export class TableWrapperComponent implements AfterContentInit, OnDestroy {
    /** @hidden */
    private _contentDensitySettings: ContentDensityObserverTarget;

    /** @hidden */
    constructor(private elementRef: ElementRef, private _contentDensityObserver: ContentDensityObserver) {}

    /** @hidden */
    ngAfterContentInit(): void {
        if (this.elementRef.nativeElement && this.elementRef.nativeElement.firstChild) {
            const tableElement = this.elementRef.nativeElement.firstChild;
            tableElement.classList.add('fd-table');

            const tableElementRef = new ElementRef<HTMLTableElement>(tableElement);
            this._contentDensitySettings = {
                elementRef: () => tableElementRef
            };
            this._contentDensityObserver.consume(this._contentDensitySettings);

            if (tableElement.children) {
                for (let i = 0; i < tableElement.children.length; i++) {
                    if (tableElement.children[i].tagName === 'THEAD') {
                        tableElement.children[i].classList.add('fd-table__header');
                    } else if (tableElement.children[i].tagName === 'TBODY') {
                        tableElement.children[i].classList.add('fd-table__body');
                    } else if (tableElement.children[i].tagName === 'TFOOT') {
                        tableElement.children[i].classList.add('fd-table__footer');
                    }
                }
            }
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._contentDensityObserver.removeConsumer(this._contentDensitySettings);
    }
}
