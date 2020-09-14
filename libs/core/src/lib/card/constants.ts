export const CLASS_NAME = {
    card: 'fd-card',
    cardCompact: 'fd-card--compact',
    cardHeader: 'fd-card__header',
    cardTitle: 'fd-card__title',
    cardSubTitle: 'fd-card__subtitle',
    cardCounter: 'fd-card__counter',
    cardBadge: 'fd-card__badge',
    cardContent: 'fd-card__content',
    cardFooter: 'fd-card__footer',
    cardLoader: 'fd-card__loader'
} as const;

export type CardType = 'standard' | 'component' | 'analytical' | 'list' | 'table' | 'object' | 'quickView' | 'linkList';
