/* eslint-disable @angular-eslint/no-host-metadata-property */
import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    Signal,
    TemplateRef,
    ViewEncapsulation,
    inject,
    signal
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconComponent, IconFont } from '@fundamental-ngx/core/icon';
import { of, startWith } from 'rxjs';
import { FdbNavigationItemLink } from '../../models/navigation-item-link.class';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { FdbNavigation } from '../../models/navigation.class';
import { NavigationService } from '../../services/navigation.service';

@Directive({
    selector: '[fdbNavigationLinkRef]',
    standalone: true
})
export class NavigationLinkRefDirective {
    /** Link template ref. */
    readonly templateRef = inject(TemplateRef);
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'a[fdb-navigation-link]',
    imports: [IconComponent, NgTemplateOutlet],
    hostDirectives: [RouterLinkActive],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: FdbNavigationItemLink,
            useExisting: NavigationLinkComponent
        }
    ],
    host: {
        class: 'fd-navigation__link',
        role: 'link'
    },
    templateUrl: './navigation-link.component.html'
})
export class NavigationLinkComponent extends FdbNavigationItemLink implements OnDestroy {
    /** @hidden */
    @Input()
    class: Nullable<string>;

    /** Link glyph */
    @Input()
    glyph: Nullable<string>;

    /** Glyph font family */
    @Input()
    glyphFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

    /** Whether the link is for the external resource. */
    @Input()
    external = false;

    /** @hidden */
    @HostBinding('attr.tabindex')
    private get _tabIndex(): number {
        return this._listItemComponent?.popoverOpen$() ||
            this._navigation.getActiveItem()?.link$() === this ||
            (this._navigation.getActiveItem() === null && this._navigation.getFirstFocusableItem()?.link$() === this)
            ? 0
            : -1;
    }

    /** Whether the link is inside popover. */
    get inPopover(): boolean {
        return !!this.elementRef.nativeElement.parentElement?.classList.contains('fd-navigation__item--title');
    }

    /** Element reference. */
    readonly elementRef = inject<ElementRef<HTMLLinkElement>>(ElementRef);

    /** @hidden */
    readonly hasRouterLink$ = signal(false);

    /** @hidden */
    readonly isActive$: Signal<boolean | undefined>;

    /** @hidden */
    readonly _listItemComponent = inject(FdbNavigationListItem, {
        optional: true
    });

    /** Router link reference. Used to determine whether the list item should be rendered with external expansion button. */
    readonly routerLink = inject(RouterLink, {
        optional: true,
        self: true
    });

    /** @hidden */
    private readonly _routerLinkActive = inject(RouterLinkActive, {
        optional: true,
        self: true
    });

    /** @hidden */
    private readonly _navigation = inject(FdbNavigation);

    /** @hidden */
    private readonly _navigationService = inject(NavigationService);

    /** @hidden */
    constructor() {
        super();
        this._listItemComponent?.registerLink(this);
        this.hasRouterLink$.set(!!this.routerLink);
        this.isActive$ = toSignal(
            this._routerLinkActive?.isActiveChange.pipe(startWith(this._routerLinkActive.isActive)) || of(false)
        );
    }

    /** @hidden */
    @HostListener('click')
    private _clickHandler(): void {
        if (this.inPopover || !this._listItemComponent?.isVisible$() || this._listItemComponent?.isOverflow$()) {
            this._navigation.closePopups();
        }
        // Ignore click if link has URL applied to it.
        if (this.routerLink) {
            return;
        }
        this._listItemComponent?.toggleExpanded();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    private _keyDownHandler(event: KeyboardEvent): void {
        this._navigationService.linkKeydownHandler(event, this.inPopover, this._listItemComponent);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._listItemComponent?.unregisterLink(this);
    }

    /** Focus link. */
    focus(): void {
        this.elementRef.nativeElement.focus();
    }
}
