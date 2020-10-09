import { PopoverPosition } from './popover-position';
import { ConnectedPosition } from '@angular/cdk/overlay';

describe('PopoverPosition', () => {

    it('should return proper arrow position and margin - top', () => {

        const position: ConnectedPosition = { overlayY: 'top', overlayX: 'center', originX: 'center', originY: 'bottom' }
        const arrowPosition = PopoverPosition.getArrowPosition(position);
        const margin = PopoverPosition.getMarginStyle(arrowPosition);

        expect(arrowPosition).toBe('top');
        expect(margin).toBe('margin-top: 0.5rem;');

    });

    it('should return proper arrow position and margin - bottom', () => {

        const position: ConnectedPosition = { overlayY: 'bottom', overlayX: 'center', originX: 'center', originY: 'top' }
        const arrowPosition = PopoverPosition.getArrowPosition(position);
        const margin = PopoverPosition.getMarginStyle(arrowPosition);

        expect(arrowPosition).toBe('bottom');
        expect(margin).toBe('margin-bottom: 0.5rem;');

    });

    it('should return proper arrow position and margin - start', () => {

        const position: ConnectedPosition = { overlayY: 'center', overlayX: 'start', originX: 'center', originY: 'top' }
        const arrowPosition = PopoverPosition.getArrowPosition(position);
        const margin = PopoverPosition.getMarginStyle(arrowPosition);

        expect(arrowPosition).toBe('start');
        expect(margin).toBe('margin-left: 0.5rem;');

    });

    it('should return proper arrow position and margin - end', () => {

        const position: ConnectedPosition = { overlayY: 'center', overlayX: 'end', originX: 'center', originY: 'top' }
        const arrowPosition = PopoverPosition.getArrowPosition(position);
        const margin = PopoverPosition.getMarginStyle(arrowPosition);

        expect(arrowPosition).toBe('end');
        expect(margin).toBe('margin-right: 0.5rem;');

    });

    it('should return proper arrow position and margin - start with rtl', () => {

        const position: ConnectedPosition = { overlayY: 'center', overlayX: 'start', originX: 'center', originY: 'top' }
        const arrowPosition = PopoverPosition.getArrowPosition(position, true);
        const margin = PopoverPosition.getMarginStyle(arrowPosition);

        expect(arrowPosition).toBe('end');
        expect(margin).toBe('margin-right: 0.5rem;');

    });

    it('should return proper arrow position and margin - end with rtl', () => {

        const position: ConnectedPosition = { overlayY: 'center', overlayX: 'start', originX: 'center', originY: 'top' }
        const arrowPosition = PopoverPosition.getArrowPosition(position, true);
        const margin = PopoverPosition.getMarginStyle(arrowPosition);

        expect(arrowPosition).toBe('start');
        expect(margin).toBe('margin-left: 0.5rem;');

    });
});
