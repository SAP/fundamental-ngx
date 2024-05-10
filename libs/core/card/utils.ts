import { CLASS_NAME, CardType } from './constants';

const buildModifierClassName = (className: string): string => `${CLASS_NAME.card}--${className}`;

export const getCardModifierClassNameByCardType = (cardType: CardType): string => {
    switch (cardType) {
        case 'standard':
        case 'component':
        case 'list':
        case 'banner':
        case 'analytical':
        case 'table':
        case 'object':
            return buildModifierClassName(cardType);

        default:
            return '';
    }
};

/** @hidden */
export function isTruthy<T>(value?: T | undefined | null | false | 0): value is T {
    return !!value;
}
