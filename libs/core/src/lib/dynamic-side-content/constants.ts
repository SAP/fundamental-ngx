import { InjectionToken } from '@angular/core';

export const DYNAMIC_SIDE_CONTENT_CLASS_NAME = {
    container: 'fd-dynamic-side',
    containerSizeSm: 'fd-dynamic-side--sm',
    containerSizeMd: 'fd-dynamic-side--md',
    containerSizeXl: 'fd-dynamic-side--xl',
    containerSideBelow: 'fd-dynamic-side--below',
    containerSideEqual: 'fd-dynamic-side--equal-split',

    side: 'fd-dynamic-side__side',
    main: 'fd-dynamic-side__main'
} as const;

export type DynamicSideContentPosition = 'left' | 'right' | 'bottom' | 'equalSplit' | 'none';

export type DynamicSideContentSize = 'sm' | 'md' | 'lg' | 'xl';

export const DYNAMIC_SIDE_CONTENT_CHILD_TOKEN = new InjectionToken<string>('DYNAMIC_SIDE_CONTENT_CHILDREN_TOKEN');
