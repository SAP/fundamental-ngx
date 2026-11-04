import { InputModalityDetector } from '@angular/cdk/a11y';
import { ENTER } from '@angular/cdk/keycodes';
import {
    afterRenderEffect,
    ApplicationRef,
    booleanAttribute,
    computed,
    DestroyRef,
    Directive,
    DOCUMENT,
    effect,
    ElementRef,
    EmbeddedViewRef,
    inject,
    input,
    Renderer2,
    RendererStyleFlags2,
    TemplateRef,
    untracked
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyUtil, RtlService } from '@fundamental-ngx/cdk/utils';
import { buildPopoverConfig, PopoverService } from '@fundamental-ngx/core/popover';
import { Placement, PopoverPosition } from '@fundamental-ngx/core/shared';
import { TooltipCoordinator, TooltipHandle } from './tooltip-coordinator.service';
import { DEFAULT_TOOLTIP_CONFIG, TOOLTIP_CONFIG } from './tooltip.config';

/** Side of the host element the tooltip is shown on. */
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/** Alignment along the chosen side: `start`/`end` align with the host's edge, `middle` centres the tooltip. */
export type TooltipAlignment = 'start' | 'middle' | 'end';

/** How the tooltip is opened: on hover and keyboard focus, or by clicking the host. */
export type TooltipTrigger = 'hover' | 'click';

/** Modifier class that applies the tooltip styling (dark surface, small font, max width) to the popover body. */
const TOOLTIP_BODY_CLASS = 'fd-popover__body--tooltip';

/** How long in ms a touch has to be held before it counts as a long-press. */
const LONG_PRESS_DURATION = 500;

/** Side the tooltip flips to when the preferred side does not fit into the viewport. */
const OPPOSITE_PLACEMENT: Record<TooltipPlacement, TooltipPlacement> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
};

/** Counter used to generate unique tooltip ids. */
let tooltipUniqueId = 0;

/** Maps side and alignment to the popover `Placement` format, e.g. `top` + `start` → `top-start`. */
const toPlacement = (side: TooltipPlacement, alignment: TooltipAlignment): Placement =>
    alignment === 'middle' ? side : `${side}-${alignment}`;

/** Normalises text for comparison: collapses whitespace, trims and lowercases. */
const normalizeText = (value: string): string => value.replace(/\s+/g, ' ').trim().toLowerCase();

/**
 * Shows a short tooltip for the host element.
 *
 * By default, the tooltip opens after a delay on mouse hover or keyboard focus, and immediately on touch
 * long-press or `Ctrl+Alt+I`. It closes when the pointer or focus leaves, on `Escape`, when the host is
 * activated, on outside click, and when the window loses focus. With `fdTooltipTrigger="click"` it is
 * toggled by clicking the host instead.
 *
 * The overlay is rendered by `PopoverService` (positioning, flipping, arrow), while `TooltipCoordinator`
 * decides when to show and hide, so only one tooltip is visible at a time. The host's DOM is never
 * changed; only ARIA attributes are added.
 *
 * The text is assembled by the caller, e.g. `Label - Description (Shortcut)`. A template can be passed
 * instead of text for formatted, non-interactive content.
 *
 * ```html
 * <button fd-button glyph="save" aria-label="Save" fdTooltip="Save (Ctrl+S)" fdTooltipKeyShortcuts="Control+S"></button>
 * ```
 */
@Directive({
    selector: '[fdTooltip]',
    exportAs: 'fdTooltip',
    providers: [PopoverService]
})
export class TooltipDirective {
    /**
     * Content of the tooltip: text already assembled by the caller, e.g. `Save (Ctrl+S)`, or a template
     * for formatted text. Templates must not contain interactive elements; use a popover for those.
     * An empty or whitespace-only text disables the tooltip, the same as `fdTooltipDisabled`.
     */
    readonly fdTooltip = input<string | TemplateRef<unknown> | null | undefined>('');

    /**
     * Side of the host element the tooltip is shown on.
     * When there is not enough room, the tooltip flips to the opposite side automatically.
     */
    readonly fdTooltipPlacement = input<TooltipPlacement>('top');

    /** Alignment along the chosen side: `start`/`end` align with the host's edge, `middle` centres the tooltip. */
    readonly fdTooltipAlignment = input<TooltipAlignment>('middle');

