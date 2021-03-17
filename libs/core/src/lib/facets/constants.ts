export const FACET_CLASS_NAME = {
    facetContainer: 'fd-facet__container',
    facetRatingIndicatorContainer: 'fd-facet__rating-container',
    facetRatingIndicatorDynamicText: 'fd-facet__rating-dynamic-text',
    facetImageHeaderTitleAlignment: 'fd-facet--image-header-title',
    facetObjectStatus: 'fd-facet__object-status',
    facetObjectStatusText: 'fd-facet__object-status-text',
    marginTopTiny: 'fd-margin-top--tiny',
    marginBottomTiny: 'fd-margin-bottom--tiny',
    marginEndTiny: 'fd-margin-end--tiny',
    paddingNone: 'fd-padding--none'
} as const;

export type FacetType = 'form' | 'key-value' | 'image' | 'rating-indicator' | 'custom';
