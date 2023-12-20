import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    Input,
    TemplateRef,
    ViewEncapsulation,
    computed,
    effect,
    inject,
    signal
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Nullable, RtlService } from '@fundamental-ngx/cdk/utils';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { Placement } from '@fundamental-ngx/core/shared';
import { of } from 'rxjs';
import { NavigationMoreBUttonContainerDirective } from '../../directives/navigation-more-button.directive';
import { FdbNavigationItemLink } from '../../models/navigation-item-link.class';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { FdbNavigation } from '../../models/navigation.class';
import { NavigationService } from '../../services/navigation.service';
import { NavigationLinkComponent } from '../navigation-link/navigation-link.component';
import { NavigationListComponent } from '../navigation-list/navigation-list.component';

export interface NavigationMoreButtonRefContext {
    $implicit: () => void;
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'li[fdb-navigation-more-button]',
    standalone: true,
    imports: [
        NavigationLinkComponent,
        NavigationListComponent,
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent,
        NgTemplateOutlet,
        NgClass,
        NavigationMoreBUttonContainerDirective
    ],
    providers: [
        {
            provide: FdbNavigationListItem,
            useExisting: NavigationMoreButtonComponent
        }
    ],
    templateUrl: './navigation-more-button.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-navigation__list-item'
    }
})
export class NavigationMoreButtonComponent {
    /** @hidden */
    @Input()
    listItems: FdbNavigationListItem[] = [];

    /** Whether to show "More items" text. */
    @Input()
    showLink = true;

    /** @hidden */
    customMoreRenderer: Nullable<TemplateRef<any>>;

    /** Whether the show more is visible. */
    isVisible$ = signal(true);

    /** Whether popover is open. Applicable for snapped navigation state. */
    readonly popoverOpen$ = signal(false);

    /** @hidden */
    readonly type = 'showMore';

    /** @hidden */
    readonly placementContainer = undefined;

    /**
     * Whether the item is in overflow menu.
     */
    readonly isOverflow$ = signal(false);

    /** Whether item has child items. */
    readonly hasChildren$ = signal(false);

    /** @hidden */
    readonly _navigation = inject(FdbNavigation);

    /**
     * Link reference.
     */
    readonly link$ = signal<Nullable<FdbNavigationItemLink>>(null);

    /**
     * @hidden
     * Popover position. Changes based on rtl value.
     */
    readonly _popoverPlacement$ = computed<Placement>(() =>
        this._navigation.horizontal$() ? 'bottom-end' : this._rtl$() ? 'left-start' : 'right-start'
    );

    /** @hidden */
    private _popoverClicked = false;

    /** @hidden */
    private readonly _rtl$ = toSignal(
        inject(RtlService, {
            optional: true
        })?.rtl || of(false)
    );

    /** @hidden */
    private readonly _navigationService = inject(NavigationService);

    /** @hidden */
    constructor() {
        effect(() => {
            if (this.popoverOpen$() && !this._popoverClicked) {
                setTimeout(() => {
                    this.listItems.find((item) => !item.separator && !item.spacer)?.focus();
                });
            }
            this._popoverClicked = false;
        });

        this._navigation.closeAllPopups.pipe(takeUntilDestroyed(inject(DestroyRef))).subscribe(() => {
            this.popoverOpen$.set(false);
        });
    }

    /** @hidden */
    togglePopover(withClick = false): void {
        this._popoverClicked = withClick;
        this.popoverOpen$.update((value) => !value);
    }

    /** @hidden */
    registerLink(link: FdbNavigationItemLink): void {
        this.link$.set(link);
    }

    /** @hidden */
    unregisterLink(): void {
        this.link$.set(null);
    }

    /** @hidden */
    registerChildList(): void {}

    /** @hidden */
    unregisterChildList(): void {}

    /** @hidden */
    focus(): void {
        this.focusLink();
    }

    /**
     * Focuses inner link element.
     * Optionally closes the popover.
     */
    focusLink(closePopover = false): void {
        this.link$()?.focus();
        if (closePopover) {
            this.popoverOpen$.set(false);
        }
    }

    /** @hidden */
    toggleExpanded(): void {}

    /** @hidden */
    keyboardExpanded(): void {}

    /** @hidden */
    _keydownPopoverToggle(event: KeyboardEvent): void {
        this._navigationService.overflowButtonKeydownHandler(event, this as unknown as FdbNavigationListItem);
    }

    /** @hidden */
    _keydownHandler(event: KeyboardEvent): void {
        this._navigationService.overflowMenuKeydown(event);
    }

    /** @hidden */
    _focusInHandler(): void {
        this._navigationService.setRootActiveItem(this as unknown as FdbNavigationListItem);
    }

    /** @hidden */
    _closePopoverWithEsc(): void {
        this.popoverOpen$.set(false);
        this.link$()?.focus();
    }
}
