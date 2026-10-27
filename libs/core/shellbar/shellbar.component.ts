import { InteractivityChecker } from '@angular/cdk/a11y';
import { END, HOME, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { CdkPortalOutlet, DomPortal, PortalModule } from '@angular/cdk/portal';
import { NgTemplateOutlet } from '@angular/common';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    DestroyRef,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    computed,
    contentChildren,
    inject,
    input
} from '@angular/core';
import { outputToObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ClickedDirective, KeyUtil, Nullable, ResizeObserverService, RtlService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent, FD_BUTTON_COMPONENT } from '@fundamental-ngx/core/button';
import { ComboboxInterface, FD_COMBOBOX_COMPONENT } from '@fundamental-ngx/core/combobox';
import { ContentDensityDirective, ContentDensityMode } from '@fundamental-ngx/core/content-density';
import { ProductSwitchComponent } from '@fundamental-ngx/core/product-switch';
import { SearchComponent } from '@fundamental-ngx/core/shared';
import { SideNavigationInterface } from '@fundamental-ngx/core/side-navigation';
import { FdTranslatePipe, resolveTranslationSignal } from '@fundamental-ngx/i18n';
import { shallowEqual } from 'fast-equals';
import { BehaviorSubject, Subscription, distinctUntilChanged } from 'rxjs';
import { Breakpoints, NormalizedBreakpoint, ShellbarGroupFlexOptions, ShellbarSizes } from './model/shellbar-sizes';
import { ShellbarActionsComponent } from './shellbar-actions/shellbar-actions.component';
import { ShellbarBrandingComponent } from './shellbar-branding/shellbar-branding.component';
import { ShellbarContextAreaComponent } from './shellbar-context-area/shellbar-context-area.component';
import { FD_SHELLBAR_COMPONENT, FD_SHELLBAR_SEARCH_COMPONENT } from './tokens';

/**
 * The shellbar offers consistent, responsive navigation across all products and applications.
 * Includes support for branding, product navigation, search, notifications, and user settings.
 * Shellbar is a composite component comprised of mandatory and optional elements.
 */
@Component({
    selector: 'fd-shellbar',
    templateUrl: './shellbar.component.html',
    styleUrls: ['./shellbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_SHELLBAR_COMPONENT,
            useExisting: ShellbarComponent
        }
    ],
    imports: [
        PortalModule,
        FdTranslatePipe,
        ButtonComponent,
        ClickedDirective,
        NgTemplateOutlet,
        ContentDensityDirective
    ]
})
export class ShellbarComponent implements AfterContentInit, AfterViewInit, OnDestroy {
    /** Size of Shellbar component 's' | 'm' | 'l' | 'xl' */
    @Input()
    set size(value: ShellbarSizes | undefined) {
        this._size = value;
        this._currentSize$.next(this._currentSize);
    }
    get size(): ShellbarSizes | undefined {
        return this._size;
    }

    /**
     * Responsive breakpoints.
     */
    @Input()
    set breakpoints(breakpoints: Breakpoints) {
        this._breakpoints = this._normalizeBreakpoints(breakpoints);
        this._setCurrentBreakpoint();
    }

    /**
     * Whether the Shellbar is used with Side Navigation.
     * When set to true, the responsive paddings are not applied.
     * Can also accept a template variable referring to a SideNavigationInterface (fd-side-nav or fdx-side-nav), and
     * will add the corresponding class.
     */
    @Input()
    sideNav: boolean | SideNavigationInterface = false;

    /**
     * Shellbar group flex configuration.
     */
    @Input()
    set groupFlex(value: Nullable<ShellbarGroupFlexOptions>) {
        if (shallowEqual(value, this._groupFlex)) {
            return;
        }

        this._groupFlex = value;
        this._cd.detectChanges();
    }

    get groupFlex(): Nullable<ShellbarGroupFlexOptions> {
        return this._groupFlex;
    }

    /** Whether to show the navigation button. */
    @Input()
    showNavigationButton = false;

    /**
     * Custom template for navigation button. When provided, this template will be rendered instead of the default button.
     * Use this when you need to render a complex component like a popover with a button inside.
     * The template should handle its own click events and accessibility attributes.
     */
    @Input()
    navigationButtonTemplate: TemplateRef<any> | null = null;

    /** Whether to show the back button. */
    @Input()
    showBackButton = false;

    /** Label for the navigation button. */
    @Input()
    navigationButtonLabel: string;

    /** Label for the back button. */
    @Input()
    backButtonLabel: string;

