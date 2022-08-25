import { Directive, ElementRef, HostBinding, HostListener, Inject, Input, OnInit, Optional } from '@angular/core';
import { TabbableElementService } from '@fundamental-ngx/core/utils';
import { OverflowLayoutFocusableItem } from '../interfaces/overflow-focusable-item.interface';
import { OverflowItem } from '../interfaces/overflow-item.interface';
import { OverflowLayoutComponent } from '../overflow-layout.component';
import { FD_OVERFLOW_FOCUSABLE_ITEM } from '../tokens/overflow-focusable-item.token';
import { FD_OVERFLOW_ITEM } from '../tokens/overflow-item.token';

@Directive({
    selector: '[fdOverflowLayoutFocusableItem], [fdOverflowLayoutItem][focusable]',
    providers: [
        TabbableElementService,
        {
            provide: FD_OVERFLOW_FOCUSABLE_ITEM,
            useExisting: OverflowLayoutFocusableItemDirective
        }
    ]
})
export class OverflowLayoutFocusableItemDirective implements OverflowLayoutFocusableItem, OnInit {
    /** Whether the item should be focusable. */
    @Input()
    focusable = true;

    /** Whether the item should be navigable via keyboard. */
    @Input()
    navigable = true;

    /** Whether to search for the child focusable items instead of directive's element. */
    @HostBinding('class.fd-overflow-layout__item--skip-focus')
    @Input()
    skipSelfFocus = false;

    /** @hidden */
    @HostBinding('attr.tabindex')
    private get _tabindex(): number {
        return this.focusable ? 0 : -1;
    }

    /** Whether the item is hidden. */
    get hidden(): boolean {
        return !!this._overflowItem?.hidden;
    }

    /** @hidden */
    constructor(
        private readonly _overflowContainer: OverflowLayoutComponent,
        @Inject(FD_OVERFLOW_ITEM) @Optional() private readonly _overflowItem: OverflowItem,
        public readonly elementRef: ElementRef<HTMLElement>,
        private readonly _tabbableElementService: TabbableElementService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        if (this._overflowItem) {
            this._overflowItem.focusableItem = this;
        }
    }

    /** @hidden */
    focus(): void {
        if (!this.skipSelfFocus) {
            this.elementRef.nativeElement.focus();
            return;
        }
        const tabbableElement = this._tabbableElementService.getTabbableElement(
            this.elementRef.nativeElement,
            false,
            true
        );
        // Try to find first focusable child.
        tabbableElement?.focus();
    }

    /** @hidden */
    @HostListener('focus')
    private _onFocus(): void {
        this._overflowContainer.setFocusedElement(this);

        if (!this.skipSelfFocus) {
            return;
        }

        const tabbableElement = this._tabbableElementService.getTabbableElement(
            this.elementRef.nativeElement,
            false,
            true
        );
        // Pass the focus to the first tabbable child element.
        tabbableElement?.focus();
    }
}
