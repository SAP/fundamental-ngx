/* eslint-disable @angular-eslint/no-host-metadata-property */
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
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
    inject
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { KeyUtil, RtlService } from '@fundamental-ngx/cdk';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { of, startWith } from 'rxjs';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { NavigationComponent } from '../navigation/navigation.component';

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
    imports: [NgIf, IconComponent, AsyncPipe, NgTemplateOutlet],
    hostDirectives: [RouterLinkActive],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-navigation__link',
        role: 'link'
    },
    templateUrl: './navigation-link.component.html'
})
export class NavigationLinkComponent implements OnDestroy {
    /** @hidden */
    @Input()
    class: string;

    /** @hidden */
    @Input()
    glyph: string;

    /** Label to be displayed as a link text. */
    @Input({ required: true })
    label: string;

    /** Whether the link is for the external resource. */
    @Input()
    external = false;

    /** @hidden */
    @HostBinding('attr.tabindex')
    private get _tabIndex(): number {
        return this._listItemComponent?.popoverOpen$() || this._navigation.getActiveItem()?.link$() === this ? 0 : -1;
    }

    /** Whether the link is inside popover. */
    get inPopover(): boolean {
        return !!this.elementRef.nativeElement.parentElement?.classList.contains('fd-navigation__item--title');
    }

    /** Element reference. */
    readonly elementRef = inject<ElementRef<HTMLLinkElement>>(ElementRef);

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
        optional: true
    });

    /** @hidden */
    private readonly _rtl = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    private readonly _navigation = inject(NavigationComponent);

    /** @hidden */
    constructor() {
        this._listItemComponent?.registerLink(this);
        this.isActive$ = toSignal(
            this._routerLinkActive?.isActiveChange.pipe(startWith(this._routerLinkActive.isActive)) || of(false)
        );
    }

    /** @hidden */
    @HostListener('click')
    private _clickHandler(): void {
        // Ignore click if link has URL applied to it.
        if (this.routerLink) {
            return;
        }
        this._listItemComponent?.toggleExpanded();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    private _keyDownHandler(event: KeyboardEvent): void {
        if (this.inPopover && KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            this._listItemComponent?.popoverLinkArrowDown();
            return;
        }
        if (!KeyUtil.isKeyCode(event, [LEFT_ARROW, RIGHT_ARROW])) {
            return;
        }

        const expansionKey = this._rtl?.rtl ? RIGHT_ARROW : LEFT_ARROW;

        this._listItemComponent?.keyboardExpanded(KeyUtil.isKeyCode(event, expansionKey));
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._listItemComponent?.unregisterLink(this);
    }
}
