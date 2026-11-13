import {
    booleanAttribute,
    computed,
    DestroyRef,
    Directive,
    ElementRef,
    inject,
    input,
    model,
    numberAttribute,
    output
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, merge, Subject, takeUntil } from 'rxjs';
import { RtlService } from '../../services/rtl.service';

/** Orientation of the splitter bar. `vertical` resizes a horizontal (width) dimension. */
export type FdkSplitterOrientation = 'vertical' | 'horizontal';

/** Which logical direction of pointer movement increases the size. */
export type FdkSplitterGrows = 'start' | 'end';

/**
 * Turns the host element into an accessible resize separator for a single axis.
 * Owns behaviour + ARIA only; carries no visual styling and no knowledge of any consumer.
 */
@Directive({
    selector: '[fdkSplitter]',
    host: {
        role: 'separator',
        '[attr.aria-orientation]': 'orientation()',
        '[attr.aria-valuenow]': 'roundedSize()',
        '[attr.aria-valuemin]': 'min()',
        '[attr.aria-valuemax]': 'resolvedMax()',
        '[attr.tabindex]': 'disabled() ? -1 : 0',
        '[attr.aria-disabled]': 'disabled() || null',
        '(keydown)': 'onKeydown($event)',
        '(pointerdown)': 'onPointerDown($event)'
    }
})
export class SplitterDirective {
    /** Orientation of the bar. `vertical` (default) resizes width; `horizontal` resizes height. */
    readonly orientation = input<FdkSplitterOrientation>('vertical');

    /** Current size in px. Two-way: emits `sizeChange` after each drag/keyboard step. */
    readonly size = model<number>(0);

    /** Minimum size in px. */
    readonly min = input<number>(0);

    /** Maximum size in px. */
    readonly max = input<number>(Infinity);

    /** Arrow-key step in px. */
    readonly step = input<number>(10);

    /** Shift+arrow / PageUp-PageDown step in px. */
    readonly largeStep = input<number>(100);

    /**
     * Size (px) the Enter key restores. Defaults to the midpoint of min/max when unset.
     * Enter is a no-op when the size is unbounded (`max` is Infinity) and no `defaultSize` is set.
     */
    readonly defaultSize = input<number | undefined, unknown>(undefined, { transform: numberAttribute });

    /** Logical pointer direction that increases size. `end` = toward the block/inline end. */
    readonly grows = input<FdkSplitterGrows>('end');

    /** Disables all interaction. */
    readonly disabled = input(false, { transform: booleanAttribute });

    /** Emitted when a drag begins. */
    readonly resizeStart = output<void>();

    /** Emitted when a drag ends. */
    readonly resizeEnd = output<void>();

    /** @hidden aria-valuenow must be an integer. */
    protected readonly roundedSize = computed(() => Math.round(this.size()));

    /** @hidden Omit aria-valuemax when unbounded. */
    protected readonly resolvedMax = computed(() => (this.max() === Infinity ? null : this.max()));

    /** @hidden */
    private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    /** @hidden */
    private readonly _rtl = inject(RtlService, { optional: true });

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _dragStop = new Subject<void>();

    /** @hidden host keydown handler. Matches on event.key (tests dispatch key only). */
    protected onKeydown(event: KeyboardEvent): void {
        if (this.disabled()) {
            return;
        }
        const key = event.key;

        if (key === 'Home' || key === 'End' || key === 'Enter') {
            // WAI-ARIA 1.2 separator role: Home = maximum value, End = minimum value.
            // This is intentionally reversed from the usual "Home = start/min" convention.
            const target =
                key === 'Home'
                    ? this.max()
                    : key === 'End'
                      ? this.min()
                      : (this.defaultSize() ?? (this.min() + this.max()) / 2);
            if (!Number.isFinite(target)) {
                return;
            }
            event.preventDefault();
            this.resizeStart.emit();
            this._setSize(target);
            this.resizeEnd.emit();
            return;
        }

        const growthDir = this._keyGrowthDir(key);
        if (growthDir === 0) {
            return;
        }
        const isLarge = event.shiftKey || key === 'PageUp' || key === 'PageDown';
        event.preventDefault();
        this.resizeStart.emit();
        this._setSize(this.size() + growthDir * (isLarge ? this.largeStep() : this.step()));
        this.resizeEnd.emit();
    }

    /** @hidden host pointerdown handler — starts a drag; supports mouse, touch, and stylus. */
    protected onPointerDown(event: PointerEvent): void {
        if (this.disabled()) {
            return;
        }
        // Focus the host before preventDefault so keyboard nav works immediately after drag.
        // event.preventDefault() blocks the browser's native focus-on-click, so we do it explicitly.
        this._elementRef.nativeElement.focus({ preventScroll: true });
        event.preventDefault();
        // Cancel any in-progress drag before starting a new one.
        this._dragStop.next();
        // Pointer capture routes subsequent pointermove/up/cancel to this element regardless
        // of where the pointer moves, eliminating document-level listeners.
        this._elementRef.nativeElement.setPointerCapture?.(event.pointerId);
        const horizontal = this.orientation() === 'horizontal';
        let last = horizontal ? event.clientY : event.clientX;
        const growthSign = this._pointerGrowthSign();
        const el = this._elementRef.nativeElement;

        this.resizeStart.emit();

        merge(
            fromEvent<PointerEvent>(el, 'pointermove'),
            fromEvent<PointerEvent>(el, 'pointerup'),
            fromEvent<PointerEvent>(el, 'pointercancel')
        )
            .pipe(takeUntil(this._dragStop), takeUntilDestroyed(this._destroyRef))
            .subscribe((e) => {
                if (e.type !== 'pointermove') {
                    this._dragStop.next();
                    this.resizeEnd.emit();
                    return;
                }
                const pos = horizontal ? e.clientY : e.clientX;
                const delta = (pos - last) * growthSign;
                last = pos;
                this._setSize(this.size() + delta);
            });
    }

    /** @hidden Clamp and set, skipping no-op updates. */
    private _setSize(next: number): void {
        const clamped = Math.min(this.max(), Math.max(this.min(), next));
        if (clamped !== this.size()) {
            this.size.set(clamped);
        }
    }

    /** @hidden +1 / -1 growth direction for a keyboard key, 0 for unrecognised keys. */
    private _keyGrowthDir(key: string): number {
        if (key === 'PageUp') {
            return 1;
        }
        if (key === 'PageDown') {
            return -1;
        }
        const s = this._pointerGrowthSign();
        if (this.orientation() === 'vertical') {
            if (key === 'ArrowRight') {
                return s;
            }
            if (key === 'ArrowLeft') {
                return -s;
            }
        } else {
            if (key === 'ArrowDown') {
                return s;
            }
            if (key === 'ArrowUp') {
                return -s;
            }
        }
        return 0;
    }

    /** @hidden +1 if increasing clientX/Y should increase size, else -1. */
    private _pointerGrowthSign(): number {
        if (this.orientation() === 'horizontal') {
            return this.grows() === 'end' ? 1 : -1;
        }
        const rtl = !!this._rtl?.rtl();
        const endIsPositiveX = !rtl;
        const growEnd = this.grows() === 'end';
        return (growEnd ? endIsPositiveX : !endIsPositiveX) ? 1 : -1;
    }
}