    /** Whether to show the search when the shellbar size is set to small. */
    @Input()
    showSearchFieldOnSizeSmall = false;

    /** Emitted event when navigation button is clicked. */
    @Output()
    navigationButtonClicked: EventEmitter<Event> = new EventEmitter<Event>();

    /** Emitted event when back button is clicked. */
    @Output()
    backButtonClicked: EventEmitter<Event> = new EventEmitter<Event>();

    /** @hidden */
    @ContentChild(FD_COMBOBOX_COMPONENT, { static: false })
    comboboxComponent: ComboboxInterface;

    /** @hidden */
    @ContentChildren(FD_BUTTON_COMPONENT, { read: ElementRef })
    buttons: QueryList<ElementRef>;

    /** @hidden */
    @ContentChildren(ProductSwitchComponent, { descendants: true })
    productSwitches: QueryList<ProductSwitchComponent>;

    /** @hidden */
    @ContentChild(ShellbarBrandingComponent)
    branding: ShellbarBrandingComponent;

    /** @hidden */
    @ContentChild(ShellbarActionsComponent)
    private _actions?: ShellbarActionsComponent;

    /** @hidden */
    @ViewChild('searchPortalOutlet', { static: false, read: CdkPortalOutlet })
    private readonly _searchPortalOutlet: CdkPortalOutlet;

    /** @hidden */
    @ViewChild('shellbar')
    private readonly _shellbar: ElementRef<HTMLElement>;

    /** @hidden */
    @ViewChild('productGroup')
    private readonly _productGroup: ElementRef<HTMLElement>;

    /** @hidden */
    _showMobileSearch = false;

    /** @hidden */
    _isTitleHidden = false;

    /** Whether the navigation button is expanded (for aria-expanded). */
    readonly navigationButtonExpanded = input<boolean | undefined>(undefined);

    /** ID of the element controlled by the navigation button (for aria-controls). Typically references the side navigation element. */
    readonly navigationButtonControls = input<string | undefined>(undefined);

    /** @hidden */
    protected readonly navigationIcon = computed<string>(() => (this.isRtl() ? 'slim-arrow-right' : 'nav-back'));

    /** @hidden */
    protected readonly _contextAreas = contentChildren(ShellbarContextAreaComponent);

    /** @hidden */
    protected readonly _contextArea = computed(() => this._contextAreas()[0]);

    /** @hidden */
    protected readonly _shellbarLabel = resolveTranslationSignal('coreShellbar.shellbarLabel');

    /**
     * @hidden
     * Backward compatibility getter for single context area.
     */
    get contextArea(): ShellbarContextAreaComponent | undefined {
        return this._contextArea();
    }

    /** @hidden */
    private readonly isRtl = computed<boolean>(() => this._rtlService?.rtl() ?? false);

    /**
     * Search component placed inside the shellbar
     */
    @ContentChild(FD_SHELLBAR_SEARCH_COMPONENT, { descendants: true, static: false })
    set searchComponent(component: Nullable<SearchComponent>) {
        const shouldAttach = !this._searchComponent && !!component;
        this._searchComponent = component;
        if (!component) {
            this._searchPortal?.detach();
            return;
        }

        if (this._searchPortal?.isAttached) {
            this._searchPortal.detach();
        }

        this._searchPortal = new DomPortal(component.elementRef.nativeElement);
        component.categoryMode.set('select');
        component.disableRefresh.set(true);
        component.forceSearchButton.set(true);
        component.appearance?.set({
            searchClass: 'fd-shellbar__search-field is-cozy',
            searchFieldClass: 'fd-shellbar__search-field-input is-cozy',
            searchCategoryClass: 'fd-shellbar__search-field-category',
            searchSubmitClass: 'fd-shellbar__search-submit',
            buttonClass: 'fd-shellbar__button',
            addonClass: 'fd-shellbar__search-field-addon',
            categoryButtonClass: 'fd-shellbar__search-category',
            categoryDropdownButtonClass: 'fd-shellbar__search-dropdown',
            removeGroupButtonClass: true,
            helperClass: 'fd-shellbar__search-field-helper'
        });

        this._searchSubmitSubscription?.unsubscribe();

        this._searchSubmitSubscription = outputToObservable(component.searchSubmit)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((state) => {
                if (!state.text) {
                    this._showMobileSearch = false;
                    this._actions?._setSearchVisibility(false);
                    this._cd.detectChanges();
                }
            });

        if (shouldAttach) {
            this._placeSearch();
        }

        this._cd.detectChanges();
    }

