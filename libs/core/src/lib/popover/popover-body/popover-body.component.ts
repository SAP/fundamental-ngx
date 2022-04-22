import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    HostListener,
    Optional,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { ESCAPE } from '@angular/cdk/keycodes';
import { CdkTrapFocus } from '@angular/cdk/a11y';

import { Subject } from 'rxjs';

import { ARROW_SIZE, ArrowPosition, Nullable, PopoverFlippedXDirection, PopoverPosition } from '@fundamental-ngx/core/shared';
import { ContentDensityService, KeyUtil } from '@fundamental-ngx/core/utils';
import { NotificationGroupComponent } from '@fundamental-ngx/core/notification';

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
    /** @hidden */
    @ViewChild(CdkTrapFocus)
    _cdkTrapFocus: CdkTrapFocus;

    /** @hidden */
    @ContentChild(NotificationGroupComponent)
    notificationGroup: NotificationGroupComponent;

    /** Whether the popover should have an arrow. */
    _noArrow = true;

    /** Whether the popover container needs an extra class for styling. */
    _additionalBodyClass: Nullable<string>;

    /** Whether the popover should be focusTrapped. */
    _focusTrapped = false;

    /**
     * Whether the popover should automatically move focus into the trapped region upon
     * initialization and return focus to the previous activeElement upon destruction.
     */
    _focusAutoCapture = false;

    /** @hidden Property bind to popover's body */
    _popoverBodyWidth: number;

    /** @hidden Property bind to popover's body */
    _popoverBodyMinWidth: number;

    /** @hidden Property bind to popover's body */
    _maxWidth: Nullable<number>;

    /** @hidden Property bind to popover's body */
    _closeOnEscapeKey = false;

    /** Classes added to arrow element */
    _arrowClasses: string[] = [];

    /** Additional style to put margin into body component, to give a place for arrow */
    _marginStyle: Nullable<string> = null;

    /** @hidden text rendered inside popover's body */
    text: Nullable<string> = null;

    /** @hidden template rendered inside popover's body */
    _templateToDisplay: TemplateRef<any>;

    /** Close event from popover body */
    onClose = new Subject<void>();

    /** @hidden */
    get _isCompact(): boolean {
        return this._contentDensityService?.contentDensity.value === 'compact';
    }

    /** Handler escape keydown */
    @HostListener('keyup', ['$event'])
    bodyKeyupHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, ESCAPE) && this._closeOnEscapeKey) {
            // In case if popover belongs to the element inside dialog
            event.stopPropagation();
            this.onClose.next();
        }
    }

    constructor(
        readonly _elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private _renderer2: Renderer2,
        @Optional() private _contentDensityService: ContentDensityService
    ) {}

    /** @hidden */
    _setArrowStyles(position: ConnectionPositionPair, rtl: 'rtl' | 'ltr'): void {
        this._arrowClasses = [];

        const arrowDirection = PopoverPosition.getArrowPosition(position, rtl === 'rtl');
        this._arrowClasses.push(`fd-popover__arrow--${arrowDirection}`);

        if (arrowDirection === 'top' || arrowDirection === 'bottom') {
            let _position: string = position.overlayX;
            if (rtl === 'rtl') {
                _position = PopoverFlippedXDirection[_position];
            }
            this._arrowClasses.push(`fd-popover__arrow-x--${_position}`);
        } else if (arrowDirection === 'start' || arrowDirection === 'end') {
            this._arrowClasses.push(`fd-popover__arrow-y--${position.overlayY}`);
        }

        this._removeOldMarginsStyle();
        this._addMarginStyle(arrowDirection);

        this.detectChanges();
    }

    /** @hidden */
    detectChanges(): void {
        if (!this._changeDetectorRef['destroyed']) {
            this._changeDetectorRef.detectChanges();
        }
    }

    /** @hidden */
    _focusFirstTabbableElement(): void {
        if (this._focusAutoCapture) {
            this._cdkTrapFocus.focusTrap.focusFirstTabbableElement();
        }
    }

    /** @hidden */
    private _addMarginStyle(arrowDirection: ArrowPosition | null): void {
        if (arrowDirection) {
            this._renderer2.setStyle(
                this._elementRef.nativeElement,
                PopoverPosition.getMarginDirection(arrowDirection),
                ARROW_SIZE
            );
        }
    }

    /** @hidden */
    private _removeOldMarginsStyle(): void {
        const margins = ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'];
        margins.forEach((margin) => this._renderer2.removeStyle(this._elementRef.nativeElement, margin));
    }
}
