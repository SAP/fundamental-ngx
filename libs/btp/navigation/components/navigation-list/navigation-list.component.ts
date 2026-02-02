import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    Renderer2,
    SimpleChanges,
    ViewEncapsulation,
    booleanAttribute,
    computed,
    effect,
    inject,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyUtil, Nullable, RtlService } from '@fundamental-ngx/cdk';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { FdbNavigation } from '../../models/navigation.class';
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
    get _role(): 'tree' | 'menubar' | 'group' | 'menu' {
        return this.computedRole();
    }

    @Input()
    role: 'tree' | 'menubar' | 'group' | 'menu' = 'tree';

    /**
     * aria-label for the navigation list.
     */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('ariaLabel')
    ariaLabel: Nullable<string> = null;

    /**
     * aria-roledescription for the navigation list.
     */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('ariaRoleDescription')
    @HostBinding('attr.aria-roledescription')
    ariaRoleDescription: Nullable<string> = null;

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

    /** Computed role based on navigation state and input role. */
    readonly computedRole = computed(() => {
        // Prioritize explicit role input
        if (this.role && this.role !== 'tree') {
            return this.role;
        }

        // Check if this is in an overflow menu context (More button popover)
        const navigation = this._navigation;
        if (navigation?.isSnapped$() && this.moreButtonRef) {
            // In overflow menu, lists should have role="menu"
            return 'menu';
        }

        // If this is a child items list or parent items list, it should have role="group"
        if (this.childItems || this.parentItems) {
            return 'group';
        }

        if (navigation?.isSnapped$()) {
            return 'menubar';
        }
        return this.role || 'tree';
    });

    /** Computed aria-label for group lists based on parent item's text content. */
    readonly computedAriaLabel = computed(() => {
        try {
            // Only provide aria-label for group role lists
            if (this.computedRole() === 'group' && this._listItem) {
                const parentLink = this._listItem.link$();
                if (parentLink?.elementRef?.nativeElement) {
                    // Get text content directly from the navigation link element
                    // The .fd-navigation__text span contains the projected content, but we can access
                    // the text content directly from the link element itself
                    const linkElement = parentLink.elementRef.nativeElement;
                    const textContent = linkElement.textContent?.trim();
                    if (textContent) {
                        return textContent;
                    }
                }
            }
            return this.ariaLabel;
        } catch {
            // Fallback to default ariaLabel if DOM is not ready or there's any error
            return this.ariaLabel;
        }
    });

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
     * Parent navigation component.
     */
    private readonly _navigation = inject(FdbNavigation, {
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
    private readonly _rtlService = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private get _activeItemIndex(): number {
        return this._keyManager?.activeItemIndex ?? -1;
    }

    /** @hidden */
    private _renderer = inject(Renderer2);

    /** @hidden */
    private _elementRef = inject(ElementRef);

    /** @hidden */
    private _ariaLabelEffect = effect(() => {
        // This effect runs whenever the signals change, but we need to ensure
        // it doesn't run during the initial change detection cycle
        setTimeout(() => {
            this._updateAriaLabel();
        }, 0);
    });

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
        const isExpandAction = KeyUtil.isKeyCode(event, this._rtlService?.rtl() ? LEFT_ARROW : RIGHT_ARROW);

        if (!isExpandAction) {
            if (this.moreButtonRef) {
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

    /**
     * Updates aria-label attribute manually to avoid expression changed errors
     */
    private _updateAriaLabel(): void {
        try {
            const ariaLabel = this.computedAriaLabel();
            if (ariaLabel !== null && ariaLabel !== undefined) {
                this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-label', ariaLabel);
            } else {
                this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-label');
            }
        } catch {
            if (this.ariaLabel) {
                this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-label', this.ariaLabel);
            }
        }
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
