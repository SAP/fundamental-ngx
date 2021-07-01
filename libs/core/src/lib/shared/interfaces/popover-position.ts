import { isDevMode } from '@angular/core';
import { ConnectedPosition } from '@angular/cdk/overlay';

const popoverPlacementMap: {[key: string]: ConnectedPosition} = {
    'top-start': { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
    'top': { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' },
    'top-end': { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
    'bottom-start': { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    'bottom': { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' },
    'bottom-end': { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
    'left-start': { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' },
    'left': { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' },
    'left-end': { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom' },
    'right-start': { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' },
    'right': { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' },
    'right-end': { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' }
};

export const DefaultPositions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
    { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' },
    { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' },
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
];

export const GetDefaultPosition = (position: ConnectedPosition[]): ConnectedPosition[] => {
    const resultPosition: ConnectedPosition[] = [];
    if (position && position[0]) {
        const firstPosition: ConnectedPosition = position[0];
        resultPosition.push({
            ...firstPosition,
            originY: PopoverFlippedYDirection[firstPosition.originY],
            overlayY: PopoverFlippedYDirection[firstPosition.overlayY]
        });
    }

    return resultPosition.concat(DefaultPositions);
}

/**
 * Preset options for the popover body width.
 * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
 * * `equal` will apply a width to the body equivalent to the width of the control.
 * * 'fit-content' will apply width needed to properly display items inside, independent of control.
 */
export type PopoverFillMode = 'at-least' | 'equal' | 'fit-content';

export const ARROW_SIZE  = '0.5rem';


export type Placement = 'auto-start'
    | 'auto'
    | 'auto-end'
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-end'
    | 'bottom'
    | 'bottom-start'
    | 'left-end'
    | 'left'
    | 'left-start';

export type XPositions = 'start' | 'center' | 'end';
export type YPositions = 'top' | 'center' | 'bottom';
export type ArrowPosition = 'top' | 'bottom' | 'start' | 'end' | 'center';

export const PopoverFlippedXDirection: {[key: string]: ArrowPosition} = {
    'start': 'end',
    'end': 'start',
    'center': 'center'
};

export const PopoverFlippedYDirection: {[key: string]: YPositions} = {
    'bottom': 'top',
    'top': 'bottom',
    'center': 'center'
};

export class PopoverPosition {

    static getCdkPlacement(placement: Placement): ConnectedPosition {
        const resultCdkPlacement = popoverPlacementMap[placement];

        if (!resultCdkPlacement && isDevMode()) {
            throw new Error('Invalid function argument. Check if "placement" is type of Placement Union');
        }

        return resultCdkPlacement;
    }

    static getArrowPosition(position: ConnectedPosition, rtl?: boolean): ArrowPosition {
        let _position: ArrowPosition = null;

        if (position.overlayY !== position.originY &&
            position.originY !== 'center' &&
            position.overlayY !== 'center') {
            _position = position.overlayY;
        } else if (
            position.overlayX !== position.originX &&
            position.overlayX !== 'center' &&
            position.originX !== 'center') {
            _position = position.overlayX;

            if (rtl) {
                _position = PopoverFlippedXDirection[_position];
            }
        }

        return _position;
    }

    static getMarginDirection(position: ArrowPosition): string {
        if (!position) {
            return;
        }

        const resultPosition = position.replace('start', 'left').replace('end', 'right');
        return 'margin-' + resultPosition;
    }

}
