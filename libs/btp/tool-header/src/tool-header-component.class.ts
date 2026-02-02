import { computed, inject, Signal, signal } from '@angular/core';
import { SearchFieldComponent } from '@fundamental-ngx/btp/search-field';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { FdbToolHeaderState } from './tool-header-state.type';

export abstract class ToolHeaderComponentClass {
    /** @hidden */
    mode$: Signal<FdbViewMode>;

    /** @hidden */
    orientation$: Signal<'landscape' | 'portrait'>;

    /** @hidden */
    searchField$: Signal<SearchFieldComponent | null>;

    /** @hidden */
    searchFieldExpanded$: Signal<boolean>;

    /** Mode signal */
    protected _mode$ = signal<FdbViewMode>('');

    /** @hidden */
    protected _orientation$ = signal<'landscape' | 'portrait'>('landscape');

    /** @hidden */
    protected fdbToolHeaderState = computed<FdbToolHeaderState>(() => {
        if (this._mode$() === 'phone') {
            return {
                backButtonVisible: this._searchFieldExpanded$(),
                menuButtonVisible: !this._searchFieldExpanded$(),
                logoVisible: !this._searchFieldExpanded$(),
                productNameVisible: false,
                secondTitleVisible: false,
                searchFieldVisible: this._searchFieldExpanded$(),
                searchFieldToggleActionVisible: !!this._searchField$() && !this._searchFieldExpanded$(),
                providedActionsVisible: !this._searchFieldExpanded$(),
                userAvatarVisible: !this._searchFieldExpanded$(),
                productSwitchVisible: !this._searchFieldExpanded$(),
                voiceInputVisible: this._searchFieldExpanded$(),
                separatorsBetweenActionsVisible: false
            };
        }
        if (this._mode$() === 'tablet') {
            const isPortrait = this._orientation$() === 'portrait';
            const isLandscape = !isPortrait;
            const searchFieldVisible = this._searchFieldExpanded$() || isLandscape;
            const searchFieldToggleActionVisible = !searchFieldVisible && !!this._searchField$();

            return {
                backButtonVisible: false,
                menuButtonVisible: true,
                logoVisible: true,
                productNameVisible: isPortrait ? !this._searchFieldExpanded$() : true,
                secondTitleVisible: false,
                searchFieldVisible,
                searchFieldToggleActionVisible,
                providedActionsVisible: true,
                userAvatarVisible: true,
                productSwitchVisible: true,
                voiceInputVisible: false,
                separatorsBetweenActionsVisible: this._orientation$() === 'landscape'
            };
        }
        return {
            backButtonVisible: false,
            menuButtonVisible: true,
            logoVisible: true,
            productNameVisible: true,
            secondTitleVisible: true,
            searchFieldVisible: true,
            searchFieldToggleActionVisible: false,
            providedActionsVisible: true,
            userAvatarVisible: true,
            productSwitchVisible: true,
            voiceInputVisible: false,
            separatorsBetweenActionsVisible: true
        };
    });

    /** Search field signal */
    protected _searchField$ = signal<SearchFieldComponent | null>(null);

    /** @hidden */
    protected _searchFieldExpanded$ = signal<boolean>(false);

    /**
     * RTL signal
     * @hidden
     */
    protected rtl = computed<boolean>(() => this._rtlService?.rtl() ?? false);

    /** @hidden */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    constructor() {
        this.mode$ = this._mode$.asReadonly();
        this.orientation$ = this._orientation$.asReadonly();
        this.searchField$ = this._searchField$.asReadonly();
        this.searchFieldExpanded$ = this._searchFieldExpanded$.asReadonly();
    }
}