    /**
     * How the tooltip is opened:
     * - `hover` (default): after a delay on mouse hover or keyboard focus, immediately on touch long-press.
     * - `click`: toggled immediately by clicking, tapping or activating the host with the keyboard. It stays
     *   open until it is toggled again, `Escape` is pressed, the user clicks elsewhere or focus moves away.
     *   Use it only on hosts without their own action, e.g. an information button next to a label.
     *
     * `Ctrl+Alt+I` toggles the tooltip in both modes.
     */
    readonly fdTooltipTrigger = input<TooltipTrigger>('hover');

    /**
     * Disables the tooltip. A disabled tooltip never shows and adds no ARIA attributes or event listeners,
     * so the host behaves exactly as without the directive. Use it, for example, to enable the tooltip
     * only while the host text is truncated.
     */
    readonly fdTooltipDisabled = input(false, { transform: booleanAttribute });

    /**
     * Delay in ms before the tooltip shows on hover or keyboard focus.
     * When `null`, `TOOLTIP_CONFIG.showDelay` (500 ms by default) is used.
     */
    readonly fdTooltipShowDelay = input<number | null>(null);

    /**
     * Delay in ms before the tooltip hides after the pointer or focus leaves the host or the tooltip.
     * When `null`, `TOOLTIP_CONFIG.hideDelay` (500 ms by default) is used.
     */
    readonly fdTooltipHideDelay = input<number | null>(null);

    /**
     * Keyboard shortcut of the host action in `aria-keyshortcuts` format, e.g. `Control+S`.
     * It is set as `aria-keyshortcuts` on the host, and for text content the trailing parenthesised
     * shortcut, e.g. ` (Ctrl+S)`, is removed from the screen reader description so it is not announced twice.
     */
    readonly fdTooltipKeyShortcuts = input<string | null>(null);

    /**
     * Additional CSS class(es) for the tooltip body, e.g. to customise its styling.
     * The tooltip is rendered in an overlay, so the styles must not be encapsulated in a component.
     */
    readonly fdTooltipBodyClass = input<string | null>(null);

    /**
     * Unique id of the rendered tooltip container (`role="tooltip"`).
     * The hidden screen reader description uses `<tooltipId>-description`.
     */
    readonly tooltipId = `fd-tooltip-${++tooltipUniqueId}`;

    /** @hidden Host element reference, passed to `PopoverService` as the overlay origin. */
    private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    /** @hidden Host element, used for event listeners and ARIA attributes. */
    private readonly _host = this._elementRef.nativeElement;

    /** @hidden Per-instance popover service that renders, positions and disposes the tooltip overlay. */
    private readonly _popoverService = inject(PopoverService);

    /** @hidden Application-wide service that decides when this tooltip shows or hides. */
    private readonly _coordinator = inject(TooltipCoordinator);

    /**
     * @hidden
     * What the coordinator uses to open and close this tooltip's overlay without delay.
     * Kept in a private object so these delay-free operations are not part of the directive's public API.
     */
    private readonly _handle: TooltipHandle = {
        isOpen: () => this._popoverService.isOpen(),
        open: () => this._popoverService.open(),
        close: () => {
            this._removeBodyListeners();
            if (this._popoverService.isOpen()) {
                this._popoverService.close(false);
            }
        }
    };

    /**
     * @hidden
     * Tracks whether the last user input was keyboard, mouse or touch,
     * so focus only shows the tooltip when it came from the keyboard.
     */
    private readonly _inputModality = inject(InputModalityDetector);

    /** @hidden Text direction, used to mirror left/right placements in RTL. */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** @hidden Used for all DOM writes and event listeners. */
    private readonly _renderer = inject(Renderer2);

    /** @hidden Used to append and look up the hidden description element. */
    private readonly _document = inject(DOCUMENT);

    /** @hidden Keeps the template rendered into the hidden description element up to date. */
    private readonly _appRef = inject(ApplicationRef);

    /** @hidden Effective timing: the defaults overridden by the provided `TOOLTIP_CONFIG`. */
    private readonly _config = { ...DEFAULT_TOOLTIP_CONFIG, ...inject(TOOLTIP_CONFIG) };

    /** @hidden Id of the hidden description element referenced by the host's `aria-describedby`. */
    private readonly _descriptionId = `${this.tooltipId}-description`;

