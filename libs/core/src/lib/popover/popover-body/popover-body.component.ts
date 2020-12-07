import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ConnectionPositionPair } from '@angular/cdk/overlay/position/connected-position';
import { ArrowPosition, KeyUtil, PopoverFlippedDirection, PopoverPosition } from '../../..';
import { ESCAPE } from '@angular/cdk/keycodes';

/**
 * A component used to enforce a certain layout for the popover.
 * ```html
 * <fd-popover>
 *     <fd-popover-control>Control Element</fd-popover-control>
 *     <fd-popover-body>Popover Body</fd-popover-body>
 * </fd-popover>
 * ```
 */
@Component({
    selector: 'fd-popover-body',
    templateUrl: './popover-body.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./popover-body.component.scss']
})
export class PopoverBodyComponent {


    /** Whether the popover should have an arrow. */
    _noArrow = true;

    /** Whether the popover container needs an extra class for styling. */
    _additionalBodyClass: string;

    /** Whether the popover should be focusTrapped. */
    _focusTrapped = false;

    /**
     * Whether the popover should automatically move focus into the trapped region upon
     * initialization and return focus to the previous activeElement upon destruction.
     */
    _focusAutoCapture = false;


    /** @hidden Properties bind to popover's body */
    _popoverBodyWidth: number;
    _popoverBodyMinWidth: number;
    _templateToDisplay: TemplateRef<any>
    _maxWidth;

    /** Direction of arrow */
    _arrowDirection: ArrowPosition = null;

    /** Classes added to arrow element */
    _arrowClasses: string[] = [];

    /** Additional style to put margin into body component, to give a place for arrow */
    _marginStyle: string = null;

    text: string = null;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    _setArrowStyles(position: ConnectionPositionPair, rtl: 'rtl' | 'ltr'): void {

        this._arrowClasses = [];

        this._arrowDirection = PopoverPosition.getArrowPosition(position, rtl === 'rtl');
        this._arrowClasses.push(`fd-popover__arrow--${this._arrowDirection}`);

        if (this._arrowDirection === 'top' || this._arrowDirection === 'bottom') {
            let _position: string = position.overlayX;
            if (rtl === 'rtl') {
                _position = PopoverFlippedDirection[_position];
            }
            this._arrowClasses.push(`fd-popover__arrow-x--${_position}`)
        } else if (this._arrowDirection === 'start' || this._arrowDirection === 'end') {
            this._arrowClasses.push(`fd-popover__arrow-y--${position.overlayY}`)
        }

        this._marginStyle = PopoverPosition.getMarginStyle(this._arrowDirection);

        this._changeDetectorRef.detectChanges();
    }

    /** @hidden */
     _removeArrowStyles(): void {
        this._arrowDirection = null;
        this._arrowClasses = [];
        this._marginStyle = null;
    }

    /** Handler escape keydown */
    bodyKeydownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, ESCAPE)) {
            // this.close();
        }
    }

}
