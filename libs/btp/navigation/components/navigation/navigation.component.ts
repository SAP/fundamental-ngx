/* eslint-disable @angular-eslint/no-input-rename,@angular-eslint/no-host-metadata-property */
import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    QueryList,
    ViewEncapsulation,
    computed,
    effect,
    inject,
    signal
} from '@angular/core';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { CssClassBuilder, KeyUtil, Nullable, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { FdbNavigationState, FdbNavigationType } from '../../models/navigation.types';
import { NavigationService } from '../../services/navigation.service';

@Component({
    selector: 'fdb-navigation',
    template: `
        <ng-content></ng-content>
        <ng-template #defaultLinkTemplate>
            <a fdb-navigation-link glyph="home" label="Home"></a>
        </ng-template>
    `,
    styleUrls: ['./navigation.component.scss'],
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [NavigationService],
    host: {
        role: 'navigation'
    }
})
export class NavigationComponent implements CssClassBuilder, OnChanges, AfterViewInit {
    /** @hidden */
    @Input()
    class: string;

    /**
     * Navigation mode.
     */
    @Input()
    mode: FdbViewMode = '';

    /**
     * Navigation state.
     */
    @Input()
    set state(value: FdbNavigationState) {
        this.state$.set(value);
    }
    get state(): FdbNavigationState {
        return this.state$();
    }

    /**
     * Navigation type.
     */
    @Input()
    type: FdbNavigationType = 'vertical';

    /** @hidden */
    @ContentChildren(FdbNavigationListItem, { descendants: true })
    private readonly _navigationItems: QueryList<FdbNavigationListItem>;

    /**
     * State signal.
     */
    readonly state$ = signal<FdbNavigationState>('expanded');

    /**
     * Whether the navigation is in snapped mode.
     */
    readonly isSnapped$ = computed(() => this.state$() === 'snapped');

    /**
     * Whether to show "More" button. Applicable for `snapped` state only.
     */
    readonly showMoreButton$ = signal<Nullable<FdbNavigationListItem>>(null);

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    private readonly _viewInited$ = signal(false);

    /** @hidden */
    private _keyManager: FocusKeyManager<FdbNavigationListItem>;

    /** @hidden */
    constructor() {
        // When show more button is shown, reset items list with added "More button".
        effect(() => {
            if (this._viewInited$()) {
                this._resetItemsList(this.showMoreButton$());
            }
        });
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            this.class,
            'fd-navigation',
            `fd-navigation--${this.type}`,
            this.mode ? `fd-navigation--${this.mode}` : '',
            `fd-navigation--${this.state}`
        ];
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    private _keyDownHandler(event: KeyboardEvent): void {
        if (!KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW])) {
            return;
        }

        event.preventDefault();

        this._keyManager.onKeydown(event);
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._keyManager = new FocusKeyManager(this._navigationItems)
            .withVerticalOrientation()
            .skipPredicate((item) => !item.isVisible$());
        this._keyManager.setActiveItem(0);
        this._viewInited$.set(true);
    }

    /**
     * Returns currently focused list item.
     */
    getActiveItem(): FdbNavigationListItem | null {
        return this._keyManager.activeItem;
    }

    /**
     * Sets focused item.
     */
    setActiveItem(item: FdbNavigationListItem): void {
        this._keyManager.setActiveItem(item);
    }

    /** @hidden */
    private _resetItemsList(showMoreButton: Nullable<FdbNavigationListItem>): void {
        if (!showMoreButton) {
            const items = [...this._navigationItems.toArray()];
            const showMoreButtonIndex = items.findIndex((item) => item.type === 'showMore');

            if (showMoreButtonIndex === -1) {
                return;
            }

            items.splice(showMoreButtonIndex, 1);

            this._navigationItems.reset(items);
        } else {
            const items = [...this._navigationItems.toArray()];
            const showMoreButtonIndex = items.findIndex((item) => item.type === 'showMore');

            if (showMoreButtonIndex > -1) {
                return;
            }

            const insertionIndex = items.findIndex(
                (item) =>
                    item.placementContainer?.placement === 'start' && item.placementContainer?.listItems.last === item
            );

            if (insertionIndex === -1) {
                return;
            }

            items.splice(insertionIndex, 0, showMoreButton);
            this._navigationItems.reset(items);
        }
    }
}
