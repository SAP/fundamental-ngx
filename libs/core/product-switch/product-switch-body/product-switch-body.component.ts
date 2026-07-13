import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { ViewportRuler } from '@angular/cdk/scrolling';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    effect,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    model,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import { FdDropEvent, KeyUtil, RtlService } from '@fundamental-ngx/cdk/utils';

import { NgTemplateOutlet } from '@angular/common';
import { DndItemDirective, DndListDirective } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconComponent } from '@fundamental-ngx/core/icon';
import { resolveTranslationSignalFn } from '@fundamental-ngx/i18n';
import { ProductSwitchItem } from './product-switch.item';

const containerWidthPxSmallMode = 588;
const containerWidthPx = 776;

@Component({
    selector: 'fd-product-switch-body',
    templateUrl: './product-switch-body.component.html',
    styleUrls: ['./product-switch-body.component.scss', '../../../cdk/utils/drag-and-drop/drag-and-drop.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DndItemDirective, DndListDirective, IconComponent, AvatarComponent, NgTemplateOutlet]
})
export class ProductSwitchBodyComponent implements OnInit, OnDestroy {
    /** Defines if drag and drop functionality should be included in product switch*/
    @Input()
    dragAndDropEnabled = true;

    /** The product switch's product items. */
    @Input()
    products: ProductSwitchItem[];

    /** Defines if the product switcher should be displayed in list mode, no matter what is the size of window */
    @Input()
    forceListMode = false;

    /** Event thrown on products array change */
    @Output()
    readonly productsChange: EventEmitter<any[]> = new EventEmitter<any[]>();

    /** Event emitted on product click */
    @Output()
    readonly itemClicked: EventEmitter<void> = new EventEmitter<void>();

    /** Whether the product switch body is open. When set to true, focuses the first item. */
    readonly isOpen = model(false);

    /** @hidden */
    protected readonly FD_DEFAULT_ICON_FONT_FAMILY = FD_DEFAULT_ICON_FONT_FAMILY;

    /** @hidden Returns the accessible label for a product item. */
    protected readonly _itemAriaLabel = computed(() => (item: ProductSwitchItem) => {
        const parts = [item.title];
        if (item.subtitle) {
            parts.push(item.subtitle);
        }
        if (item.target === '_blank') {
            parts.push(this._targetBlank());
        } else if (item.target === '_parent') {
            parts.push(this._targetParent());
        } else if (item.target === '_top') {
            parts.push(this._targetTop());
        }
        return parts.join(' ');
    });

    /** @hidden */
    private readonly _translate = resolveTranslationSignalFn();
    private readonly _targetBlank = this._translate('coreProductSwitch.targetBlank');
    private readonly _targetParent = this._translate('coreProductSwitch.targetParent');
    private readonly _targetTop = this._translate('coreProductSwitch.targetTop');

    /** @hidden */
    private _listMode: boolean;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden */
    private _triggerElement: HTMLElement | null = null;

    /** @hidden */
    private _lastFocusedIndex = -1;

    /** @hidden */
    constructor(
        private _viewportRuler: ViewportRuler,
        private readonly _cdr: ChangeDetectorRef
    ) {
        effect(() => this._syncFocusWithOpenState());
        this._elementRef.nativeElement.addEventListener('focusin', (event: FocusEvent) =>
            this._trackFocusedItem(event)
        );
    }

    /** @hidden */
    ngOnInit(): void {
        this._subscriptions.add(
            this._viewportRuler.change().subscribe((event) => {
                const { innerWidth } = <Window>event.target;
                this._checkSize(innerWidth);
            })
        );

        const { width } = this._viewportRuler.getViewportSize();
        this._checkSize(width);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    _itemClick(item: ProductSwitchItem, event: MouseEvent): void {
        this.products.forEach((product) => (product.selected = product === item));

        this.itemClicked.emit();
        if (item.callback) {
            item.callback(event);
        }
    }

    /** Method called on products change */
    _productSwitchItemsChangeHandle(dropEvent: FdDropEvent<ProductSwitchItem>): void {
        this.productsChange.emit(dropEvent.items);
        this.products = dropEvent.items;
    }

    /** @hidden */
    _keyDownHandle(event: KeyboardEvent): void {
        const target = <HTMLElement>event.target;

        if (!KeyUtil.isKeyCode(event, TAB)) {
            event.preventDefault();
        }

        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            // Click the inner <a> when one exists to triggers browser navigation (including target handling),
            // while also bubbling up to the <li>'s (click) handler to update selected state and fire itemClicked.
            const anchor = target.querySelector<HTMLAnchorElement>('a.fd-product-switch__link');
            (anchor ?? target).click();
        } else if (!this._isListMode()) {
            const i = Array.from(target.parentElement?.children ?? []).indexOf(target);
            this._handleNoListKeydown(event, target, i);
        } else if (this._isListMode() && KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW])) {
            this._handleListArrowUpDown(event, target);
        }
    }

    /** @hidden */
    _isSmallMode(): boolean {
        return this.products?.length < 7;
    }

    /** @hidden */
    _isListMode(): boolean {
        return this._listMode || this.forceListMode;
    }

    /** @hidden Focuses the appropriate item on open, or returns focus to the trigger on close. */
    private _syncFocusWithOpenState(): void {
        if (this.isOpen()) {
            this._triggerElement = document.activeElement as HTMLElement;
            this._focusItemAtIndex(this._lastFocusedIndex >= 0 ? this._lastFocusedIndex : 0);
        } else if (this._triggerElement) {
            this._triggerElement.focus();
            this._triggerElement = null;
        }
    }

    /** @hidden Focuses the item at the given index within the list. */
    private _focusItemAtIndex(index: number): void {
        const items = this._elementRef.nativeElement.querySelectorAll<HTMLElement>('.fd-product-switch__item');
        items[index]?.focus();
    }

    /** @hidden Records the index of the last focused product item so it can be restored on reopen. */
    private _trackFocusedItem(event: FocusEvent): void {
        const items = Array.from(
            this._elementRef.nativeElement.querySelectorAll<HTMLElement>('.fd-product-switch__item')
        );
        const index = items.indexOf(event.target as HTMLElement);
        if (index !== -1) {
            this._lastFocusedIndex = index;
        }
    }

    /** @hidden */
    private _checkSize(width: number): void {
        if (this._isSmallMode()) {
            this._listMode = width < containerWidthPxSmallMode;
        } else {
            this._listMode = width < containerWidthPx;
        }

        this._cdr.markForCheck();
    }

    /** @hidden */
    private _handleNoListKeydown(event: KeyboardEvent, target: HTMLElement, i: number): void {
        const previousElementSibling = <HTMLElement>target.previousElementSibling;
        const nextElementSibling = <HTMLElement>target.nextElementSibling;

        if (
            i === this.products.length - 1 &&
            (KeyUtil.isKeyCode(event, RIGHT_ARROW) || (KeyUtil.isKeyCode(event, LEFT_ARROW) && this._rtlService?.rtl()))
        ) {
            while (<HTMLElement>target.previousElementSibling) {
                target = <HTMLElement>target.previousElementSibling;
            }
            target.focus();
        }

        if (KeyUtil.isKeyCode(event, LEFT_ARROW)) {
            this._rtlService?.rtl() ? nextElementSibling?.focus() : previousElementSibling?.focus();
        } else if (KeyUtil.isKeyCode(event, RIGHT_ARROW)) {
            this._rtlService?.rtl() ? previousElementSibling?.focus() : nextElementSibling?.focus();
        } else if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW])) {
            if (this.products.length >= 7) {
                this._handleNoListMoreThanSeven(event, target, i);
            } else if (this.products.length < 7) {
                this._handleNoListLessThanSeven(event, target, i);
            }
        }
    }

    /** @hidden */
    private _handleNoListMoreThanSeven(event: KeyboardEvent, target: HTMLElement, i: number): void {
        const nextIndexByColumn = 4;
        const children = target.parentElement?.children;

        if (!children) {
            return;
        }

        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            (<HTMLElement>children[i + nextIndexByColumn])?.focus();
        }

        if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            (<HTMLElement>children[i - nextIndexByColumn])?.focus();
        }
    }

    /** @hidden */
    private _handleNoListLessThanSeven(event: KeyboardEvent, target: HTMLElement, i: number): void {
        const nextIndexByColumn = 3;
        const children = target.parentElement?.children;

        if (!children) {
            return;
        }

        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            (<HTMLElement>children[i + nextIndexByColumn])?.focus();
        }

        if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            (<HTMLElement>children[i - nextIndexByColumn])?.focus();
        }
    }

    /** @hidden */
    private _handleListArrowUpDown(event: KeyboardEvent, target: HTMLElement): void {
        const targetIndex = Array.from(target.parentElement?.children ?? []).indexOf(target);
        const previousElementSibling =
            targetIndex === 0
                ? <HTMLElement>target.parentElement?.children[this.products.length - 1]
                : <HTMLElement>target.previousElementSibling;
        const nextElementSibling =
            targetIndex === this.products.length - 1
                ? <HTMLElement>target.parentElement?.children[0]
                : <HTMLElement>target.nextElementSibling;

        if (this._isListMode() && KeyUtil.isKeyCode(event, DOWN_ARROW) && nextElementSibling) {
            nextElementSibling.focus();
        } else if (this._isListMode() && KeyUtil.isKeyCode(event, UP_ARROW) && previousElementSibling) {
            previousElementSibling.focus();
        }
    }
}
