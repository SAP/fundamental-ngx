import { ConnectedPosition } from '@angular/cdk/overlay';
import { PopoverPosition } from '../../shared/interfaces/popover-position';

describe('PopoverPosition', () => {

    it('should return proper arrow position and margin - top', () => {

        const position: ConnectedPosition = { overlayY: 'top', overlayX: 'center', originX: 'center', originY: 'bottom' }
        const arrowPosition = PopoverPosition.getArrowPosition(position);
        const margin = PopoverPosition.getMarginDirection(arrowPosition);

        expect(arrowPosition).toBe('top');
        expect(margin).toBe('margin-top');

    });

    it('should return proper arrow position and margin - bottom', () => {

        const position: ConnectedPosition = { overlayY: 'bottom', overlayX: 'center', originX: 'center', originY: 'top' }
        const arrowPosition = PopoverPosition.getArrowPosition(position);
        const margin = PopoverPosition.getMarginDirection(arrowPosition);

        expect(arrowPosition).toBe('bottom');
        expect(margin).toBe('margin-bottom');

    });

    it('should return proper arrow position and margin - start', () => {

        const position: ConnectedPosition = { overlayY: 'center', overlayX: 'start', originX: 'end', originY: 'top' }
        const arrowPosition = PopoverPosition.getArrowPosition(position);
        const margin = PopoverPosition.getMarginDirection(arrowPosition);

        expect(arrowPosition).toBe('start');
        expect(margin).toBe('margin-left');

    });

    it('should return proper arrow position and margin - end', () => {

        const position: ConnectedPosition = { overlayY: 'center', overlayX: 'end', originX: 'start', originY: 'top' }
        const arrowPosition = PopoverPosition.getArrowPosition(position);
        const margin = PopoverPosition.getMarginDirection(arrowPosition);

        expect(arrowPosition).toBe('end');
        expect(margin).toBe('margin-right');

    });

    it('should return proper arrow position and margin - start with rtl', () => {

        const position: ConnectedPosition = { overlayY: 'center', overlayX: 'start', originX: 'end', originY: 'top' }
        const arrowPosition = PopoverPosition.getArrowPosition(position, true);
        const margin = PopoverPosition.getMarginDirection(arrowPosition);

        expect(arrowPosition).toBe('end');
        expect(margin).toBe('margin-right');

    });

    it('should return proper arrow position and margin - end with rtl', () => {

        const position: ConnectedPosition = { overlayY: 'center', overlayX: 'end', originX: 'start', originY: 'top' }
        const arrowPosition = PopoverPosition.getArrowPosition(position, true);
        const margin = PopoverPosition.getMarginDirection(arrowPosition);

        expect(arrowPosition).toBe('start');
        expect(margin).toBe('margin-left');

    });
});
