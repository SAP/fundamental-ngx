/* eslint-disable @angular-eslint/no-host-metadata-property */
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CssClassBuilder, HasElementRef, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { FdbNavigationComponent } from './navigation-component.token';
import { FdbNavigationListItemComponent } from './navigation-list-item-component.token';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'a[fdb-navigation-link]',
    template: `
        @if (glyph) {
            <fd-icon
                [glyph]="glyph"
                class="fd-navigation__icon"
                [attr.role]="'presentation'"
                [ariaHidden]="true"
            ></fd-icon>
        }
        <ng-template #textRenderer>
            <span class="fd-navigation__text">{{ label }}</span>
            @if (external) {
                <span
                    class="fd-navigation__external-link-indicator"
                    role="presentation"
                    aria-hidden="true"
                    aria-label="external link indicator"
                ></span>
            }
        </ng-template>
        <ng-template [ngTemplateOutlet]="textRenderer" />
        <span
            class="fd-navigation__selection-indicator"
            role="presentation"
            aria-hidden="true"
            aria-label="selection indicator"
        >
        </span>
        @if (
            navigationListItemComponent?.childNavigationListComponent() &&
            navigationListItemComponent?.normalizedLevel() !== 3 &&
            !_routerLink
        ) {
            <span
                class="fd-navigation__has-children-indicator"
                role="presentation"
                aria-hidden="true"
                aria-label="has children indicator, expanded"
            >
            </span>
        }
    `,
    imports: [IconComponent, AsyncPipe, NgTemplateOutlet],
    hostDirectives: [RouterLinkActive],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        role: 'link'
    }
})
export class NavigationLinkComponent implements OnInit, OnChanges, CssClassBuilder, HasElementRef {
    /** @ignore */
    @Input()
    class: string;

    /** @ignore */
    @Input()
    glyph: string;

    /** Label to be displayed as a link text. */
    @Input({ required: true })
    label: string;

    /** Whether the link is for the external resource. */
    @Input()
    external = false;

    /** @ignore */
    @ViewChild('textRenderer')
    textRenderer: TemplateRef<any>;

    /** @ignore */
    @HostBinding('attr.tabindex')
    _tabindex = 0;

    /** @ignore */
    readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @ignore */
    readonly _routerLink = inject(RouterLink, {
        optional: true,
        self: true
    });

    /** @ignore */
    readonly _routerLinkActive = inject(RouterLinkActive, { optional: true });

    /**
     * If user applies RouterLink, we need to check if the link is active
     * @ignore
     **/
    protected isActive = toSignal(inject(RouterLinkActive).isActiveChange);

    /** @ignore */
    protected navigationListItemComponent = inject(FdbNavigationListItemComponent);

    /** @ignore */
    private readonly _navigationComponent = inject(FdbNavigationComponent);

    /** @ignore */
    constructor() {
        this.navigationListItemComponent.linkComponent = this;
        this.navigationListItemComponent.routerLink.set(this._routerLink);
        this.navigationListItemComponent.routerLinkActive.set(this._routerLinkActive);
    }

    /** @ignore */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.class || '', 'fd-navigation__link'];
    }

    /** @ignore */
    @HostListener('click')
    private _onClick(): void {
        if (this.navigationListItemComponent.childNavigationListComponent()) {
            this.navigationListItemComponent.toggle();
        }
    }

    /** @ignore */
    @HostListener('focus')
    private _focusHandler(): void {
        this._navigationComponent.setActiveItem(this.navigationListItemComponent);
    }

    /** @ignore */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }
}