    get searchComponent(): Nullable<SearchComponent> {
        return this._searchComponent;
    }

    /** @hidden */
    get _hideTitleComponents(): boolean {
        return this._currentSize !== 'xl' && this._currentSize !== 'l' && this._showMobileSearch;
    }

    /** @hidden */
    get _hideAllComponents(): boolean {
        return this._currentSize === 's' && this._showMobileSearch;
    }

    /** @hidden */
    get _currentSize(): ShellbarSizes {
        return this._size || this._breakpointSize;
    }

    /** @hidden */
    private _groupFlex: Nullable<ShellbarGroupFlexOptions>;

    /** @hidden */
    private _searchPortal: DomPortal;

    /** @hidden */
    private _searchComponent: Nullable<SearchComponent>;

    /** @hidden */
    private readonly _currentSize$ = new BehaviorSubject<ShellbarSizes>(this._currentSize);

    /** @hidden */
    private _size: ShellbarSizes | undefined;

    /** @hidden */
    private _breakpointSize: ShellbarSizes = 'm';

    /** @hidden */
    private readonly _cd = inject(ChangeDetectorRef);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _breakpoints: NormalizedBreakpoint[] = this._normalizeBreakpoints({
        s: 0,
        m: 320,
        l: 600,
        xl: 1240
    });

    /** @hidden */
    private _searchSubmitSubscription: Nullable<Subscription>;

    /** @hidden */
    private _tabbableElementsCache: HTMLElement[] | null = null;

    /** @hidden */
    private _resizeObserverService = inject(ResizeObserverService);

    /** @hidden */
    private readonly _rtlService = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    private readonly _interactivityChecker = inject(InteractivityChecker);

    /** @hidden */
    ngAfterContentInit(): void {
        this.applyShellbarModeToCombobox();
        this.applyShellbarModeToButtons();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        // Observe shellbar size changes (handles window resize, container changes)
        this._resizeObserverService
            .observe(this._shellbar.nativeElement)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._setCurrentBreakpoint());

        // Observe product group content changes (handles branding/title content growth)
        if (this._productGroup) {
            this._resizeObserverService
                .observe(this._productGroup.nativeElement)
                .pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe(() => this._setCurrentBreakpoint());
        }

        // Observe context area content changes (handles context area item growth)
        // Note: context area host has display:contents, so observe its child groups instead
        const contextArea = this._contextArea();
        if (contextArea?.contextAreaGroups) {
            contextArea.contextAreaGroups.forEach((groupRef) => {
                this._resizeObserverService
                    .observe(groupRef.nativeElement)
                    .pipe(takeUntilDestroyed(this._destroyRef))
                    .subscribe(() => {
                        this._setCurrentBreakpoint();
                    });
            });
        }

        requestAnimationFrame(() => this._setCurrentBreakpoint());

        this._setSearchComponentListeners();

