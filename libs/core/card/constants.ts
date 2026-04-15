export const CLASS_NAME = {
    card: 'fd-card',

    cardHeader: 'fd-card__header',
    cardHeaderNonInteractive: 'fd-card__header--non-interactive',
    cardHeaderInteractive: 'fd-card__header--interactive',
    cardHeaderRow: 'fd-card__header-row',
    cardHeaderColumn: 'fd-card__header-column',
    cardHeaderColumnRightAligned: 'fd-card__header-column--right-aligned',
    cardHeaderExtended: 'fd-card__header-extended',
    cardHeaderExtendedTopAligned: 'fd-card__header-extended--top-aligned',
    cardHeaderExtendedBottomAligned: 'fd-card__header-extended--bottom-aligned',

    cardTitle: 'fd-card__title',
    cardSubtitle: 'fd-card__subtitle',
    cardSecondSubtitle: 'fd-card__second-subtitle',

    cardAnalyticalArea: 'fd-card__analytics-area',
    cardAnalytics: 'fd-card__analytics',
    cardAnalyticsText: 'fd-card__analytics-text',
    cardAnalyticsContent: 'fd-card__analytics-content',
    cardAnalyticsKpiValue: 'fd-numeric-content__kpi',
    cardAnalyticsScaleIcon: 'fd-numeric-content__scale-arrow',
    cardAnalyticsScaleText: 'fd-numeric-content__scale-text',

    cardIndicator: 'fd-card__indicator',
    cardIndicatorTitle: 'fd-card__indicator-title',
    cardIndicatorValue: 'fd-card__indicator-value',
    cardNumericContainer: 'fd-card__numeric-container',

    cardCounter: 'fd-card__counter',
    cardBadge: 'fd-card__badge',
    cardContent: 'fd-card__content',
    cardFooter: 'fd-card__footer',
    cardLoader: 'fd-card__loader',

    cardMedia: 'fd-card__media',
    cardMediaWithPadding: 'fd-card__media--with-padding',
    cardMediaContentContainer: 'fd-card__media-content-container',
    cardMediaContentContainerOverlay: 'fd-card__media-content-container--overlay',
    cardMediaHeading: 'fd-card__media-heading',
    cardMediaImageContainer: 'fd-card__media-image-container',
    cardMediaImage: 'fd-card__media-image',
    cardMediaText: 'fd-card__media-text'
} as const;

export type CardType =
    | 'standard'
    | 'component'
    | 'analytical'
    | 'list'
    | 'table'
    | 'object'
    | 'quickView'
    | 'linkList'
    | 'banner';
