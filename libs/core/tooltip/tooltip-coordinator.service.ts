import { ESCAPE } from '@angular/cdk/keycodes';
import { isPlatformBrowser } from '@angular/common';
import { DestroyRef, DOCUMENT, inject, PLATFORM_ID, Service } from '@angular/core';
import { KeyUtil } from '@fundamental-ngx/cdk/utils';

/**
 * @hidden
 * Minimal contract the coordinator needs from a tooltip instance.
 * The coordinator only decides *when* a tooltip is shown or hidden; the tooltip decides *how* (overlay rendering).
 */
export interface TooltipHandle {
    /** Whether the tooltip overlay is currently open. Can become `false` on its own, e.g. after an outside click. */
    isOpen(): boolean;
    /** Opens the tooltip overlay right away, without any delay. */
    open(): void;
    /** Closes the tooltip overlay right away, without any delay. */
    close(): void;
}

/**
 * Application-wide service that decides when tooltips are shown and hidden.
 *
 * - Guarantees that at most one tooltip is visible at any time.
 * - Owns the show, hide and sequence delay timers, so timing is consistent across all tooltips.
 * - Listens globally for `Escape`, window blur and tab switching to dismiss the open tooltip.
 *
 * Tooltips request showing and hiding through `show()` and `hide()`; they never open their overlay on their own.
 */
@Service()
export class TooltipCoordinator {
    /**
     * @hidden
     * Tooltip that was opened last. Its overlay may already be closed (e.g. by an outside click),
     * so check `isOpen()` before treating it as visible.
     */
    private _active: TooltipHandle | null = null;

    /** @hidden Tooltip waiting for its show delay to elapse. Only one tooltip can be pending at a time. */
    private _pending: TooltipHandle | null = null;

    /** @hidden Timer that opens the pending tooltip once its show or sequence delay elapses. */
    private _showTimer: ReturnType<typeof setTimeout> | null = null;

    /** @hidden Timer that closes the active tooltip once its hide delay elapses. */
    private _hideTimer: ReturnType<typeof setTimeout> | null = null;

    /**
     * @hidden
     * `true` only during the task in which the browser window or tab was activated again.
     * Lets tooltips ignore the focus event the browser then fires on the previously focused element.
     */
    private _windowRefocused = false;

    /** @hidden Whether the `Escape` listener is currently attached to the document. */
    private _listeningToKeydown = false;

    /** @hidden Document the global listeners are attached to. */
    private readonly _document = inject(DOCUMENT);

    /** @hidden Browser window, or `null` on the server, where no global listeners are attached. */
    private readonly _window = isPlatformBrowser(inject(PLATFORM_ID)) ? this._document.defaultView : null;

    /** @hidden Stable reference to the `Escape` handler, so the same listener can be added and removed. */
    private readonly _keydownListener = this._onKeydown.bind(this);

    /**
     * @hidden
     * Registers the window `blur`, window `focus` and `visibilitychange` listeners for the whole application
     * (browser only) and removes them when the root injector is destroyed. These events are rare, so they
     * are always listened to. The frequent `keydown` event is only listened to while a tooltip needs it,
     * see `_syncKeydownListener()`.
     */
    constructor() {
        const win = this._window;
        if (!win) {
            return;
        }

        const onWindowBlur = (): void => this._dismiss();
        const onWindowFocus = (): void => this._onWindowFocus();
        const onVisibilityChange = (): void => {
            if (this._document.visibilityState === 'hidden') {
                this._dismiss();
            }
        };

        this._document.addEventListener('visibilitychange', onVisibilityChange);
        win.addEventListener('blur', onWindowBlur);
        win.addEventListener('focus', onWindowFocus);

        inject(DestroyRef).onDestroy(() => {
            this._clearShowTimer();
            this._clearHideTimer();
            this._document.removeEventListener('keydown', this._keydownListener, true);
            this._document.removeEventListener('visibilitychange', onVisibilityChange);
            win.removeEventListener('blur', onWindowBlur);
            win.removeEventListener('focus', onWindowFocus);
        });
    }

    /**
     * Requests to show a tooltip.
     *
     * - If the tooltip is already visible, it stays open and a scheduled hide is cancelled.
     * - If the tooltip is already waiting for its delay, the running timer is kept.
     * - If another tooltip is visible, that one closes immediately and this one opens after
     *   `sequenceDelay` (or `delay`, if shorter), so moving between elements feels faster.
     * - A `delay` of `0` or less opens the tooltip immediately (keyboard shortcut, long-press, `show()`).
     *
     * @param tooltip Tooltip to show.
     * @param delay Delay in ms before showing when no other tooltip is visible.
     * @param sequenceDelay Delay in ms before showing when another tooltip is visible.
     */
    show(tooltip: TooltipHandle, delay: number, sequenceDelay = delay): void {
        if (this._active === tooltip && tooltip.isOpen()) {
            this._clearHideTimer();
            return;
        }
        if (this._pending === tooltip && delay > 0) {
            return;
        }

        this._clearShowTimer();

        if (this._active?.isOpen()) {
            this._hideActive();
            delay = Math.min(delay, sequenceDelay);
        }

        if (delay <= 0) {
            this._open(tooltip);
            return;
        }

        this._pending = tooltip;
        this._syncKeydownListener();
        this._showTimer = setTimeout(() => {
            this._showTimer = null;
            this._pending = null;
            this._open(tooltip);
        }, delay);
    }

