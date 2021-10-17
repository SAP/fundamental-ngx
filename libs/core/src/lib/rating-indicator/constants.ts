export const INDICATOR_PREFIX = 'fd-rating-indicator';

export const INDICATOR_CLASSES = {
    halves: `${INDICATOR_PREFIX}--half-star`,
    icon: `${INDICATOR_PREFIX}--icon`,
    hideDynamicText: `${INDICATOR_PREFIX}--hide-dynamic-text`
};
export const INDICATOR_DEFAULT_CAPACITY = 5;

export type RatingIndicatorSize = 'xs' | 'sm' | 'md' | 'lg' | 'cozy' | 'compact' | 'condensed';
export enum RatingIndicatorSizeEnum {
    'xs',
    'sm',
    'md',
    'lg',
    'cozy',
    'compact',
    'condensed'
}
