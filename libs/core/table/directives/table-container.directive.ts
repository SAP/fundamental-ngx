import {
    booleanAttribute,
    contentChild,
    DestroyRef,
    Directive,
    effect,
    ElementRef,
    inject,
    input,
    Renderer2,
    untracked
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResizeObserverService } from '@fundamental-ngx/cdk/utils';
import { FD_TOOLBAR } from '@fundamental-ngx/core/toolbar';
import { TableHeaderDirective } from './table-header.directive';

@Directive({
    selector: '[fdTableContainer], [fd-table-container]'
})
export class TableContainerDirective {
    /** Whether the scroll is applied on the page and not on the table */
    readonly outerScroll = input(false, { transform: booleanAttribute });

    /** @hidden */
    readonly toolbar = contentChild(FD_TOOLBAR, { read: ElementRef });

    /** @hidden */
    readonly tableHeader = contentChild(TableHeaderDirective, { read: ElementRef });

    /** @hidden */
    readonly resizeObserverService = inject(ResizeObserverService);

    /** @hidden */
    private readonly _renderer = inject(Renderer2);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor() {
        // Handle toolbar changes
        effect(() => {
            const toolbarElRef = this.toolbar();
            const outerScroll = this.outerScroll();

            if (outerScroll && toolbarElRef) {
                const toolbarEl = toolbarElRef.nativeElement;

                untracked(() => {
                    this.resizeObserverService
                        .observe(toolbarEl)
                        .pipe(takeUntilDestroyed(this._destroyRef))
                        .subscribe(() => {
                            this._renderer.setStyle(toolbarEl, 'position', 'sticky');
                            this._renderer.setStyle(toolbarEl, 'top', '0');
                            this._renderer.setStyle(toolbarEl, 'z-index', '2');

                            const tableHeaderEl = this.tableHeader();
                            if (tableHeaderEl) {
                                const headerNativeEl = tableHeaderEl.nativeElement;
                                this._renderer.setStyle(headerNativeEl, 'position', 'sticky');
                                this._renderer.setStyle(headerNativeEl, 'top', `${toolbarEl.offsetHeight}px`);
                                this._renderer.setStyle(headerNativeEl, 'z-index', '2');
                            }
                        });
                });
            }
        });

        // Handle table header changes
        effect(() => {
            const tableHeaderElRef = this.tableHeader();
            const outerScroll = this.outerScroll();

            if (outerScroll && tableHeaderElRef) {
                untracked(() => {
                    const headerEl = tableHeaderElRef.nativeElement;
                    this._renderer.setStyle(headerEl, 'position', 'sticky');
                    this._renderer.setStyle(headerEl, 'top', '0');
                });
            }
        });
    }
}