    /**
     * Requests to hide a tooltip.
     *
     * - Cancels the tooltip's pending show, so it does not appear after the pointer or focus has already left.
     * - If the tooltip is visible, closes it after `delay`, or immediately when `delay` is `0` or less.
     * - Does nothing for a tooltip that is neither pending nor visible.
     *
     * @param tooltip Tooltip to hide.
     * @param delay Delay in ms before hiding.
     */
    hide(tooltip: TooltipHandle, delay: number): void {
        if (this._pending === tooltip) {
            this._clearShowTimer();
        }
        if (this._active !== tooltip) {
            return;
        }

        this._clearHideTimer();

        if (delay <= 0) {
            this._hideActive();
            return;
        }

        this._hideTimer = setTimeout(() => {
            this._hideTimer = null;
            this._hideActive();
        }, delay);
    }

    /**
     * Cancels a scheduled hide and keeps the tooltip open.
     * Used when the pointer moves from the host onto the tooltip, so its text can be read or selected.
     *
     * @param tooltip Tooltip to keep open.
     */
    cancelHide(tooltip: TooltipHandle): void {
        if (this._active === tooltip) {
            this._clearHideTimer();
        }
    }

    /**
     * Removes every reference to the tooltip: cancels its pending show and scheduled hide and
     * forgets it as the active tooltip. The overlay is not touched, because it is disposed together
     * with the tooltip. Must be called when the tooltip is destroyed.
     *
     * @param tooltip Tooltip being destroyed.
     */
    unregister(tooltip: TooltipHandle): void {
        if (this._pending === tooltip) {
            this._clearShowTimer();
        }
        if (this._active === tooltip) {
            this._clearHideTimer();
            this._active = null;
            this._syncKeydownListener();
        }
    }

    /**
     * Whether the current focus event was caused by the browser restoring focus after the window
     * or tab was activated again. Tooltips skip showing on such focus events, because the user did
     * not interact with the page.
     */
    isWindowRefocus(): boolean {
        return this._windowRefocused;
    }

    /**
     * @hidden
     * Makes the tooltip the active one and opens it.
     * Closes any other visible tooltip first to keep the single-tooltip guarantee.
     */
    private _open(tooltip: TooltipHandle): void {
        if (this._active !== tooltip) {
            this._hideActive();
        }
        this._active = tooltip;
        this._syncKeydownListener();
        tooltip.open();
    }

    /**
     * @hidden
     * Closes the active tooltip immediately and cancels its scheduled hide.
     * `_active` is reset before `close()` runs, so re-entrant calls see a consistent state.
     */
    private _hideActive(): void {
        this._clearHideTimer();
        const active = this._active;
        this._active = null;
        this._syncKeydownListener();
        active?.close();
    }

    /**
     * @hidden
     * Global `Escape` handler. Always cancels a pending show. If a tooltip is visible, closes it and
     * stops the event, so the first `Escape` only closes the tooltip and not, for example, the surrounding
     * dialog. If no tooltip is visible, the event passes through untouched.
     */
    private _onKeydown(event: KeyboardEvent): void {
        if (!KeyUtil.isKeyCode(event, ESCAPE)) {
            return;
        }

        this._clearShowTimer();

        if (this._active?.isOpen()) {
            event.stopPropagation();
            this._hideActive();
        }
    }

    /**
     * @hidden
     * Closes the active tooltip and cancels a pending show.
     * Called when the window loses focus or the page becomes hidden (tab switch, minimised window).
     */
    private _dismiss(): void {
        this._clearShowTimer();
        this._hideActive();
    }

    /**
     * @hidden
     * Marks the current task as a window re-activation (see `isWindowRefocus()`).
     * The flag is reset in the next task.
     */
    private _onWindowFocus(): void {
        // The element focus event follows the window focus event within the same task.
        this._windowRefocused = true;
        setTimeout(() => (this._windowRefocused = false));
    }

    /** @hidden Cancels the pending show and forgets the pending tooltip. */
    private _clearShowTimer(): void {
        if (this._showTimer !== null) {
            clearTimeout(this._showTimer);
            this._showTimer = null;
        }
        this._pending = null;
        this._syncKeydownListener();
    }

    /** @hidden Cancels the scheduled hide of the active tooltip. */
    private _clearHideTimer(): void {
        if (this._hideTimer !== null) {
            clearTimeout(this._hideTimer);
            this._hideTimer = null;
        }
    }

    /**
     * @hidden
     * Attaches the `Escape` listener while a tooltip is open or pending and removes it otherwise,
     * so key presses do not reach this service (or trigger change detection) when no tooltip is involved.
     * The listener uses the capture phase, so an open tooltip consumes `Escape` before the host
     * (e.g. a dialog) sees it.
     */
    private _syncKeydownListener(): void {
        const needed = !!this._window && (this._active !== null || this._pending !== null);
        if (needed === this._listeningToKeydown) {
            return;
        }

        this._listeningToKeydown = needed;
        if (needed) {
            this._document.addEventListener('keydown', this._keydownListener, true);
        } else {
            this._document.removeEventListener('keydown', this._keydownListener, true);
        }
    }
}