    /** @hidden Text content, or an empty string when a template is used. */
    private readonly _text = computed(() => {
        const content = this.fdTooltip();
        return typeof content === 'string' ? content.trim() : '';
    });

    /** @hidden Template content, or `null` when text is used. */
    private readonly _template = computed(() => {
        const content = this.fdTooltip();
        return content instanceof TemplateRef ? content : null;
    });

    /**
     * @hidden
     * Whether the tooltip is active: not disabled and has a template or non-empty text.
     * Drives the host listeners, the ARIA attributes and the popover `disabled` state.
     */
    private readonly _enabled = computed(() => !this.fdTooltipDisabled() && (!!this._text() || !!this._template()));

    /**
     * @hidden
     * Text announced by screen readers for text content. Equals the tooltip text, except that the trailing
     * `(shortcut)` is removed when `fdTooltipKeyShortcuts` is set, because the shortcut is announced via
     * `aria-keyshortcuts`. Template content is announced as rendered.
     */
    private readonly _description = computed(() => {
        const text = this._text();
        return this.fdTooltipKeyShortcuts() ? text.replace(/\s*\([^()]*\)$/, '') : text;
    });

    /**
     * @hidden
     * Overlay positions passed to the popover: the preferred placement first and the opposite side second,
     * so the overlay flips to the opposite side when the preferred one does not fit.
     */
    private readonly _positions = computed(() => {
        const direction = this._rtlService?.rtl() ? 'rtl' : 'ltr';
        const placement = this.fdTooltipPlacement();
        const alignment = this.fdTooltipAlignment();
        return [placement, OPPOSITE_PLACEMENT[placement]].map((side) =>
            PopoverPosition.getCdkPlacement(toPlacement(side, alignment), direction)
        );
    });

    /**
     * @hidden
     * Popover configuration for the tooltip overlay. Triggers are empty because this directive and the
     * coordinator handle all events and timing; the popover only renders. `Escape` is handled by the
     * coordinator, outside clicks by the popover.
     */
    private readonly _popoverConfig = buildPopoverConfig({
        cdkPositions: this._positions,
        triggers: () => [],
        noArrow: () => false,
        closeOnEscapeKey: () => false,
        closeOnOutsideClick: () => true,
        disableScrollbar: () => true,
        additionalBodyClass: () => [TOOLTIP_BODY_CLASS, this.fdTooltipBodyClass()].filter(Boolean).join(' '),
        bodyRole: () => 'tooltip',
        bodyId: () => this.tooltipId,
        disabled: () => !this._enabled()
    });

    /**
     * @hidden
     * Hidden element in `document.body` that holds the screen reader description.
     * `null` while the tooltip is disabled or has no content.
     */
    private _descriptionElement: HTMLElement | null = null;

    /** @hidden Template content rendered into the hidden description element. */
    private _descriptionView: EmbeddedViewRef<unknown> | null = null;

    /** @hidden Whether this directive set `aria-keyshortcuts`, so it only removes an attribute it owns. */
    private _keyShortcutsApplied = false;

    /** @hidden Cleanup functions for the pointer listeners on the open tooltip overlay. */
    private _bodyListeners: (() => void)[] = [];

    /** @hidden Timer that detects a touch long-press. */
    private _longPressTimer: ReturnType<typeof setTimeout> | null = null;

    /** @hidden Whether `PopoverService.initialise()` was called; later changes use `refreshConfiguration()`. */
    private _initialised = false;

