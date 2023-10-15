/* eslint-disable @angular-eslint/no-input-rename */
import { FocusableOption } from '@angular/cdk/a11y';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { DomPortal } from '@angular/cdk/portal';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
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
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    computed,
    effect,
    inject,
    signal
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
        NgIf,
        NgTemplateOutlet,
        PopoverComponent,
        PopoverControlComponent,
        RouterLink,
        ButtonComponent,
        IconComponent
    ],
    standalone: true
})
export class NavigationListItemComponent
    extends FdbNavigationListItemComponent
    implements OnInit, OnChanges, CssClassBuilder, HasElementRef, AfterViewInit, FocusableOption
{
    /** @hidden */
    @Input()
    class: Nullable<string>;

    /** @hidden */
    @Input()
    set group(group: boolean) {
        this.isGroup.set(group);
    }

    /** @hidden */
    @Input('expanded')
    set _expanded(expanded: boolean) {
        this.expanded.set(expanded);
    }

    /** @hidden */
    @Input()
    linkTemplate: TemplateRef<void>;

    /** @hidden */
    @Input()
    alwaysFocusable = false;

    /** @hidden */
    @ContentChild(FdbNavigationListComponent)
    set _navigationListComponent(navigationListComponent: FdbNavigationListComponent) {
        this.childNavigationListComponent.set(navigationListComponent);
    }

    /** @hidden */
    @ContentChild(RouterLinkActive)
    set _routerLinkActive(routerLinkActive: RouterLinkActive) {
        this.routerLinkActive.set(routerLinkActive);
    }

    /** @hidden */
    @ContentChild(RouterLink)
    set _routerLink(routerLink: RouterLink) {
        this.routerLink.set(routerLink);
    }

    /** @hidden */
    @ViewChild('childrenTemplate', { read: TemplateRef })
    set _childrenTemplate(templateRef: TemplateRef<void>) {
        this.childrenTemplate.set(templateRef);
    }

    /** @hidden */
    @ViewChild('navigationItem')
    _navigationItem: ElementRef;

    /** @hidden */
    @ContentChild(NavigationLinkComponent)
    linkComponent: Nullable<NavigationLinkComponent>;

    /** @hidden */
    @ContentChildren(FdbNavigationListItemComponent, { descendants: true })
    private readonly _childNavigationListItems: QueryList<FdbNavigationListItemComponent>;

    /** @hidden */
    @ViewChild('clonedMainLink', { static: false, read: ElementRef })
    private readonly _clonedMainLink: Nullable<ElementRef>;

    /** @hidden */
    injector = inject(Injector);

    /** @hidden */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden */
    parentListItemComponent = inject(FdbNavigationListItemComponent, { optional: true, skipSelf: true });

    /** @hidden */
    override noArrow = false;

    /** @hidden */
    override additionalBodyClass = 'fd-navigation__list-container';

    /** @hidden */
    override additionalBodyComponentClasses = 'fd-navigation fd-navigation--snapped';

    /** @hidden */
    routerLink = signal<RouterLink | null>(null);

    /** @hidden */
    routerLinkActive = signal<RouterLinkActive | null>(null);
    /** @hidden */
    childNavigationListComponent = signal<FdbNavigationListComponent | null>(null);
    /** @hidden */
    expanded = signal(false);

    /** @hidden */
    fullPathExpanded = computed(
        () => (this.parentListItemComponent ? this.parentListItemComponent.expanded() : true) && this.expanded()
    );

    /** @hidden */
    isGroup = signal(false);

    /** @hidden */
    childrenTemplate = signal<TemplateRef<void> | null>(null);

    /** @hidden */
    childrenActive = signal(false);

    /** @hidden */
    inPortal = computed(() => this.parentInPortal() || this._selfInPortal());

    /** @hidden */
    parentInPortal = computed(() => this.parentListItemComponent?.inPortal() || false);

    /** @hidden */
    level = computed(() => (this.parentListItemComponent?.level() ? this.parentListItemComponent.level() + 1 : 1));

    /** @hidden */
    _isInPopover = computed(() => this.navigationComponent.isSnapped() && (this.level() > 2 || this._hidden()));

    /** @hidden */
    // eslint-disable-next-line max-len
    expandedAttr = computed(
        () =>
            (this.expanded() ||
                (!this.parentListItemComponent &&
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

    /** @hidden */
    domPortal: Nullable<DomPortal>;

    /** @hidden */
    private _selfInPortal = signal(false);

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    private readonly _tabbableService = inject(TabbableElementService);

    /** @hidden */
    private readonly _navigationComponent = inject(FdbNavigationComponent);

    /** @hidden */
    constructor() {
        super();
        effect(() => {
            this._popoverService.updateContent(null, this.childrenTemplate());
        });
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.class || '', 'fd-navigation__list-item'];
    }

    /** @hidden */
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
                    this.level() > 2 &&
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

    /** @hidden */
    clonedMainLinkKeydown(event: KeyboardEvent): void {
        if (this._isCollapseAction(event)) {
            this._popoverService.close();
            return;
        }

        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            this._childNavigationListItems.first?.focus();
        }
    }

    /** @hidden */
    calculateExpanded(): void {
        this._cdr.detectChanges();
    }

    /** @hidden */
    focus(): void {
        if (this.linkComponent) {
            this.linkComponent.elementRef.nativeElement.focus();
        } else {
            this._tabbableService.getTabbableElement(this.elementRef.nativeElement, false, true)?.focus();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._popoverService.updateTriggerElement(this._navigationItem);
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
        this._popoverService.refreshConfiguration(this);
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    collapse(): void {
        this.expanded.set(false);
        this._popoverService.close();
    }

    /** @hidden */
    expand(): void {
        this.expanded.set(true);
    }

    /** @hidden */
    toggle(): void {
        if (this._hidden()) {
            return;
        }
        this.expanded.set(!this.expanded());
    }

    /** @hidden */
    setSnappedActiveState(isActive: boolean): void {
        this.childrenActive.set(isActive);
    }

    /** @hidden */
    hide(): void {
        this._hidden.set(true);
        this.buildComponentCssClass();
    }

    /** @hidden */
    show(): void {
        this._hidden.set(false);
        this.elementRef.nativeElement.style.display = 'flex';
        this.buildComponentCssClass();
    }

    /** @hidden */
    checkSelfHidden(): void {
        const shouldHide = this._childNavigationListItems
            ?.filter((item) => item.level() === this.level() + 1)
            .every((item) => item._hidden());
        this._hidden.set(shouldHide);
        this.isOpen = shouldHide;
        this.elementRef.nativeElement.style.display = shouldHide ? 'none' : 'flex';
        this.buildComponentCssClass();
    }

    /** @hidden */
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

    /** @hidden */
    createPortal(): DomPortal {
        this.domPortal = this.domPortal || new DomPortal(this.elementRef.nativeElement);
        this._selfInPortal.set(true);
        return this.domPortal;
    }

    /** @hidden */
    destroyPortal(): void {
        if (this.domPortal?.isAttached) {
            this.domPortal.detach();
            this.domPortal = null;
        }
        this._selfInPortal.set(false);
    }

    /** @hidden */
    private _isCollapseAction(event: KeyboardEvent): boolean {
        const expandKey = this._rtl?.rtl.value ? RIGHT_ARROW : LEFT_ARROW;
        return KeyUtil.isKeyCode(event, expandKey);
    }

    /** @hidden */
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

    /** @hidden */
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

            if (this.inPortal() && this.level() === 2) {
                this._navigationComponent.focusMoreButton();
            } else {
                this.parentListItemComponent?.focus();
            }
        }
    }
}
