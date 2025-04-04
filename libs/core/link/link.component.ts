import { DomPortal, Portal, PortalModule } from '@angular/cdk/portal';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Optional,
    QueryList,
    Self,
    ViewChild,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { FD_ICON_COMPONENT, IconComponent } from '@fundamental-ngx/core/icon';
import { map, startWith, tap } from 'rxjs';
import { FD_LINK_COMPONENT } from './tokens';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdLink], [fd-link]',
    templateUrl: './link.component.html',
    styleUrl: './link.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_LINK_COMPONENT,
            useExisting: LinkComponent
        },
        {
            provide: 'linkRouterTarget',
            useFactory: (withHref?: RouterLink, routerLink?: RouterLink): RouterLink | undefined =>
                withHref || routerLink,
            deps: [
                [new Optional(), new Self(), RouterLink],
                [new Optional(), new Self(), RouterLink]
            ]
        }
    ],
    imports: [PortalModule]
})
export class LinkComponent implements OnChanges, OnInit, CssClassBuilder, AfterViewInit {
    /** @hidden */
    @ContentChildren(FD_ICON_COMPONENT)
    iconComponents: QueryList<IconComponent>;

    /** @hidden */
    @ViewChild('content')
    contentSpan: ElementRef<HTMLSpanElement>;

    /** user's custom classes */
    @Input()
    class: string;

    /** Whether user wants to use emphasized mode */
    @Input()
    emphasized: boolean;

    /** Whether user wants to put disabled mode */
    @Input()
    disabled: boolean;

    /** Whether user wants to use inverted mode */
    @Input()
    inverted: boolean;

    /** Whether user wants to use subtle mode */
    @Input()
    subtle: boolean;

    /** Whether user wants to have a link without underline decoration */
    @Input()
    undecorated: boolean;

    /** @hidden */
    _prefixPortal: Portal<any> | null;

    /** @hidden */
    _postfixPortal: Portal<any> | null;

    /** @hidden */
    _prefixIconName: string;
    /** @hidden */
    _postfixIconName: string;

    /** @hidden */
    private readonly _destroyed$ = inject(DestroyRef);

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef<HTMLElement>,
        private changeDetectorRef: ChangeDetectorRef,
        @Inject('linkRouterTarget') readonly routerLink: RouterLink
    ) {}

    /**
     * @hidden
     * CssClassBuilder interface implementation
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-link',
            this.emphasized ? 'fd-link--emphasized' : '',
            this.disabled ? 'is-disabled' : '',
            this.inverted ? `fd-link--inverted` : '',
            this.subtle ? 'fd-link--subtle' : '',
            this.undecorated ? 'fd-link--undecorated' : '',
            this.class
        ];
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.iconComponents.changes
            .pipe(
                startWith(this.iconComponents),
                map((c) => c.toArray()),
                map((icons) =>
                    // We are only interested in the first descendant of the content element
                    icons.filter(
                        (icon) => icon.elementRef.nativeElement.parentElement === this.contentSpan.nativeElement
                    )
                ),
                map((icons) => {
                    if (icons.length === 0) {
                        return {};
                    }
                    const prefix =
                        icons[0].elementRef.nativeElement === this.contentSpan.nativeElement.childNodes[0]
                            ? icons[0].elementRef.nativeElement
                            : null;
                    const postfix =
                        icons[icons.length - 1].elementRef.nativeElement ===
                        this.contentSpan.nativeElement.childNodes[this.contentSpan.nativeElement.childNodes.length - 1]
                            ? icons[icons.length - 1].elementRef.nativeElement
                            : null;
                    if (prefix) {
                        this._prefixIconName = this.iconComponents.first.glyph;
                    } else {
                        this._prefixIconName = '';
                    }
                    if (postfix) {
                        this._postfixIconName = this.iconComponents.last.glyph;
                    } else {
                        this._postfixIconName = '';
                    }
                    return { prefix, postfix };
                }),
                tap(() => {
                    if (this._prefixPortal?.isAttached) {
                        this._prefixPortal.detach();
                    }
                    if (this._postfixPortal?.isAttached) {
                        this._postfixPortal.detach();
                    }
                }),
                tap(({ prefix, postfix }) => {
                    this._prefixPortal = prefix ? new DomPortal(prefix) : null;
                    this._postfixPortal = postfix ? new DomPortal(postfix) : null;
                }),
                tap(() => {
                    this.changeDetectorRef.detectChanges();
                }),
                takeUntilDestroyed(this._destroyed$)
            )
            .subscribe();
    }
}