    /**
     * @hidden
     * Wires the directive up reactively:
     * 1. Keeps the popover configuration in sync with the inputs.
     * 2. Keeps the overlay content in sync with `fdTooltip`.
     * 3. Attaches the host listeners only while the tooltip is enabled; disabling it removes them and closes the tooltip.
     * 4. After each render, updates the ARIA attributes and the hidden description element.
     * 5. Attaches hover listeners to the overlay each time it opens, so the tooltip stays open while hovered.
     * 6. On destroy, unregisters from the coordinator and removes everything added to the DOM.
     */
    constructor() {
        effect(() => {
            const config = this._popoverConfig();
            untracked(() => {
                if (this._initialised) {
                    this._popoverService.refreshConfiguration(config);
                } else {
                    this._popoverService.initialise(this._elementRef, config);
                    this._initialised = true;
                }
            });
        });

        effect(() => {
            const text = this._text();
            const template = this._template();
            untracked(() => this._popoverService.updateContent(template ? null : text, template));
        });

        effect((onCleanup) => {
            const trigger = this.fdTooltipTrigger();
            if (!this._enabled()) {
                return;
            }
            const listeners = untracked(() => this._listenToHost(trigger));
            onCleanup(() =>
                untracked(() => {
                    listeners.forEach((unlisten) => unlisten());
                    this._clearLongPress();
                    this._coordinator.hide(this._handle, 0);
                })
            );
        });

        afterRenderEffect(() => {
            const enabled = this._enabled();
            const description = this._description();
            const template = this._template();
            const keyShortcuts = this.fdTooltipKeyShortcuts();
            this._updateAria(enabled ? description : '', enabled ? template : null, enabled ? keyShortcuts : null);
        });

        this._popoverService._onLoad.pipe(takeUntilDestroyed()).subscribe(({ nativeElement }) => {
            this._setHostSize(nativeElement);
            this._listenToBody(nativeElement);
        });

        inject(DestroyRef).onDestroy(() => {
            this._coordinator.unregister(this._handle);
            this._removeBodyListeners();
            this._updateAria('', null, null);
        });
    }

    /**
     * Shows the tooltip immediately, without the show delay, and closes any other open tooltip.
     * Does nothing while the tooltip is disabled or has no content.
     * Accessible from templates via `#ref="fdTooltip"`.
     */
    show(): void {
        if (this._enabled()) {
            this._requestShow(0);
        }
    }

    /** Hides the tooltip immediately and cancels a pending show. */
    hide(): void {
        this._coordinator.hide(this._handle, 0);
    }

    /**
     * @hidden
     * Asks the coordinator to show this tooltip after `delay`. Refreshes `aria-describedby` first,
     * because the host's accessible name may have changed since the last render.
     */
    private _requestShow(delay: number): void {
        this._syncDescribedBy();
        this._coordinator.show(this._handle, delay, this._config.sequenceDelay);
    }

    /** @hidden Effective show delay: the `fdTooltipShowDelay` input, or the configured default. */
    private _showDelay(): number {
        return this.fdTooltipShowDelay() ?? this._config.showDelay;
    }

    /** @hidden Effective hide delay: the `fdTooltipHideDelay` input, or the configured default. */
    private _hideDelay(): number {
        return this.fdTooltipHideDelay() ?? this._config.hideDelay;
    }

    /**
     * @hidden
     * Attaches the host listeners for the given trigger and returns their cleanup functions.
     * Both triggers listen to `keydown` for `Ctrl+Alt+I`.
     *
     * `click` trigger:
     * - `click`: toggles the tooltip immediately.
     * - `focusout`: hides the tooltip when focus moves to another element.
     *
     * `hover` trigger:
     * - `pointerenter` / `pointerleave` (mouse and pen only): show / hide with delay.
     * - `focusin` / `focusout`: show on keyboard focus, hide when focus leaves the host.
     * - `click` and `Enter`: hide immediately, because the host action was triggered.
     * - `touchstart` / `touchmove` / `touchend` / `touchcancel`: detect a long-press.
     */
    private _listenToHost(trigger: TooltipTrigger): (() => void)[] {
        const host = this._host;
        const keydown = this._renderer.listen(host, 'keydown', (event: KeyboardEvent) =>
            this._onKeydown(event, trigger)
        );

        if (trigger === 'click') {
            return [
                keydown,
                this._renderer.listen(host, 'click', () => this._toggle()),
                this._renderer.listen(host, 'focusout', (event: FocusEvent) => {
                    const target = event.relatedTarget as Node | null;
                    // Clicking the tooltip text moves focus nowhere, so the tooltip stays open for text selection.
                    if (target && !host.contains(target)) {
                        this.hide();
                    }
                })
            ];
        }

        const stopLongPress = (): void => this._clearLongPress();

        return [
            keydown,
            this._renderer.listen(host, 'pointerenter', (event: PointerEvent) => {
                if (event.pointerType !== 'touch') {
                    this._requestShow(this._showDelay());
                }
            }),
            this._renderer.listen(host, 'pointerleave', (event: PointerEvent) => {
                if (event.pointerType !== 'touch') {
                    this._coordinator.hide(this._handle, this._hideDelay());
                }
            }),
            this._renderer.listen(host, 'focusin', (event: FocusEvent) => this._onFocusIn(event)),
            this._renderer.listen(host, 'focusout', (event: FocusEvent) => {
                if (!host.contains(event.relatedTarget as Node | null)) {
                    this._coordinator.hide(this._handle, this._hideDelay());
                }
            }),
            this._renderer.listen(host, 'click', () => this.hide()),
            this._renderer.listen(host, 'touchstart', () => this._startLongPress(), { passive: true }),
            this._renderer.listen(host, 'touchmove', stopLongPress, { passive: true }),
            this._renderer.listen(host, 'touchend', stopLongPress),
            this._renderer.listen(host, 'touchcancel', stopLongPress)
        ];
    }

