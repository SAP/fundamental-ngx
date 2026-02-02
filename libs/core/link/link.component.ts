import { DomPortal, Portal, PortalModule } from '@angular/cdk/portal';
import {
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChildren,
    ElementRef,
    inject,
    InjectionToken,
    input,
    Optional,
    Self,
    signal,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { HasElementRef } from '@fundamental-ngx/cdk';
import { FD_ICON_COMPONENT, IconComponent } from '@fundamental-ngx/core/icon';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { FD_LINK_COMPONENT } from './tokens';

const LINK_ROUTER_TARGET = new InjectionToken<RouterLink | undefined>('linkRouterTarget');

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdLink], [fd-link]',
    templateUrl: './link.component.html',
    styleUrl: './link.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.aria-disabled]': 'disabled() ? true : false',
        '[class]': '_cssClass()'
    },
    providers: [
        {
            provide: FD_LINK_COMPONENT,
            useExisting: LinkComponent
        },
        {
            provide: LINK_ROUTER_TARGET,
            useFactory: (withHref?: RouterLink, routerLink?: RouterLink): RouterLink | undefined =>
                withHref || routerLink,
            deps: [
                [new Optional(), new Self(), RouterLink],
                [new Optional(), new Self(), RouterLink]
            ]
        }
    ],
    imports: [PortalModule, FdTranslatePipe]
})
export class LinkComponent implements HasElementRef, AfterViewInit {
    /** @hidden */
    readonly iconComponents = contentChildren<IconComponent>(FD_ICON_COMPONENT, { descendants: false });

    /** @hidden */
    readonly contentSpan = viewChild<ElementRef<HTMLSpanElement>>('content');

    /** Whether user wants to use emphasized mode */
    readonly emphasized = input(false, { transform: booleanAttribute });

    /** Whether user wants to put disabled mode */
    readonly disabled = input(false, { transform: booleanAttribute });

    /** Whether user wants to use inverted mode */
    readonly inverted = input(false, { transform: booleanAttribute });

    /** Whether user wants to use subtle mode */
    readonly subtle = input(false, { transform: booleanAttribute });

    /** Whether user wants to have a link without underline decoration */
    readonly undecorated = input(false, { transform: booleanAttribute });

    /** Whether user wants to have a larger touch target */
    readonly touchTarget = input(false, { transform: booleanAttribute });

    /** @hidden */
    readonly elementRef = inject(ElementRef<HTMLElement>);

    /** @hidden */
    readonly routerLink = inject<RouterLink>(LINK_ROUTER_TARGET);

    /** @hidden */
    protected readonly _prefixPortal = signal<Portal<any> | null>(null);

    /** @hidden */
    protected readonly _postfixPortal = signal<Portal<any> | null>(null);

    /** @hidden */
    protected readonly _prefixIconName = signal<string>('');

    /** @hidden */
    protected readonly _postfixIconName = signal<string>('');

    /** @hidden */
    protected readonly _cssClass = computed(() =>
        [
            'fd-link',
            this.emphasized() ? 'fd-link--emphasized' : '',
            this.disabled() ? 'is-disabled' : '',
            this.inverted() ? 'fd-link--inverted' : '',
            this.subtle() ? 'fd-link--subtle' : '',
            this.undecorated() ? 'fd-link--undecorated' : '',
            this.touchTarget() ? 'fd-link--touch-target' : ''
        ]
            .filter(Boolean)
            .join(' ')
    );

    /** @hidden */
    ngAfterViewInit(): void {
        const icons = this.iconComponents();
        const contentEl = this.contentSpan()?.nativeElement;

        if (!contentEl || icons.length === 0) {
            this._detachPortals();
            this._prefixPortal.set(null);
            this._postfixPortal.set(null);
            this._prefixIconName.set('');
            this._postfixIconName.set('');
            return;
        }

        if (icons.length === 0) {
            this._detachPortals();
            this._prefixPortal.set(null);
            this._postfixPortal.set(null);
            this._prefixIconName.set('');
            this._postfixIconName.set('');
            return;
        }

        // Determine prefix and postfix icons
        const firstIcon = icons[0];
        const lastIcon = icons[icons.length - 1];

        const prefix =
            firstIcon.elementRef.nativeElement === contentEl.childNodes[0] ? firstIcon.elementRef.nativeElement : null;
        const postfix =
            lastIcon.elementRef.nativeElement === contentEl.childNodes[contentEl.childNodes.length - 1]
                ? lastIcon.elementRef.nativeElement
                : null;

        // Update icon names
        if (prefix) {
            this._prefixIconName.set(icons[0].glyph());
        } else {
            this._prefixIconName.set('');
        }

        if (postfix) {
            this._postfixIconName.set(icons[icons.length - 1].glyph());
        } else {
            this._postfixIconName.set('');
        }

        // Update portals
        this._detachPortals();
        this._prefixPortal.set(prefix ? new DomPortal(prefix) : null);
        this._postfixPortal.set(postfix ? new DomPortal(postfix) : null);
    }

    /** @hidden */
    private _detachPortals(): void {
        const prefix = this._prefixPortal();
        const postfix = this._postfixPortal();

        if (prefix?.isAttached) {
            prefix.detach();
        }
        if (postfix?.isAttached) {
            postfix.detach();
        }
    }
}
