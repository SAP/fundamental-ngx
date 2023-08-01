import { CdkPortalOutlet, DomPortal } from '@angular/cdk/portal';
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
    inject,
    Input,
    OnDestroy,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Nullable, resizeObservable } from '@fundamental-ngx/cdk/utils';
import { FD_BUTTON_COMPONENT } from '@fundamental-ngx/core/button';
import { ComboboxInterface, FD_COMBOBOX_COMPONENT } from '@fundamental-ngx/core/combobox';
import { ContentDensityMode, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { SearchComponent } from '@fundamental-ngx/core/shared';
import equal from 'fast-deep-equal';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { ShellbarActionsComponent } from './shellbar-actions/shellbar-actions.component';
import { FD_SHELLBAR_COMPONENT, FD_SHELLBAR_SEARCH_COMPONENT } from './tokens';
import { SideNavigationInterface } from '@fundamental-ngx/core/side-navigation';
import { Breakpoints, NormalizedBreakpoint, ShellbarGroupFlexOptions, ShellbarSizes } from './model/shellbar-sizes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
        contentDensityObserverProviders({
            supportedContentDensity: [ContentDensityMode.COZY],
            restrictChildContentDensity: true
        }),
        {
            provide: FD_SHELLBAR_COMPONENT,
            useExisting: ShellbarComponent
        }
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
        if (equal(value, this._groupFlex)) {
            return;
        }

        this._groupFlex = value;
        this._cd.detectChanges();
    }

    get groupFlex(): Nullable<ShellbarGroupFlexOptions> {
        return this._groupFlex;
    }

    /** @hidden */
    private _groupFlex: Nullable<ShellbarGroupFlexOptions>;

    /** @hidden */
    @ContentChild(FD_COMBOBOX_COMPONENT, { static: false })
    comboboxComponent: ComboboxInterface;

    /** @hidden */
    @ContentChildren(FD_BUTTON_COMPONENT, { read: ElementRef })
    buttons: QueryList<ElementRef>;

    /** @hidden */
    @ContentChild(ShellbarActionsComponent)
    private _actions: ShellbarActionsComponent;

    /** @hidden */
    private _searchPortal: DomPortal;

    /** @hidden */
    @ViewChild('searchPortalOutlet', { static: false, read: CdkPortalOutlet })
    private readonly _searchPortalOutlet: CdkPortalOutlet;

    /**
     * Search component placed inside the shellbar
     */
    @ContentChild(FD_SHELLBAR_SEARCH_COMPONENT, { descendants: true, static: false })
    set searchComponent(component: Nullable<SearchComponent>) {
        this._searchComponent = component;
        if (!component) {
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
            removeGroupButtonClass: true
        };

        this._searchSubmitSubscription?.unsubscribe();

        this._searchSubmitSubscription = component.searchSubmit
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((state) => {
                if (!state.text) {
                    this._showMobileSearch = false;
                    this._actions._setSearchVisibility(false);
                    this._cd.detectChanges();
                }
            });

        this._cd.detectChanges();
    }

    get searchComponent(): Nullable<SearchComponent> {
        return this._searchComponent;
    }

    /** @hidden */
    private _searchComponent: Nullable<SearchComponent>;

    /** @hidden */
    @ViewChild('shellbar')
    private readonly _shellbar: ElementRef<HTMLElement>;

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
    private readonly _currentSize$ = new BehaviorSubject<ShellbarSizes>(this._currentSize);

    /** @hidden */
    _showMobileSearch = false;

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
    ngAfterContentInit(): void {
        this.applyShellbarModeToCombobox();
        this.applyShellbarModeToButtons();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        resizeObservable(this._shellbar.nativeElement)
            .pipe(debounceTime(10), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._setCurrentBreakpoint());

        this._setSearchComponentListeners();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._searchSubmitSubscription?.unsubscribe();
        this._searchPortalOutlet?.dispose();
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
        this._currentSize$.pipe(distinctUntilChanged(), takeUntilDestroyed(this._destroyRef)).subscribe((size) => {
            if (!this._searchPortal) {
                return;
            }

            if (size === 'xl' || (size === 's' && this._showMobileSearch)) {
                this._attachSearch();
            } else {
                this._detachSearch();
            }
        });
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
        this._actions._setSearchVisibility(false);
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
    private _setCurrentBreakpoint(): void {
        const { width } = this._shellbar.nativeElement.getBoundingClientRect();

        const breakpoint = this._breakpoints.find((item) => width >= item.min && width < item.max + 1);

        if (!breakpoint || breakpoint.size === this._currentSize) {
            return;
        }

        this._breakpointSize = breakpoint.size;
        this._currentSize$.next(this._currentSize);
        this._cd.detectChanges();
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

        this._actions._detachSearch();
        this._searchPortalOutlet?.attach(this._searchPortal);

        if (shouldFocus) {
            this._searchComponent?.focus();
        }
    }

    /** @hidden */
    private _detachSearch(): void {
        if (!this._searchPortalOutlet?.hasAttached()) {
            this._actions._attachSearch(this._searchPortal, this._searchComponent, this._currentSize);
            return;
        }

        this._searchPortalOutlet.detach();

        this._actions._attachSearch(this._searchPortal, this._searchComponent, this._currentSize);
    }
}