    /**
     * @hidden
     * Shows the tooltip when the host receives keyboard focus. Ignores focus moving between elements
     * inside the host, focus caused by a mouse click or touch, and focus restored by the browser when
     * the window is activated again.
     */
    private _onFocusIn(event: FocusEvent): void {
        if (this._host.contains(event.relatedTarget as Node | null)) {
            return;
        }
        if (this._coordinator.isWindowRefocus() || this._inputModality.mostRecentModality !== 'keyboard') {
            return;
        }
        this._requestShow(this._showDelay());
    }

    /**
     * @hidden
     * Handles keyboard input on the host: `Ctrl+Alt+I` toggles the tooltip without delay. With the `hover`
     * trigger, `Enter` hides the tooltip because it triggers the host action; with the `click` trigger,
     * `Enter` already toggles it through the resulting `click` event.
     */
    private _onKeydown(event: KeyboardEvent, trigger: TooltipTrigger): void {
        if (event.ctrlKey && event.altKey && event.code === 'KeyI') {
            event.preventDefault();
            this._toggle();
            return;
        }
        if (trigger === 'hover' && KeyUtil.isKeyCode(event, ENTER)) {
            this.hide();
        }
    }

    /** @hidden Shows the tooltip immediately if it is hidden, hides it otherwise. */
    private _toggle(): void {
        if (this._popoverService.isOpen()) {
            this.hide();
        } else {
            this.show();
        }
    }

    /**
     * @hidden
     * Starts the long-press detection on touch. When the touch is held for `LONG_PRESS_DURATION`,
     * the tooltip shows immediately. Skipped on links so the native link context menu keeps working.
     */
    private _startLongPress(): void {
        this._clearLongPress();
        if (this._host.matches('a[href]')) {
            return;
        }
        this._longPressTimer = setTimeout(() => {
            this._longPressTimer = null;
            this._requestShow(0);
        }, LONG_PRESS_DURATION);
    }

    /** @hidden Cancels the long-press detection, e.g. when the touch ends early or moves. */
    private _clearLongPress(): void {
        if (this._longPressTimer !== null) {
            clearTimeout(this._longPressTimer);
            this._longPressTimer = null;
        }
    }

    /**
     * @hidden
     * Passes the host size to the tooltip styles, so that with `start`/`end` alignment
     * the arrow points at the centre of the host instead of a fixed icon-button offset.
     */
    private _setHostSize(body: HTMLElement): void {
        const { width, height } = this._host.getBoundingClientRect();
        this._renderer.setStyle(body, '--fdTooltip_Host_Width', `${width}px`, RendererStyleFlags2.DashCase);
        this._renderer.setStyle(body, '--fdTooltip_Host_Height', `${height}px`, RendererStyleFlags2.DashCase);
    }

    /**
     * @hidden
     * Attaches pointer listeners to the opened overlay, so the tooltip stays open while hovered
     * (e.g. to select its text) and hides after the hide delay when the pointer leaves it.
     * Not used with the `click` trigger, where the pointer position does not close the tooltip.
     */
    private _listenToBody(body: HTMLElement): void {
        this._removeBodyListeners();
        if (this.fdTooltipTrigger() === 'click') {
            return;
        }
        this._bodyListeners = [
            this._renderer.listen(body, 'pointerenter', () => this._coordinator.cancelHide(this._handle)),
            this._renderer.listen(body, 'pointerleave', () => this._coordinator.hide(this._handle, this._hideDelay()))
        ];
    }

