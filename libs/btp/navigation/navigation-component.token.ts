import { computed, Signal, TemplateRef } from '@angular/core';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FdbNavigationListItemComponent } from './navigation-list-item-component.token';
import { FdbNavigationState, FdbNavigationType } from './navigation.types';

export abstract class FdbNavigationComponent {
    abstract state: Signal<FdbNavigationState>;
    abstract type: Signal<FdbNavigationType>;
    abstract mode: Signal<FdbViewMode>;
    abstract homeSeparator: Signal<boolean>;
    abstract homeLinkTemplate: Signal<TemplateRef<void> | null>;
    abstract setNextItemActive(): void;
    abstract setActiveItem(item: FdbNavigationListItemComponent): void;
    abstract setPreviousItemActive(): void;
    abstract keyDownHandler(event: KeyboardEvent): void;
    abstract focusMoreButton(): void;
    abstract getMoreButton(): Nullable<FdbNavigationListItemComponent>;

    /** @ignore */
    isSnapped = computed(() => this.state() === 'snapped' && !this.isPhone());
    /** @ignore */
    isPopup = computed(() => this.state() === 'popup' || this.isPhone());
    /** @ignore */
    isExpanded = computed(() => this.state() === 'expanded' && !this.isPhone());

    /** @ignore */
    isHorizontal = computed(() => this.type() === 'horizontal');
    /** @ignore */
    isVertical = computed(() => this.type() === 'vertical');

    /** @ignore */
    isDesktop = computed(() => this.mode() === '');
    /** @ignore */
    isTablet = computed(() => this.mode() === 'tablet');
    /** @ignore */
    isPhone = computed(() => this.mode() === 'phone');
}
