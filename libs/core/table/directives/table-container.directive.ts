import {
    ContentChild,
    Directive,
    ElementRef,
    Input,
    OnDestroy,
    Renderer2,
    booleanAttribute,
    inject
} from '@angular/core';
import { ResizeObserverService } from '@fundamental-ngx/cdk/utils';
import { FD_TOOLBAR } from '@fundamental-ngx/core/toolbar';
import { Subscription } from 'rxjs';
import { TableHeaderDirective } from './table-header.directive';

@Directive({
    selector: '[fdTableContainer], [fd-table-container]',
    standalone: true
})
export class TableContainerDirective implements OnDestroy {
    /** Whether the scroll is applied on the page and not on the table */
    @Input({ transform: booleanAttribute })
    outerScroll = false;

    /** @hidden */
    @ContentChild(FD_TOOLBAR, { read: ElementRef })
    set toolbar(toolbarElRef: ElementRef) {
        if (this.outerScroll && toolbarElRef) {
            const toolbarEl = toolbarElRef.nativeElement;

            if (this._resizeSubscription) {
                this._resizeSubscription.unsubscribe();
            }

            this._resizeSubscription = this.resizeObserverService.observe(toolbarEl).subscribe(() => {
                this._renderer.setStyle(toolbarEl, 'position', 'sticky');
                this._renderer.setStyle(toolbarEl, 'top', '0');

                this._renderer.setStyle(this._tableHeaderEl, 'position', 'sticky');
                this._renderer.setStyle(this._tableHeaderEl, 'top', `${toolbarEl.offsetHeight}px`);
            });
        }
    }

    /** @hidden */
    @ContentChild(TableHeaderDirective, { read: ElementRef })
    set tableHeader(tableHeaderEl: ElementRef) {
        if (this.outerScroll) {
            this._tableHeaderEl = tableHeaderEl.nativeElement;
            this._renderer.setStyle(this._tableHeaderEl, 'position', 'sticky');
            this._renderer.setStyle(this._tableHeaderEl, 'top', '0');
        }
    }

    /** @hidden */
    readonly resizeObserverService = inject(ResizeObserverService);

    /** @hidden */
    private readonly _renderer = inject(Renderer2);

    /** @hidden */
    private _tableHeaderEl: HTMLElement;

    /** @hidden */
    private _resizeSubscription = new Subscription();

    /** @hidden */
    ngOnDestroy(): void {
        if (this._resizeSubscription) {
            this._resizeSubscription.unsubscribe();
        }
    }
}
