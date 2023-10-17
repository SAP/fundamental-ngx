/* eslint-disable @angular-eslint/no-host-metadata-property */
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
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
        <ng-container *ngIf="glyph">
            <fd-icon
                [glyph]="glyph"
                class="fd-navigation__icon"
                [attr.role]="'presentation'"
                [ariaHidden]="true"
            ></fd-icon>
        </ng-container>
        <ng-template #textRenderer>
            <span class="fd-navigation__text">{{ label }}</span>
            <span
                class="fd-navigation__external-link-indicator"
                role="presentation"
                aria-hidden="true"
                aria-label="external link indicator"
                *ngIf="external"
            ></span>
        </ng-template>
        <ng-container *ngTemplateOutlet="textRenderer" />
        <span
            class="fd-navigation__selection-indicator"
            role="presentation"
            aria-hidden="true"
            aria-label="selection indicator"
        >
        </span>
        <span
            *ngIf="
                navigationListItemComponent?.childNavigationListComponent() &&
                navigationListItemComponent?.normalizedLevel() !== 3 &&
                !_routerLink
            "
            class="fd-navigation__has-children-indicator"
            role="presentation"
            aria-hidden="true"
            aria-label="has children indicator, expanded"
        >
        </span>
    `,
    imports: [NgIf, IconComponent, AsyncPipe, NgTemplateOutlet],
    hostDirectives: [RouterLinkActive],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        role: 'link'
    }
})
export class NavigationLinkComponent implements OnInit, OnChanges, CssClassBuilder, HasElementRef {
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
    @ViewChild('textRenderer')
    textRenderer: TemplateRef<any>;

    /** @hidden */
    @HostBinding('attr.tabindex')
    _tabindex = 0;

    /** @hidden */
    readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden */
    readonly _routerLink = inject(RouterLink, {
        optional: true,
        self: true
    });

    /** @hidden */
    readonly _routerLinkActive = inject(RouterLinkActive, { optional: true });

    /**
     * If user applies RouterLink, we need to check if the link is active
     * @hidden
     **/
    protected isActive = toSignal(inject(RouterLinkActive).isActiveChange);

    /** @hidden */
    protected navigationListItemComponent = inject(FdbNavigationListItemComponent);

    /** @hidden */
    private readonly _navigationComponent = inject(FdbNavigationComponent);

    /** @hidden */
    constructor() {
        this.navigationListItemComponent.linkComponent = this;
        this.navigationListItemComponent.routerLink.set(this._routerLink);
        this.navigationListItemComponent.routerLinkActive.set(this._routerLinkActive);
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.class || '', 'fd-navigation__link'];
    }

    /** @hidden */
    @HostListener('click')
    private _onClick(): void {
        if (this.navigationListItemComponent.childNavigationListComponent()) {
            this.navigationListItemComponent.toggle();
        }
    }

    /** @hidden */
    @HostListener('focus')
    private _focusHandler(): void {
        this._navigationComponent.setActiveItem(this.navigationListItemComponent);
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }
}
