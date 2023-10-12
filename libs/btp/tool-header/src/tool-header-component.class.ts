import { computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SearchFieldComponent } from '@fundamental-ngx/btp/search-field';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { FdbToolHeaderMode } from './components/tool-header/tool-header.component';
import { FdbToolHeaderState } from './tool-header-state.type';

export abstract class ToolHeaderComponentClass {
    /** Mode signal */
    mode = signal<FdbToolHeaderMode>('desktop');

    /** @hidden */
    orientation = signal<'horizontal' | 'vertical'>('horizontal');

    /** @hidden */
    protected fdbToolHeaderState = computed<FdbToolHeaderState>(() => {
        if (this.mode() === 'mobile') {
            return {
                backButtonVisible: this.searchFieldExpanded(),
                menuButtonVisible: !this.searchFieldExpanded(),
                logoVisible: !this.searchFieldExpanded(),
                productNameVisible: false,
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
            return {
                backButtonVisible: this.searchFieldExpanded() && this.orientation() === 'vertical',
                menuButtonVisible: !this.searchFieldExpanded(),
                logoVisible: true,
                productNameVisible: this.orientation() === 'vertical' ? !this.searchFieldExpanded() : true,
                searchFieldVisible: this.searchFieldExpanded(),
                searchFieldToggleActionVisible: !!this.searchField() && !this.searchFieldExpanded(),
                providedActionsVisible: true,
                userAvatarVisible: true,
                productSwitchVisible: true,
                voiceInputVisible: false,
                separatorsBetweenActionsVisible: this.orientation() === 'horizontal'
            };
        }
        return {
            backButtonVisible: false,
            menuButtonVisible: true,
            logoVisible: true,
            productNameVisible: true,
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

    /** @hidden */
    protected searchFieldExpanded = signal<boolean>(false);

    /**
     * RTL signal
     * @hidden
     */
    protected _rtl = toSignal(inject(RtlService).rtl);
}
