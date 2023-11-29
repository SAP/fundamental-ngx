import { FocusKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { NgForOf, NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ViewEncapsulation,
    computed,
    inject,
    signal
} from '@angular/core';
import { KeyUtil, Nullable, RtlService } from '@fundamental-ngx/cdk';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { NavigationService } from '../../services/navigation.service';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'ul[fdb-navigation-list]',
    standalone: true,
    imports: [NgForOf, NgTemplateOutlet],
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
    set _listItems(value: FdbNavigationListItem[]) {
        this._listItemsArray = value;
        this.listItems$.set(value);
        this._setupKeyManager();
    }

    get _listItems(): FdbNavigationListItem[] {
        return this._listItemsArray;
    }

    /** List Role. */
    @HostBinding('attr.role')
    @Input()
    role: 'tree' | 'menubar' = 'tree';

    /** Whether the list is for parent items. */
    @HostBinding('class.fd-navigation__list--parent-items')
    @Input({ transform: coerceBooleanProperty })
    parentItems = false;

    /** Whether the list is for child items. */
    @HostBinding('class.fd-navigation__list--child-items')
    @Input({ transform: coerceBooleanProperty })
    childItems = false;

    /** Whether the list should not grow in height. */
    @HostBinding('class.fd-navigation__list--no-grow')
    @Input({ transform: coerceBooleanProperty })
    noGrow = false;

    /** Whether the list should handle keyboard navigation. */
    @Input({ transform: coerceBooleanProperty })
    withKeyboardNavigation = false;

    /** Event emitted when user tries to navigate to the item before the list itself. */
    @Output()
    focusBefore = new EventEmitter<void>();

    /** Event emitted when user tries to navigate to the item after the list itself. */
    @Output()
    focusAfter = new EventEmitter<void>();

    /** List items. */
    readonly listItems$ = signal<FdbNavigationListItem[]>([]);

    /** List item renderers. */
    readonly renderers$ = computed(() => this.listItems$().map((item) => item.renderer$()));

    /** @hidden */
    private _listItemsArray: FdbNavigationListItem[] = [];

    /** @hidden */
    private _keyManager: Nullable<FocusKeyManager<FdbNavigationListItem>>;

    /** @hidden */
    private readonly _navigationService = inject(NavigationService, {
        optional: true
    });

    /** @hidden */
    private readonly _listItem = inject(FdbNavigationListItem, {
        optional: true
    });

    /** @hidden */
    private readonly _rtl = inject(RtlService);

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
        } else if (KeyUtil.isKeyCode(event, DOWN_ARROW) && this._activeItemIndex === this._listItemsArray.length - 1) {
            this.focusAfter.emit();
            return;
        }

        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW])) {
            this._keyManager?.onKeydown(event);
        }
    }

    /** @hidden */
    setActiveItemIndex(index: number): void {
        this._keyManager?.setActiveItem(index);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._navigationService?.currentItem$.subscribe((item) => {
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
    }

    /** @hidden */
    private _setupKeyManager(): void {
        this._keyManager?.destroy();

        if (!this.withKeyboardNavigation) {
            return;
        }

        this._keyManager = new FocusKeyManager(this._listItemsArray).withVerticalOrientation();
    }
}