        this.productSwitches.changes.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._setProductSwitchDensities();
        });

        this._setProductSwitchDensities();

        // Set up keyboard navigation listener
        this._setupKeyboardNavigation();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._searchSubmitSubscription?.unsubscribe();
        this._searchPortalOutlet?.dispose();
    }

    /** @hidden */
    applyShellbarModeToCombobox(): void {
        if (this.comboboxComponent) {
            this.comboboxComponent.inShellbar = true;
        }
    }

    /** @hidden */
    applyShellbarModeToButtons(): void {
        this.buttons?.forEach((button) => {
            button.nativeElement.classList.add('fd-shellbar__button');
        });
    }

    /** @hidden */
    _closeMobileSearch(): void {
        this._showMobileSearch = false;
        this._actions?._setSearchVisibility(false);
        this._cd.detectChanges();
    }

    /** @hidden */
    _getSideNavClass(): string {
        let retVal = ' ';

        if (this.sideNav && (this.sideNav as SideNavigationInterface).additionalShellbarCssClass) {
            retVal += (this.sideNav as SideNavigationInterface).additionalShellbarCssClass;
        }

        return retVal;
    }

    /** @hidden */
    _getShellbarEnd(): number {
        const shellbarEl = this._shellbar.nativeElement;
        const end = this.isRtl() ? shellbarEl.getBoundingClientRect().left : shellbarEl.getBoundingClientRect().right;
        let shellbarPadding = parseInt(window.getComputedStyle(shellbarEl).paddingInline, 10);
        if (this.isRtl()) {
            shellbarPadding = shellbarPadding * -1;
        }
        return end - shellbarPadding;
    }

    /** @hidden */
    _getActionsEnd(): number {
        const end = this.isRtl()
            ? this._actions?._elRef.nativeElement.getBoundingClientRect().left
            : this._actions?._elRef.nativeElement.getBoundingClientRect().right;
        return end;
    }

    /** @hidden */
    _actionsExceedShellbarWidth(): boolean {
        return this.isRtl()
            ? this._getActionsEnd() < this._getShellbarEnd()
            : this._getActionsEnd() > this._getShellbarEnd();
    }

    /** @hidden */
    _searchToggledFromActions(): void {
        this._setCurrentBreakpoint();
    }

    /** @hidden */
    _navigationClicked(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.navigationButtonClicked.emit(event);
    }

    /** @hidden */
    _backClicked(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.backButtonClicked.emit(event);
    }

    /** @hidden */
    _notifyTitleHidden(hidden: boolean): void {
        this._isTitleHidden = hidden;
        this._actions?._setTitleHidden(
            hidden,
            this.branding?.getTitleText() || '',
            this.branding?.getLogoElement() || null,
            this.branding?.ariaLabel() || ''
        );
    }

    /** @hidden */
    _handleKeydown(event: KeyboardEvent): void {
        // Don't interfere with text input behavior
        const target = event.target as HTMLElement;
        const isTextInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
        if (isTextInput) {
            return;
        }

        // Check if the key is one we handle
        if (!KeyUtil.isKeyCode(event, [LEFT_ARROW, RIGHT_ARROW, HOME, END])) {
            return;
        }

        const tabbableElements = this._getTabbableElements();
        const currentIndex = tabbableElements.indexOf(target);

        // Only handle Home/End if focus is already in the shellbar
        if (currentIndex === -1) {
            return;
        }

        event.preventDefault();

        let nextIndex: number;

        // Handle Home and End keys
        if (KeyUtil.isKeyCode(event, HOME)) {
            // Move to first element
            nextIndex = 0;
        } else if (KeyUtil.isKeyCode(event, END)) {
            // Move to last element
            nextIndex = tabbableElements.length - 1;
        } else {
            // Handle arrow keys
            // Handle RTL: swap arrow key behavior
            const isLeftKey = KeyUtil.isKeyCode(event, LEFT_ARROW);
            const shouldMovePrevious = this.isRtl() ? !isLeftKey : isLeftKey;

            if (shouldMovePrevious) {
                // Move to previous element (like Shift+Tab)
                nextIndex = currentIndex - 1;
                if (nextIndex < 0) {
                    nextIndex = tabbableElements.length - 1;
                }
            } else {
                // Move to next element (like Tab)
                nextIndex = currentIndex + 1;
                if (nextIndex >= tabbableElements.length) {
                    nextIndex = 0;
                }
            }
        }

        const nextElement = tabbableElements[nextIndex];
        if (nextElement) {
            nextElement.focus();
        }
    }

    /** @hidden */
    private _setupKeyboardNavigation(): void {
        // Listen for keydown events on the shellbar container
        this._shellbar.nativeElement.addEventListener(
            'keydown',
            (event: KeyboardEvent) => {
                this._handleKeydown(event);
            },
            true // Use capture phase to catch events before they reach the target
        );

        // Listen for global keyboard shortcuts
        const handleGlobalShortcut = (event: KeyboardEvent): void => {
            // Shift+Ctrl/Cmd+F: Focus search
            if (event.shiftKey && (event.ctrlKey || event.metaKey) && (event.key === 'f' || event.key === 'F')) {
                if (this.searchComponent) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.searchComponent.focus();
                }
            }
        };

        document.addEventListener('keydown', handleGlobalShortcut);

        // Clean up the global listener on destroy
        this._destroyRef.onDestroy(() => {
            document.removeEventListener('keydown', handleGlobalShortcut);
        });
    }

    /** @hidden */
    private _getTabbableElements(): HTMLElement[] {
        // Return cached result if available
        if (this._tabbableElementsCache) {
            return this._tabbableElementsCache;
        }

        const shellbarEl = this._shellbar.nativeElement;
        // Query all descendant elements
        const allElements = Array.from(shellbarEl.querySelectorAll<HTMLElement>('*'));

        // Use CDK InteractivityChecker for robust tabbability detection
        const tabbableElements = allElements.filter(
            (el) => this._interactivityChecker.isTabbable(el) && this._interactivityChecker.isVisible(el)
        );

        // Filter out elements that are descendants of other tabbable elements
        // This prevents navigating into nested focusable areas
        const filteredElements = tabbableElements.filter(
            (el) => !tabbableElements.some((otherEl) => otherEl !== el && otherEl.contains(el))
        );

        // Cache the result
        this._tabbableElementsCache = filteredElements;

        // Invalidate cache after a short delay to allow for DOM updates
        setTimeout(() => {
            this._tabbableElementsCache = null;
        }, 100);

        return filteredElements;
    }

    /** @hidden */
    private _setSearchComponentListeners(): void {
        this._actions?.searchOpen.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((showSearch) => {
            this._showMobileSearch = showSearch;
            this._cd.detectChanges();
            if (this._currentSize !== 's') {
                return;
            }

            if (showSearch) {
                this._attachSearch(true);
            } else {
                this._detachSearch();
            }
        });
        this._currentSize$.pipe(distinctUntilChanged(), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            if (!this._searchPortal) {
                return;
            }

            this._placeSearch();
        });
    }

    private _placeSearch(): void {
        const size = this._currentSize$.value;

        // Search stays in shellbar at XL only if NO context areas exist
        if ((size === 'xl' && this._contextAreas().length === 0) || (size === 's' && this._showMobileSearch)) {
            this._attachSearch();
        } else {
            this._detachSearch();
        }
    }

    /** @hidden */
    private _setCurrentBreakpoint(): void {
        if (this._shellbar) {
            this._handleOverflow();

            const width = this._shellbar.nativeElement.getBoundingClientRect().width;
            const breakpoint = this._breakpoints.find((item) => width >= item.min && width < item.max + 1);

            if (breakpoint && breakpoint.size !== this._currentSize) {
                this._breakpointSize = breakpoint.size;
                this._currentSize$.next(this._currentSize);
            }
            this._cd.detectChanges();
        }
    }

    /** @hidden */
    private _handleOverflow(): void {
        if (this._shellbar) {
            this._resetOverflow();

            if (this._actions) {
                if (this._actionsExceedShellbarWidth()) {
                    this._actions._handleOverflow(true);
                }
                // Hide context area items first (they have lower priority than title)
                const contextArea = this._contextArea();
                if (contextArea) {
                    contextArea.hideElementsIfNeeded();
                }
                // Then hide branding title if still overflowing
                if (this.branding) {
                    this.branding.hideTitleIfNeeded();
                }
                if (this._showMobileSearch && this._actionsExceedShellbarWidth()) {
                    this._closeMobileSearch();
                }
            }
        }
    }

    /** @hidden */
    private _resetOverflow(): void {
        if (this.branding) {
            this.branding.showTitle();
        }
        const contextArea = this._contextArea();
        if (contextArea) {
            contextArea.showElements();
        }
        if (this._actions) {
            this._actions._handleOverflow(this._currentSize === 's' && this.showSearchFieldOnSizeSmall);
        }
    }

    /** @hidden */
    private _normalizeBreakpoints(breakpoints: Breakpoints): NormalizedBreakpoint[] {
        const keys = Object.keys(breakpoints) as ShellbarSizes[];
        const normalizedBreakpoints: NormalizedBreakpoint[] = [];

        keys.forEach((key, index) => {
            const breakpoint: NormalizedBreakpoint = {
                size: key,
                min: breakpoints[key],
                max: keys[index + 1] ? breakpoints[keys[index + 1]] : Infinity
            };

            normalizedBreakpoints.push(breakpoint);
        });

        return normalizedBreakpoints;
    }

    /** @hidden */
    private _attachSearch(shouldFocus = false): void {
        if (this._searchPortalOutlet?.hasAttached()) {
            return;
        }

        this._actions?._detachSearch();
        this._searchPortalOutlet?.attach(this._searchPortal);

        if (shouldFocus) {
            this._searchComponent?.focus();
        }
    }

    /** @hidden */
    private _detachSearch(): void {
        if (!this._searchPortalOutlet?.hasAttached()) {
            this._actions?._attachSearch(this._searchPortal, this._searchComponent, this._currentSize);
            return;
        }

        this._searchPortalOutlet.detach();

        this._actions?._attachSearch(this._searchPortal, this._searchComponent, this._currentSize);
    }

    /** @hidden */
    private _setProductSwitchDensities(): void {
        this.productSwitches.forEach((productSwitch) => {
            productSwitch.contentDensity.set(ContentDensityMode.COZY);
        });
    }
}
