import { computed, Signal, TemplateRef } from '@angular/core';

export abstract class FdbNavigationComponent {
    abstract state: Signal<'expanded' | 'snapped' | 'popup'>;
    abstract type: Signal<'horizontal' | 'vertical'>;
    abstract mode: Signal<'desktop' | 'tablet' | 'phone'>;
    abstract homeLinkTemplate: Signal<TemplateRef<void> | null>;

    /** @hidden */
    isSnapped = computed(() => this.state() === 'snapped');
    /** @hidden */
    isPopup = computed(() => this.state() === 'popup');
    /** @hidden */
    isExpanded = computed(() => this.state() === 'expanded');

    /** @hidden */
    isHorizontal = computed(() => this.type() === 'horizontal');
    /** @hidden */
    isVertical = computed(() => this.type() === 'vertical');

    /** @hidden */
    isDesktop = computed(() => this.mode() === 'desktop');
    /** @hidden */
    isTablet = computed(() => this.mode() === 'tablet');
    /** @hidden */
    isPhone = computed(() => this.mode() === 'phone');
}
