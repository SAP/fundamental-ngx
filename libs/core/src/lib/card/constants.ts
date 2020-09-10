import { InjectionToken } from '@angular/core';

export const CLASS_NAME = {
    card: 'fd-card',
    cardHeader: 'fd-card__header',
    cardContent: 'fd-card__content',
    cardFooter: 'fd-card__footer'
} as const;

export const CARD_CHILD_TOKEN = new InjectionToken<string>('CARD_CHILD_TOKEN');
