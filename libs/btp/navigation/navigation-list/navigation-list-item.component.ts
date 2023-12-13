/* eslint-disable @angular-eslint/no-input-rename */
import { FocusableOption } from '@angular/cdk/a11y';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { DomPortal } from '@angular/cdk/portal';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    HostListener,
    Injector,
    Input,
    OnChanges,
    OnInit,
    QueryList,
    Signal,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    computed,
    effect,
    inject,
    signal
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NestedButtonDirective } from '@fundamental-ngx/btp/button';
import {
    CssClassBuilder,
    HasElementRef,
    KeyUtil,
    Nullable,
    TabbableElementService,
    applyCssClass
} from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { PopoverComponent, PopoverControlComponent, PopoverService } from '@fundamental-ngx/core/popover';
import { FdbNavigationComponent } from '../navigation-component.token';
import { NavigationLinkComponent } from '../navigation-link.component';
import { FdbNavigationListComponent } from '../navigation-list-component.token';
import { FdbNavigationListItemComponent } from '../navigation-list-item-component.token';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'li[fdb-navigation-list-item]',
    templateUrl: './navigation-list-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        PopoverService,
        {
            provide: FdbNavigationListItemComponent,
            useExisting: NavigationListItemComponent
        }
    ],
    imports: [
        AsyncPipe,
        NgTemplateOutlet,
        PopoverComponent,
        PopoverControlComponent,
        RouterLink,
        ButtonComponent,
        IconComponent,
        NestedButtonDirective
    ],
    standalone: true
})
export class NavigationListItemComponent
    extends FdbNavigationListItemComponent
    implements OnInit, OnChanges, CssClassBuilder, HasElementRef, AfterViewInit, FocusableOption
{
    /** @ignore */
    @Input()
    class: Nullable<string>;

    /** @ignore */
    @Input()
    set group(group: boolean) {
        this.isGroup.set(group);
    }

    /** @ignore */
    @Input('expanded')
    set _expanded(expanded: boolean) {
        this.expanded.set(expanded);
    }

    /** @ignore */
    @Input()
    linkTemplate: TemplateRef<void>;

    /** @ignore */
    @Input()
    alwaysFocusable = false;

    /** @ignore */
    @ContentChild(FdbNavigationListComponent)
    set _navigationListComponent(navigationListComponent: FdbNavigationListComponent) {
        this.childNavigationListComponent.set(navigationListComponent);
    }

    /** @ignore */
    @ContentChild(RouterLinkActive)
    set _routerLinkActive(routerLinkActive: RouterLinkActive) {
        this.routerLinkActive.set(routerLinkActive);
    }

    /** @ignore */
    @ContentChild(RouterLink)
    set _routerLink(routerLink: RouterLink) {
        this.routerLink.set(routerLink);
    }

    /** @ignore */
    @ViewChild('childrenTemplate', { read: TemplateRef })
    set _childrenTemplate(templateRef: TemplateRef<void>) {
        this.childrenTemplate.set(templateRef);
    }

    /** @ignore */
    @ViewChild('navigationItem')
    _navigationItem: ElementRef;

    /** @ignore */
    @ContentChild(NavigationLinkComponent)
    linkComponent: Nullable<NavigationLinkComponent>;

    /** @ignore */
    @ContentChildren(FdbNavigationListItemComponent, { descendants: true })
    private readonly _childNavigationListItems: QueryList<FdbNavigationListItemComponent>;

    /** @ignore */
    @ViewChild('clonedMainLink', { static: false, read: ElementRef })
    private readonly _clonedMainLink: Nullable<ElementRef>;

    /** @ignore */
    injector = inject(Injector);

    /** @ignore */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @ignore */
    parentListItemComponent = inject(FdbNavigationListItemComponent, { optional: true, skipSelf: true });

    /** @ignore */
    override noArrow = false;

    /** @ignore */
    override additionalBodyClass = 'fd-navigation__list-container';

    /** @ignore */
    routerLink = signal<RouterLink | null>(null);

    /** @ignore */
    routerLinkActive = signal<RouterLinkActive | null>(null);

    /** @ignore */
    isRouterLinkActive = computed(() => {
        const routerLinkActive = this.routerLinkActive();
        if (routerLinkActive) {
            return toSignal(routerLinkActive.isActiveChange, {
                initialValue: routerLinkActive.isActive,
                injector: this.injector
            })();
        }
        return false;
    });

    /** @ignore */
    childNavigationListComponent = signal<FdbNavigationListComponent | null>(null);
    /** @ignore */
    expanded = signal(false);

    /** @ignore */
    fullPathExpanded = computed(
        () => (this.parentListItemComponent ? this.parentListItemComponent.expanded() : true) && this.expanded()
    );

    /** @ignore */
    isGroup = signal(false);

    /** @ignore */
    childrenTemplate = signal<TemplateRef<void> | null>(null);

    /** @ignore */
    childrenActive = signal(false);

    /** @ignore */
    inPortal = computed(() => this.parentInPortal() || this._selfInPortal());

    /** @ignore */
    parentInPortal = computed(() => this.parentListItemComponent?.inPortal() || false);

    /**
     * Used in attribute only. For actual calculation of level of nesting use `normalizedLevel`.
     */
    get level(): Signal<number> {
        return this.parentNavigationListComponent.level;
    }

    /**
     * Used for calculation of the level of inclusion. Can be different than the actual level due to ability to mix grouped lists with ungrouped.
     * For ungrouped lists will add +1 for the first list in the hierarchy to mimic group existence.
     */
    normalizedLevel = computed(() => {
        if (this.parentNavigationListComponent.isInGroup() || this.isGroup()) {
            return this.level();
        }
        return this.level() + 1;
    });

    /** @ignore */
    _isInPopover = computed(
        () => this.navigationComponent.isSnapped() && (this.normalizedLevel() > 2 || this._hidden())
    );

    /** @ignore */
    // eslint-disable-next-line max-len
    expandedAttr = computed(
        () =>
            (this.expanded() ||
                (this.normalizedLevel() === 1 &&
                    !!this.childNavigationListComponent() &&
                    this.navigationComponent.isSnapped())) &&
            !this._hidden()
    );

    /**
     * Icon which should be used for the toggle button.
     **/
    toggleIcon = computed(() => {
        if (this.expandedAttr()) {
            return 'slim-arrow-down';
        }
        return this._isRtl() ? 'slim-arrow-left' : 'slim-arrow-right';
    });

    /** @ignore */
    domPortal: Nullable<DomPortal>;

    /** @ignore */
    private _selfInPortal = signal(false);

    /** @ignore */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @ignore */
    private readonly _tabbableService = inject(TabbableElementService);

    /** @ignore */
    private readonly _navigationComponent = inject(FdbNavigationComponent);

    /** @ignore */
    constructor() {
        super();
        effect(() => {
            this.additionalBodyComponentClasses = [
                'fd-navigation',
                'fd-navigation--snapped',
                `fd-navigation--${this.navigationComponent.mode()}`
            ]
                .filter((klass) => !!klass)
                .join(' ');
            this._popoverService.updateContent(null, this.childrenTemplate());
        });
    }

    /** @ignore */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.class || '', 'fd-navigation__list-item'];
    }

    /** @ignore */
    @HostListener('keydown', ['$event'])
    private _keydownHandler(event: KeyboardEvent): void {
        if (this._isInPopover() && KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW])) {
            event.stopImmediatePropagation();
            if (this._hidden() || this.parentListItemComponent?._hidden()) {
                const hiddenItems = this.navigationComponent.getMoreButton()?.hiddenItems() || [];
                const firstLevelHiddenElementCondition =
                    hiddenItems &&
                    ((KeyUtil.isKeyCode(event, UP_ARROW) &&
                        this.elementRef.nativeElement === hiddenItems[0]?.elementRef.nativeElement) ||
                        (KeyUtil.isKeyCode(event, DOWN_ARROW) &&
                            this.elementRef.nativeElement ===
                                hiddenItems[hiddenItems.length - 1]?.elementRef.nativeElement));

                const secondLevelHiddenElementCondition =
                    this.normalizedLevel() > 2 &&
                    ((KeyUtil.isKeyCode(event, UP_ARROW) &&
                        this.parentNavigationListComponent.listItems.first === this) ||
                        (KeyUtil.isKeyCode(event, DOWN_ARROW) &&
                            this.parentNavigationListComponent.listItems.last === this));

                if (firstLevelHiddenElementCondition || secondLevelHiddenElementCondition) {
                    return;
                }
                this.navigationComponent.keyDownHandler(event);
                return;
            }
            if (KeyUtil.isKeyCode(event, UP_ARROW) && this.parentNavigationListComponent.listItems.first === this) {
                this.parentListItemComponent?.focusOnClonedLink();
            }
            if (
                (KeyUtil.isKeyCode(event, UP_ARROW) && this.parentNavigationListComponent.listItems.first === this) ||
                (KeyUtil.isKeyCode(event, DOWN_ARROW) && this.parentNavigationListComponent.listItems.last === this)
            ) {
                return;
            }
            this.navigationComponent.keyDownHandler(event);
            return;
        }
        if (!KeyUtil.isKeyCode(event, [LEFT_ARROW, RIGHT_ARROW])) {
            return;
        }
        event.stopImmediatePropagation();
        const shouldExpand = !this._isCollapseAction(event);

        if (!this.navigationComponent.isSnapped()) {
            this._expandedStateKeyboardHandler(shouldExpand);
        } else {
            this._snappedStateKeyboardHandler(shouldExpand);
        }
    }

    /** @ignore */
    clonedMainLinkKeydown(event: KeyboardEvent): void {
        if (this._isCollapseAction(event)) {
            this._popoverService.close();
            this.focus();
            return;
        }

        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            this._childNavigationListItems.first?.focus();
        }
    }

    /** @ignore */
    calculateExpanded(): void {
        this._cdr.detectChanges();
    }

    /** @ignore */
    focus(): void {
        if (this.linkComponent) {
            this.linkComponent.elementRef.nativeElement.focus();
        } else {
            this._tabbableService.getTabbableElement(this.elementRef.nativeElement, false, true)?.focus();
        }
    }

    /** @ignore */
    ngAfterViewInit(): void {
        this._popoverService.updateTriggerElement(this._navigationItem);
    }

    /** @ignore */
    ngOnChanges(): void {
        this.buildComponentCssClass();
        this._popoverService.refreshConfiguration(this);
    }

    /** @ignore */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    collapse(): void {
        this.expanded.set(false);
        this._popoverService.close();
    }

    /** @ignore */
    expand(): void {
        this.expanded.set(true);
    }

    /** @ignore */
    toggle(): void {
        if (this._hidden()) {
            return;
        }
        this.expanded.set(!this.expanded());
    }

    /** @ignore */
    setSnappedActiveState(isActive: boolean): void {
        this.childrenActive.set(isActive);
    }

    /** @ignore */
    hide(): void {
        this._hidden.set(true);
        this.buildComponentCssClass();
    }

    /** @ignore */
    show(): void {
        this._hidden.set(false);
        this.elementRef.nativeElement.style.display = 'flex';
        this.buildComponentCssClass();
    }

    /** @ignore */
    checkSelfHidden(): void {
        const shouldHide = this._childNavigationListItems
            ?.filter((item) => item.normalizedLevel() === this.normalizedLevel() + 1)
            .every((item) => item._hidden());
        this._hidden.set(shouldHide);
        this.isOpen = shouldHide;
        this.elementRef.nativeElement.style.display = shouldHide ? 'none' : 'flex';
        this.buildComponentCssClass();
    }

    /** @ignore */
    focusOnClonedLink(): void {
        if (this._clonedMainLink) {
            this._clonedMainLink.nativeElement.focus();
            return;
        }

        const hiddenItems = this.hiddenItems();

        if (hiddenItems.length > 0) {
            this._tabbableService.getTabbableElement(hiddenItems[0]?.elementRef.nativeElement)?.focus();
        }
    }

    /** @ignore */
    createPortal(): DomPortal {
        this.domPortal = this.domPortal || new DomPortal(this.elementRef.nativeElement);
        this._selfInPortal.set(true);
        return this.domPortal;
    }

    /** @ignore */
    destroyPortal(): void {
        if (this.domPortal?.isAttached) {
            this.domPortal.detach();
            this.domPortal = null;
        }
        this._selfInPortal.set(false);
    }

    /** @ignore */
    private _isCollapseAction(event: KeyboardEvent): boolean {
        const expandKey = this._rtl?.rtl.value ? RIGHT_ARROW : LEFT_ARROW;
        return KeyUtil.isKeyCode(event, expandKey);
    }

    /** @ignore */
    private _expandedStateKeyboardHandler(shouldExpand: boolean): void {
        if (shouldExpand && this.expanded()) {
            this.navigationComponent.setNextItemActive();
            return;
        }

        if (!shouldExpand && !this.expanded() && this.parentListItemComponent) {
            this.navigationComponent.setActiveItem(this.parentListItemComponent);
            return;
        }

        if (!shouldExpand && this.childNavigationListComponent()) {
            if (!this.expanded()) {
                this.navigationComponent.setPreviousItemActive();
            } else {
                this.expanded.set(false);
            }
        }

        this.expanded.set(shouldExpand);
    }

    /** @ignore */
    private _snappedStateKeyboardHandler(shouldExpand: boolean): void {
        if (shouldExpand && this._hidden()) {
            this.expanded.set(shouldExpand);
            this._childNavigationListItems.first?.focus();
            this.childFocused.set(true);
            return;
        }
        if (shouldExpand) {
            if (this.expanded()) {
                this._childNavigationListItems.first?.focus();
                return;
            }

            this.expanded.set(shouldExpand);
            this._popoverService.open();
            setTimeout(() => {
                this.focusOnClonedLink();
            });
        } else {
            this.expanded.set(shouldExpand);
            this._popoverService.close();

            if (!this.inPortal()) {
                this.focus();
            }

            if (this.inPortal() && this.normalizedLevel() === 2) {
                this._navigationComponent.focusMoreButton();
            } else {
                this.parentListItemComponent?.focus();
            }
        }
    }
}
