import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ViewEncapsulation,
    booleanAttribute,
    inject,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyUtil, Nullable, RtlService } from '@fundamental-ngx/cdk';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { NavigationService } from '../../services/navigation.service';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'ul[fdb-navigation-list]',
    imports: [NgTemplateOutlet],
    templateUrl: './navigation-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-navigation__list',
        tabindex: '-1'
    }
})
export class NavigationListComponent implements OnChanges, AfterViewInit, OnDestroy {
    /** @hidden */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('listItems')
    set _listItems(value: Nullable<FdbNavigationListItem>[]) {
        this._listItemsArray = value;
        this.listItems$.set(value);
        this._setupKeyManager();
    }

    get _listItems(): Nullable<FdbNavigationListItem>[] {
        return this._listItemsArray;
    }

    /** List Role. */
    @HostBinding('attr.role')
    @Input()
    role: 'tree' | 'menubar' = 'tree';

    /** Whether the list is for parent items. */
    @HostBinding('class.fd-navigation__list--parent-items')
    @Input({ transform: booleanAttribute })
    parentItems = false;

    /** Whether the list is for child items. */
    @HostBinding('class.fd-navigation__list--child-items')
    @Input({ transform: booleanAttribute })
    childItems = false;

    /** Whether the list should not grow in height. */
    @HostBinding('class.fd-navigation__list--no-grow')
    @Input({ transform: booleanAttribute })
    noGrow = false;

    /** Whether the list should handle keyboard navigation. */
    @Input({ transform: booleanAttribute })
    withKeyboardNavigation = false;

    /** Reference to the More button component if this list is inside a More button popover. */
    @Input()
    moreButtonRef: any;

    /** Event emitted when user tries to navigate to the item before the list itself. */
    @Output()
    focusBefore = new EventEmitter<void>();

    /** Event emitted when user tries to navigate to the item after the list itself. */
    @Output()
    focusAfter = new EventEmitter<void>();

    /** List items. */
    readonly listItems$ = signal<Nullable<FdbNavigationListItem>[]>([]);

    /** @hidden */
    private _listItemsArray: Nullable<FdbNavigationListItem>[] = [];

    /** @hidden */
    private _keyManager: Nullable<FocusKeyManager<FdbNavigationListItem>>;

    /** @hidden */
    private readonly _navigationService = inject(NavigationService, {
        optional: true
    });

    /**
     * @hidden
     * Parent list item.
     */
    private readonly _listItem = inject(FdbNavigationListItem, {
        optional: true
    });

    /** @hidden */
    private readonly _rtl = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private get _activeItemIndex(): number {
        return this._keyManager?.activeItemIndex ?? -1;
    }

    /** @hidden */
    constructor() {
        this._listItem?.registerChildList(this);
    }

    /**
     * @hidden
     * Handler for keyboard navigation.
     */
    @HostListener('keydown', ['$event'])
    _keydownHandler(event: KeyboardEvent): void {
        if (!this.withKeyboardNavigation) {
            return;
        }
        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW])) {
            event.stopImmediatePropagation();
        }
        if (KeyUtil.isKeyCode(event, UP_ARROW) && this._activeItemIndex <= 0) {
            this.focusBefore.emit();
            return;
        }
        if (KeyUtil.isKeyCode(event, DOWN_ARROW) && this._activeItemIndex === this._listItemsArray.length - 1) {
            this.focusAfter.emit();
            return;
        }

        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW])) {
            this._keyManager?.onKeydown(event);
            return;
        }

        if (!KeyUtil.isKeyCode(event, [LEFT_ARROW, RIGHT_ARROW])) {
            return;
        }

        // We need to cancel event bubbling since we may have parent list that will also try to focus it's parent list item.
        event.stopImmediatePropagation();

        // All navigation lists use the same swapped arrow logic:
        // RIGHT arrow = expand action, LEFT arrow = collapse/go back action
        const isExpandAction = KeyUtil.isKeyCode(event, this._rtl?.rtl.value ? LEFT_ARROW : RIGHT_ARROW);

        if (!isExpandAction) {
            // If this list is inside a More button popover, we need to be smart about when to close vs navigate
            if (this.moreButtonRef) {
                // Check if we have a parent list item to navigate back to
                // If we do, do normal navigation; if not, close the More button popover
                if (this._listItem) {
                    this._listItem.focusLink(true);
                } else {
                    this.moreButtonRef.popoverOpen$.set(false);
                    this.moreButtonRef.focusLink();
                }
            } else {
                this._listItem?.focusLink(true);
            }
        }
    }

    /** @hidden */
    setActiveItemIndex(index: number): void {
        this._keyManager?.setActiveItem(index);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._navigationService?.currentItem$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((item) => {
            this._keyManager?.setActiveItem(item);
        });
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('withKeyboardNavigation' in changes) {
            this._setupKeyManager();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._listItem?.unregisterChildList(this);
        this._keyManager?.destroy();
    }

    /** @hidden */
    private _setupKeyManager(): void {
        this._keyManager?.destroy();

        if (!this.withKeyboardNavigation) {
            return;
        }

        this._keyManager = new FocusKeyManager(this._listItemsArray as FdbNavigationListItem[])
            .withVerticalOrientation()
            .skipPredicate((item) => item.skipNavigation);
    }
}
