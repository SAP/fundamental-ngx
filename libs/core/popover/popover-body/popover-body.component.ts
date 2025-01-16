import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Input,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { A11yModule, CdkTrapFocus } from '@angular/cdk/a11y';
import { ESCAPE } from '@angular/cdk/keycodes';
import { CdkScrollable, ConnectionPositionPair } from '@angular/cdk/overlay';

import { Subject } from 'rxjs';

import { NgTemplateOutlet } from '@angular/common';
import { KeyUtil, Nullable, ResizeDirective, ResizeHandleDirective } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';

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
    styleUrl: './popover-body.component.scss',
    providers: [contentDensityObserverProviders({ alwaysAddModifiers: true })],
    imports: [A11yModule, CdkScrollable, ScrollbarDirective, NgTemplateOutlet, ResizeHandleDirective, ResizeDirective]
})
export class PopoverBodyComponent implements AfterViewInit {
    /** Minimum width of the popover body element. */
    @Input()
    minWidth: Nullable<string>;

    /** Maximum width of the popover body element. */
    @Input()
    maxWidth: Nullable<string>;

    /** Minimum height of the popover body element. */
    @Input()
    minHeight: Nullable<string>;

    /** Maximum height of the popover body element. */
    @Input()
    maxHeight: Nullable<string>;

    /** @hidden */
    @ViewChild(CdkTrapFocus)
    _cdkTrapFocus: CdkTrapFocus;

    /** @hidden */
    @ViewChild(ScrollbarDirective)
    _scrollbar: ScrollbarDirective;

    /** Whether to wrap content with fd-scrollbar directive. */
    _disableScrollbar = false;

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

    /** @hidden Property bind to popover's body. */
    _popoverBodyWidth: number;

    /** @hidden Property bind to popover's body. */
    _popoverBodyMinWidth: number;

    /** @hidden Property bind to popover's body. */
    _maxWidth: Nullable<number>;

    /** @hidden Property bind to popover's body. */
    _closeOnEscapeKey = false;

    /** @hidden Aria role for the popover body. */
    _bodyRole: Nullable<string> = 'dialog';

    /** @hidden Aria role for the popover body. */
    _bodyId: Nullable<string> = null;

    /** Classes added to arrow element. */
    _arrowClasses = '';

    /** @hidden text rendered inside popover's body. */
    text: Nullable<string> = null;

    /** @hidden template rendered inside popover's body. */
    _templateToDisplay: TemplateRef<any>;

    /** @hidden Whether the popover body is resizable. */
    _resizable = false;

    /** @hidden */
    _resizeHandleLocation: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'bottom-right';

    /** Close event from popover body */
    onClose = new Subject<void>();

    /** @hidden */
    private _bodyComponentClasses: string | null = null;

    /** @hidden */
    constructor(
        readonly _elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private readonly _renderer: Renderer2,
        readonly _contentDensityObserver: ContentDensityObserver
    ) {}

    /** Handler escape keydown */
    @HostListener('keyup', ['$event'])
    bodyKeyupHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, ESCAPE) && this._closeOnEscapeKey) {
            // In case if popover belongs to the element inside dialog
            event.stopPropagation();
            this.onClose.next();
        }
    }

    /** Handler for focus when clicking outside */
    @HostListener('document:click', ['$event.target'])
    onClick(targetElement: HTMLElement): void {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            // Call the focus logic if clicked outside the popover
            this._focusFirstTabbableElement();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this._scrollbar) {
            this._scrollbar._inPopover = true;
        }
    }

    /** @hidden */
    _setBodyComponentClasses(classes: string | null): void {
        this._bodyComponentClasses?.split(' ').forEach((klass) => {
            this._renderer.removeClass(this._elementRef.nativeElement, klass);
        });
        this._bodyComponentClasses = classes;
        if (!this._bodyComponentClasses) {
            return;
        }
        this._bodyComponentClasses.split(' ').forEach((klass) => {
            this._renderer.addClass(this._elementRef.nativeElement, klass);
        });
    }

    /** @hidden */
    _setArrowStyles(position: ConnectionPositionPair, rtl: 'rtl' | 'ltr'): void {
        this._resizeHandleLocation = `${position.overlayY === 'top' ? 'bottom' : 'top'}-${
            position.overlayX === 'start' ? 'right' : 'left'
        }`;
        if (this._noArrow) {
            this._arrowClasses = '';
            return;
        }

        let arrowClasses: string[] = [];

        if (
            position.overlayY !== position.originY &&
            position.originY !== 'center' &&
            position.overlayY !== 'center' &&
            position.overlayX === position.originX
        ) {
            arrowClasses = [
                `fd-popover__body--${position.overlayY === 'top' ? 'below' : 'above'}`,
                `fd-popover__body--${position.overlayX === 'start' ? 'left' : 'right'}`,
                `fd-popover__body--arrow-${position.overlayY}`,
                `fd-popover__body--arrow-x-${position.originX}`
            ];
        } else if (
            position.overlayX !== position.originX &&
            position.overlayX !== 'center' &&
            position.originX !== 'center' &&
            position.originY === position.overlayY
        ) {
            let overlayX = position.overlayX;
            if (rtl === 'rtl') {
                overlayX = position.overlayX === 'end' ? 'start' : 'end';
            }
            arrowClasses = [
                `fd-popover__body--${overlayX === 'start' ? 'after' : 'before'}`,
                `fd-popover__body--${overlayX === 'start' ? 'left' : 'right'}`,
                `fd-popover__body--${position.overlayY === 'center' ? 'middle' : position.overlayY}`,
                `fd-popover__body--arrow-${overlayX === 'start' ? 'left' : 'right'}`,
                `fd-popover__body--arrow-y-${position.originY} `
            ];
        } else {
            arrowClasses = ['fd-popover__body--no-arrow'];
        }

        this._arrowClasses = arrowClasses.join(' ');

        this.detectChanges();
    }

    /** @hidden */
    detectChanges(): void {
        if (!this._changeDetectorRef['destroyed']) {
            this._changeDetectorRef.detectChanges();
        }
    }

    /** @hidden */
    _focusFirstTabbableElement(forced = false): void {
        if (forced || this._focusAutoCapture) {
            this._cdkTrapFocus.focusTrap.focusFirstTabbableElement();
        }
    }
}
