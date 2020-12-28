import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Renderer2,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';

import { ConnectionPositionPair } from '@angular/cdk/overlay/position/connected-position';
import { ESCAPE } from '@angular/cdk/keycodes';

import { Subject } from 'rxjs';

import { ARROW_SIZE, ArrowPosition } from '../popover-position/popover-position';
import { PopoverFlippedDirection } from '../popover-position/popover-position';
import { KeyUtil } from '../../utils/functions/key-util';
import { PopoverPosition } from '../popover-position/popover-position';

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

    /** @hidden Properties bind to popover's body */
    _popoverBodyMinWidth: number;

    /** @hidden Properties bind to popover's body */
    _templateToDisplay: TemplateRef<any>

    /** @hidden Properties bind to popover's body */
    _maxWidth;

    /** @hidden Properties bind to popover's body */
    _closeOnEscapeKey = false;

    /** Classes added to arrow element */
    _arrowClasses: string[] = [];

    /** Additional style to put margin into body component, to give a place for arrow */
    _marginStyle: string = null;

    text: string = null;

    onClose = new Subject<void>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _renderer2: Renderer2,
        private readonly _elementRef: ElementRef
    ) {}

    /** @hidden */
    _setArrowStyles(position: ConnectionPositionPair, rtl: 'rtl' | 'ltr'): void {

        this._arrowClasses = [];

        const arrowDirection = PopoverPosition.getArrowPosition(position, rtl === 'rtl');
        this._arrowClasses.push(`fd-popover__arrow--${arrowDirection}`);

        if (arrowDirection === 'top' || arrowDirection === 'bottom') {
            let _position: string = position.overlayX;
            if (rtl === 'rtl') {
                _position = PopoverFlippedDirection[_position];
            }
            this._arrowClasses.push(`fd-popover__arrow-x--${_position}`)
        } else if (arrowDirection === 'start' || arrowDirection === 'end') {
            this._arrowClasses.push(`fd-popover__arrow-y--${position.overlayY}`)
        }

        this._removeOldMarginsStyle();
        this._addMarginStyle(arrowDirection);

        this.detectChanges();
    }

    /** Handler escape keydown */
    bodyKeydownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, ESCAPE) && this._closeOnEscapeKey) {
            this.onClose.next();
        }
    }

    /** @hidden */
    detectChanges(): void {
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden */
    private _addMarginStyle(arrowDirection: ArrowPosition): void {
        this._renderer2.setStyle(
            this._elementRef.nativeElement,
            PopoverPosition.getMarginDirection(arrowDirection),
            ARROW_SIZE
        );
    }

    /** @hidden */
    private _removeOldMarginsStyle(): void {
        const margins = ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'];
        margins.forEach(margin => this._renderer2.removeStyle(this._elementRef.nativeElement, margin));
    }

}
