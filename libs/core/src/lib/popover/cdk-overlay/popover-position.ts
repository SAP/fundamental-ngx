import { ConnectedPosition } from '@angular/cdk/overlay';
import { isDevMode } from '@angular/core';

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
    'right-end': { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
};

export const DefaultPositions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
    { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' },
    { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' },
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' }
];


const ARROW_SIZE  = '0.5rem';


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

export class PopoverPosition {

    /**  */
    static getCdkPlacement(placement: Placement): ConnectedPosition {
        const resultCdkPlacement = popoverPlacementMap[placement];

        if (!resultCdkPlacement && isDevMode()) {
            throw new Error('Invalid function argument. Check if "placement" is type of Placement Union');
        }

        return resultCdkPlacement;
    }

    static getArrowPosition(position: ConnectedPosition, rtl?: boolean): string {
        let _position = '';

        if (position.overlayY !== position.originY && position.originY !== 'center' && position.overlayY !== 'center') {
            _position = position.overlayY;
        } else if (position.overlayX !== position.originX && position.originX !== 'center') {
            _position = position.overlayX;

            if (rtl) {
                console.log('rtl');
                if (_position === 'start') {
                    _position = 'end';
                } else if (_position === 'end') {
                    _position = 'start';
                }
            }
        }

        return (_position === 'center' ? '' : _position);
    }

    static getMarginStyle(position: string): string {
        if (!position) {
            return;
        }
        if (position === 'start') {
            return 'margin-left: 0.5rem;';
        }
        if (position === 'end') {
            return 'margin-right: 0.5rem;';
        }
        return 'margin-' + position + ': ' + ARROW_SIZE + ';';
    }

}
