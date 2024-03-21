import { Signal } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { DynamicPageBackgroundType, DynamicPageResponsiveSize } from './constants';

export interface DynamicPage {
    disableSnapOnScroll: boolean;
    ariaLabel: Nullable<string>;
    background: DynamicPageBackgroundType;
    autoResponsive: boolean;
    size: DynamicPageResponsiveSize;
    offset: number;
    expandContent: boolean;
    collapsed: Signal<boolean>;

    /** toggle the visibility of the header on click of title area. */
    toggleCollapse(): void;

    /**
     * Triggers recheck for spacing and sizing of elements inside DynamicPage.
     */
    refreshSize(): void;
}
