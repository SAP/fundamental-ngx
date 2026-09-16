import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    effect,
    ElementRef,
    inject,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';

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
    selector: 'fd-table-wrapper',
    template: `<ng-content></ng-content>`,
    styleUrl: './table.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [contentDensityObserverProviders()]
})
export class TableWrapperComponent {
    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    /** @hidden */
    private readonly _renderer = inject(Renderer2);

    /** @hidden */
    private readonly _contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden */
    constructor() {
        // Apply CSS classes to table and its children after render
        afterNextRender(() => {
            if (this._elementRef.nativeElement && this._elementRef.nativeElement.firstChild) {
                const tableElement = this._elementRef.nativeElement.firstChild;
                tableElement.classList.add('fd-table');

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
        });

        // Apply content density classes to child table element reactively
        effect(() => {
            const density = this._contentDensityObserver.contentDensity();
            const config = this._contentDensityObserver.config;

            if (this._elementRef.nativeElement?.firstChild && config?.modifiers) {
                const tableElement = this._elementRef.nativeElement.firstChild;

                // Remove all density modifier classes
                Object.values(config.modifiers).forEach((className) => {
                    this._renderer.removeClass(tableElement, className);
                });

                // Add the current density class
                const modifierClass = config.modifiers[density];
                if (modifierClass) {
                    this._renderer.addClass(tableElement, modifierClass);
                }
            }
        });
    }
}
