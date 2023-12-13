import { computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SearchFieldComponent } from '@fundamental-ngx/btp/search-field';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { FdbToolHeaderState } from './tool-header-state.type';

export abstract class ToolHeaderComponentClass {
    /** Mode signal */
    mode = signal<FdbViewMode>('');

    /** @ignore */
    orientation = signal<'landscape' | 'portrait'>('landscape');

    /** @ignore */
    protected fdbToolHeaderState = computed<FdbToolHeaderState>(() => {
        if (this.mode() === 'phone') {
            return {
                backButtonVisible: this.searchFieldExpanded(),
                menuButtonVisible: !this.searchFieldExpanded(),
                logoVisible: !this.searchFieldExpanded(),
                productNameVisible: false,
                secondTitleVisible: false,
                searchFieldVisible: this.searchFieldExpanded(),
                searchFieldToggleActionVisible: !!this.searchField() && !this.searchFieldExpanded(),
                providedActionsVisible: !this.searchFieldExpanded(),
                userAvatarVisible: !this.searchFieldExpanded(),
                productSwitchVisible: !this.searchFieldExpanded(),
                voiceInputVisible: this.searchFieldExpanded(),
                separatorsBetweenActionsVisible: false
            };
        }
        if (this.mode() === 'tablet') {
            const isPortrait = this.orientation() === 'portrait';
            const isLandscape = !isPortrait;
            const searchFieldVisible = this.searchFieldExpanded() || isLandscape;
            const searchFieldToggleActionVisible = !searchFieldVisible && !!this.searchField();

            return {
                backButtonVisible: false,
                menuButtonVisible: true,
                logoVisible: true,
                productNameVisible: isPortrait ? !this.searchFieldExpanded() : true,
                secondTitleVisible: false,
                searchFieldVisible,
                searchFieldToggleActionVisible,
                providedActionsVisible: true,
                userAvatarVisible: true,
                productSwitchVisible: true,
                voiceInputVisible: false,
                separatorsBetweenActionsVisible: this.orientation() === 'landscape'
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
    protected searchField = signal<SearchFieldComponent | null>(null);

    /** @ignore */
    protected searchFieldExpanded = signal<boolean>(false);

    /**
     * RTL signal
     * @ignore
     */
    protected _rtl = toSignal(inject(RtlService).rtl);
}
