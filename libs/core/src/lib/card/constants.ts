export const CLASS_NAME = {
    card: 'fd-card',
    cardCompact: 'fd-card--compact',

    cardHeader: 'fd-card__header',
    cardHeaderNonInteractive: 'fd-card__header--non-interactive',
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

    cardCounter: 'fd-card__counter',
    cardBadge: 'fd-card__badge',
    cardContent: 'fd-card__content',
    cardFooter: 'fd-bar',
    cardFooterRight: 'fd-bar__right',
    cardFooterBorder: 'fd-bar--footer',
    cardLoader: 'fd-card__loader'
} as const;

export type CardType = 'standard' | 'component' | 'analytical' | 'list' | 'table' | 'object' | 'quickView' | 'linkList';
