import { computed, Signal, TemplateRef } from '@angular/core';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FdbNavigationListItemComponent } from './navigation-list-item-component.token';
import { FdbNavigationState, FdbNavigationType } from './navigation.types';

export abstract class FdbNavigationComponent {
    abstract state: Signal<FdbNavigationState>;
    abstract type: Signal<FdbNavigationType>;
    abstract mode: Signal<FdbViewMode>;
    abstract homeLinkTemplate: Signal<TemplateRef<void> | null>;
    abstract setNextItemActive(): void;
    abstract setActiveItem(item: FdbNavigationListItemComponent): void;
    abstract setPreviousItemActive(): void;
    abstract keyDownHandler(event: KeyboardEvent): void;
    abstract focusMoreButton(): void;
    abstract getMoreButton(): Nullable<FdbNavigationListItemComponent>;

    /** @hidden */
    isSnapped = computed(() => this.state() === 'snapped' && !this.isPhone());
    /** @hidden */
    isPopup = computed(() => this.state() === 'popup' || this.isPhone());
    /** @hidden */
    isExpanded = computed(() => this.state() === 'expanded' && !this.isPhone());

    /** @hidden */
    isHorizontal = computed(() => this.type() === 'horizontal');
    /** @hidden */
    isVertical = computed(() => this.type() === 'vertical');

    /** @hidden */
    isDesktop = computed(() => this.mode() === '');
    /** @hidden */
    isTablet = computed(() => this.mode() === 'tablet');
    /** @hidden */
    isPhone = computed(() => this.mode() === 'phone');
}
