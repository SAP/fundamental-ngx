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
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ClickedDirective, Nullable, ResizeObserverService, RtlService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent, FD_BUTTON_COMPONENT } from '@fundamental-ngx/core/button';
import { ComboboxInterface, FD_COMBOBOX_COMPONENT } from '@fundamental-ngx/core/combobox';
import { ContentDensityMode, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { SearchComponent } from '@fundamental-ngx/core/shared';
import { SideNavigationInterface } from '@fundamental-ngx/core/side-navigation';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import equal from 'fast-deep-equal';
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
    styleUrl: './shellbar.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        contentDensityObserverProviders({
            supportedContentDensity: [ContentDensityMode.COZY],
            restrictChildContentDensity: true
        }),
        {
            provide: FD_SHELLBAR_COMPONENT,
            useExisting: ShellbarComponent
        }
    ],
    imports: [PortalModule, FdTranslatePipe, ButtonComponent, ClickedDirective, NgTemplateOutlet]
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
        if (equal(value, this._groupFlex)) {
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
    @ContentChild(ShellbarContextAreaComponent)
    contextArea: ShellbarContextAreaComponent;

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
    _showMobileSearch = false;

    /** @hidden */
    readonly _rtl$ = computed<boolean>(() => !!this._rtlService?.rtlSignal());

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
        component.categoryMode = 'select';
        component.disableRefresh = true;
        component.forceSearchButton = true;
        component.appearance = {
            searchClass: 'fd-shellbar__search-field',
            searchFieldClass: 'fd-shellbar__search-field-input',
            searchCategoryClass: 'fd-shellbar__search-field-category',
            searchSubmitClass: 'fd-shellbar__search-submit',
            buttonClass: 'fd-shellbar__button',
            addonClass: 'fd-shellbar__search-field-addon',
            categoryButtonClass: 'fd-shellbar__search-category',
            categoryDropdownButtonClass: 'fd-shellbar__search-dropdown',
            removeGroupButtonClass: true,
            helperClass: 'fd-shellbar__search-field-helper'
        };

        this._searchSubmitSubscription?.unsubscribe();

        this._searchSubmitSubscription = component.searchSubmit
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
    private _resizeObserverService = inject(ResizeObserverService);

    /** @hidden */
    private readonly _rtlService = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    ngAfterContentInit(): void {
        this.applyShellbarModeToCombobox();
        this.applyShellbarModeToButtons();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._resizeObserverService
            .observe(this._shellbar.nativeElement)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._setCurrentBreakpoint());
        requestAnimationFrame(() => this._setCurrentBreakpoint());

        this._setSearchComponentListeners();
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
        const end = this._rtl$() ? shellbarEl.getBoundingClientRect().left : shellbarEl.getBoundingClientRect().right;
        let shellbarPadding = parseInt(window.getComputedStyle(shellbarEl).paddingInline, 10);
        if (this._rtl$()) {
            shellbarPadding = shellbarPadding * -1;
        }
        return end - shellbarPadding;
    }

    /** @hidden */
    _getActionsEnd(): number {
        const end = this._rtl$()
            ? this._actions?._elRef.nativeElement.getBoundingClientRect().left
            : this._actions?._elRef.nativeElement.getBoundingClientRect().right;
        return end;
    }

    /** @hidden */
    _actionsExceedShellbarWidth(): boolean {
        return this._rtl$()
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

        if ((size === 'xl' && !this.contextArea) || (size === 's' && this._showMobileSearch)) {
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
                if (this.branding) {
                    this.branding.hideTitleIfNeeded();
                }
                if (this.contextArea) {
                    this.contextArea.hideElementsIfNeeded();
                }
                if (this._showMobileSearch && this._actionsExceedShellbarWidth()) {
                    this._closeMobileSearch();
                }
            }
        }
    }

    /** @hidden */
    private _resetOverflow(): void {
        if (this.contextArea) {
            this.contextArea.showElements();
        }
        if (this.branding) {
            this.branding.showTitle();
        }
        if (this._actions) {
            this._actions._handleOverflow(this._currentSize === 's');
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
}
