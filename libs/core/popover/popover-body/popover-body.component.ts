import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    input,
    output,
    Renderer2,
    signal,
    TemplateRef,
    viewChild,
    ViewEncapsulation
} from '@angular/core';

import { A11yModule, CdkTrapFocus } from '@angular/cdk/a11y';
import { ESCAPE } from '@angular/cdk/keycodes';
import { CdkScrollable, ConnectionPositionPair } from '@angular/cdk/overlay';

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
    imports: [A11yModule, CdkScrollable, ScrollbarDirective, NgTemplateOutlet, ResizeHandleDirective, ResizeDirective],
    standalone: true,
    host: {
        '(keydown)': 'bodyKeyupHandler($event)'
    }
})
export class PopoverBodyComponent {
    /** Minimum width of the popover body element. */
    readonly minWidth = input<Nullable<string>>();

    /** Maximum width of the popover body element. */
    readonly maxWidth = input<Nullable<string>>();

    /** Minimum height of the popover body element. */
    readonly minHeight = input<Nullable<string>>();

    /** Maximum height of the popover body element. */
    readonly maxHeight = input<Nullable<string>>();

    /** @hidden */
    readonly _cdkTrapFocus = viewChild(CdkTrapFocus);

    /** @hidden */
    readonly _scrollbar = viewChild(ScrollbarDirective);

    /** @hidden Whether to wrap content with fd-scrollbar directive. */
    readonly _disableScrollbar = signal(false);

    /** @hidden Whether the popover should have an arrow. */
    readonly _noArrow = signal(true);

    /** @hidden Whether the popover container needs an extra class for styling. */
    readonly _additionalBodyClass = signal<Nullable<string>>(null);

    /** @hidden Whether the popover should be focusTrapped. */
    readonly _focusTrapped = signal(false);

    /**
     * @hidden
     * Whether the popover should automatically move focus into the trapped region upon
     * initialization and return focus to the previous activeElement upon destruction.
     */
    readonly _focusAutoCapture = signal(false);

    /** @hidden Property bind to popover's body. */
    readonly _popoverBodyWidth = signal<number | undefined>(undefined);

    /** @hidden Property bind to popover's body. */
    readonly _popoverBodyMinWidth = signal<number | undefined>(undefined);

    /** @hidden Property bind to popover's body. */
    readonly _maxWidth = signal<Nullable<number>>(null);

    /** @hidden Property bind to popover's body. */
    readonly _closeOnEscapeKey = signal(false);

    /** @hidden Aria role for the popover body. */
    readonly _bodyRole = signal<Nullable<string>>('dialog');

    /** @hidden ID for the popover body. */
    readonly _bodyId = signal<string | null>(null);

    /** @hidden Classes added to arrow element. */
    readonly _arrowClasses = signal('');

    /** @hidden text rendered inside popover's body. */
    readonly text = signal<Nullable<string>>(null);

    /** @hidden template rendered inside popover's body. */
    readonly _templateToDisplay = signal<TemplateRef<any> | undefined>(undefined);

    /** @hidden Whether the popover body is resizable. */
    readonly _resizable = signal(false);

    /** @hidden */
    readonly _resizeHandleLocation = signal<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>('bottom-right');

    /** Event emitted when popover body requests to be closed (e.g., Escape key press) */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onClose = output<void>();

    /** @hidden */
    readonly _elementRef = inject(ElementRef);

    /** @hidden */
    readonly _contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden */
    private readonly _renderer = inject(Renderer2);

    /** @hidden */
    private _bodyComponentClasses: string | null = null;

    /** @hidden */
    constructor() {
        afterNextRender(() => {
            const scrollbar = this._scrollbar();
            if (scrollbar) {
                scrollbar._inPopover = true;
            }
        });
    }

    /** Handler escape keydown */
    bodyKeyupHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, ESCAPE) && this._closeOnEscapeKey()) {
            // In case if popover belongs to the element inside dialog
            event.stopPropagation();
            this.onClose.emit();
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
        this._resizeHandleLocation.set(
            `${position.overlayY === 'top' ? 'bottom' : 'top'}-${position.overlayX === 'start' ? 'right' : 'left'}`
        );
        if (this._noArrow()) {
            this._arrowClasses.set('');
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

        this._arrowClasses.set(arrowClasses.join(' '));
    }

    /** @hidden */
    _focusFirstTabbableElement(forced = false): void {
        if (forced || this._focusAutoCapture()) {
            requestAnimationFrame(() => {
                this._cdkTrapFocus()?.focusTrap.focusFirstTabbableElement();
            });
        }
    }
}
