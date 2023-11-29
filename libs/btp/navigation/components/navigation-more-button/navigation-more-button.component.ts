import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    effect,
    inject,
    signal
} from '@angular/core';
import { KeyUtil, Nullable, RtlService } from '@fundamental-ngx/cdk';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
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
        NgIf,
        NavigationLinkComponent,
        NavigationListComponent,
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent,
        NgTemplateOutlet
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

    /** @hidden */
    @ViewChild(NavigationLinkComponent)
    private readonly _link: Nullable<NavigationLinkComponent>;

    /** @hidden */
    @ViewChild(NavigationListComponent)
    private readonly _list: Nullable<NavigationListComponent>;

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

    /**
     * Link reference.
     */
    readonly link$ = signal<Nullable<NavigationLinkComponent>>(null);

    /** @hidden */
    private readonly _rtl = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    constructor() {
        effect(() => {
            if (this.popoverOpen$()) {
                setTimeout(() => {
                    this.listItems[0]?.focus();
                });
            }
        });
    }

    /** @hidden */
    togglePopover(): void {
        this.popoverOpen$.update((value) => !value);
    }

    /** @hidden */
    registerLink(): void {}

    /** @hidden */
    unregisterLink(): void {}

    /** @hidden */
    registerChildList(): void {}

    /** @hidden */
    unregisterChildList(): void {}

    /** @hidden */
    focus(): void {
        this._link?.elementRef.nativeElement.focus();
    }

    /** @hidden */
    toggleExpanded(): void {}

    /** @hidden */
    keyboardExpanded(): void {}

    /** @hidden */
    _keydownPopoverToggle(event: KeyboardEvent): void {
        if (!KeyUtil.isKeyCode(event, [LEFT_ARROW, RIGHT_ARROW])) {
            return;
        }
        const isRtl = this._rtl?.rtl.value || false;

        const isOpenAction = KeyUtil.isKeyCode(event, isRtl ? LEFT_ARROW : RIGHT_ARROW);

        this.popoverOpen$.set(isOpenAction);
    }
}