    /** @hidden Removes the pointer listeners from the overlay. */
    private _removeBodyListeners(): void {
        this._bodyListeners.forEach((unlisten) => unlisten());
        this._bodyListeners = [];
    }

    /**
     * @hidden
     * Applies the ARIA state to the host:
     * - fills the hidden description element with the text or the rendered template, or removes it,
     * - adds or removes this tooltip's id in `aria-describedby`,
     * - sets or removes `aria-keyshortcuts`.
     * Empty text, no template and `null` shortcuts remove everything this directive added.
     */
    private _updateAria(text: string, template: TemplateRef<unknown> | null, keyShortcuts: string | null): void {
        this._descriptionView?.destroy();
        this._descriptionView = null;

        if (text || template) {
            this._descriptionElement ??= this._createDescriptionElement();
            this._descriptionElement.textContent = template ? '' : text;
            if (template) {
                this._renderDescriptionTemplate(this._descriptionElement, template);
            }
        } else if (this._descriptionElement) {
            this._renderer.removeChild(this._document.body, this._descriptionElement);
            this._descriptionElement = null;
        }

        this._syncDescribedBy();

        if (keyShortcuts) {
            this._renderer.setAttribute(this._host, 'aria-keyshortcuts', keyShortcuts);
        } else if (this._keyShortcutsApplied) {
            this._renderer.removeAttribute(this._host, 'aria-keyshortcuts');
        }
        this._keyShortcutsApplied = !!keyShortcuts;
    }

    /**
     * @hidden
     * Renders the template into the hidden description element, so screen readers announce the same
     * content as shown in the tooltip. The view is attached to the application, so it stays up to date.
     */
    private _renderDescriptionTemplate(element: HTMLElement, template: TemplateRef<unknown>): void {
        const view = template.createEmbeddedView(null);
        this._appRef.attachView(view);
        view.detectChanges();
        view.rootNodes.forEach((node) => this._renderer.appendChild(element, node));
        this._descriptionView = view;
    }

    /**
     * @hidden
     * Creates the hidden description element in `document.body`. It lives outside the host so the host's
     * DOM and accessible name stay untouched; hidden content is still announced when referenced by
     * `aria-describedby`.
     */
    private _createDescriptionElement(): HTMLElement {
        const element: HTMLElement = this._renderer.createElement('span');
        this._renderer.setAttribute(element, 'id', this._descriptionId);
        this._renderer.setAttribute(element, 'hidden', '');
        this._renderer.appendChild(this._document.body, element);
        return element;
    }

    /**
     * @hidden
     * Adds this tooltip's description id to the host's `aria-describedby` only when the description
     * differs from the host's accessible name, so screen readers do not announce the same text twice.
     * Ids added by others are always kept.
     */
    private _syncDescribedBy(): void {
        const ids = (this._host.getAttribute('aria-describedby') ?? '')
            .split(/\s+/)
            .filter((id) => id && id !== this._descriptionId);
        const description = this._descriptionElement?.textContent ?? '';

        if (description && normalizeText(description) !== normalizeText(this._accessibleName())) {
            ids.push(this._descriptionId);
        }

        if (ids.length) {
            this._renderer.setAttribute(this._host, 'aria-describedby', ids.join(' '));
        } else {
            this._renderer.removeAttribute(this._host, 'aria-describedby');
        }
    }

    /**
     * @hidden
     * Approximates the host's accessible name for the duplicate-announcement check, using the first
     * available source: `aria-labelledby`, `aria-label`, associated `<label>` elements, text content.
     */
    private _accessibleName(): string {
        const host = this._host;
        const labelledBy = host.getAttribute('aria-labelledby');
        if (labelledBy) {
            return labelledBy
                .split(/\s+/)
                .map((id) => this._document.getElementById(id)?.textContent ?? '')
                .join(' ');
        }

        const ariaLabel = host.getAttribute('aria-label');
        if (ariaLabel) {
            return ariaLabel;
        }

        const labels = (host as Partial<HTMLInputElement>).labels;
        if (labels?.length) {
            return Array.from(labels, (label) => label.textContent ?? '').join(' ');
        }

        return host.textContent ?? '';
    }
}
