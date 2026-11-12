import { DOCUMENT } from '@angular/common';
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
import { fromEvent, Subject, takeUntil } from 'rxjs';
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
        '(mousedown)': 'onPointerDown($event)'
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
    private readonly _document = inject(DOCUMENT);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _dragStop = new Subject<void>();

    /** @hidden host keydown handler. Matches on event.key (tests dispatch key only). */
    protected onKeydown(event: KeyboardEvent): void {
        if (this.disabled()) {
            return;
        }
        const key = event.key;

        if (key === 'Home' || key === 'End' || key === 'Enter') {
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

    /** @hidden host mousedown handler — starts a drag. */
    protected onPointerDown(event: MouseEvent): void {
        if (this.disabled()) {
            return;
        }
        // Focus the host before preventDefault so keyboard nav works immediately after drag.
        // event.preventDefault() blocks the browser's native focus-on-click, so we do it explicitly.
        this._elementRef.nativeElement.focus({ preventScroll: true });
        event.preventDefault();
        const horizontal = this.orientation() === 'horizontal';
        let last = horizontal ? event.clientY : event.clientX;
        const growthSign = this._pointerGrowthSign();

        this.resizeStart.emit();
        this._dragStop = new Subject<void>();

        fromEvent<MouseEvent>(this._document, 'mousemove')
            .pipe(takeUntil(this._dragStop), takeUntilDestroyed(this._destroyRef))
            .subscribe((e) => {
                const pos = horizontal ? e.clientY : e.clientX;
                const delta = (pos - last) * growthSign;
                last = pos;
                this._setSize(this.size() + delta);
            });

        fromEvent(this._document, 'mouseup')
            .pipe(takeUntil(this._dragStop), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                this._dragStop.next();
                this._dragStop.complete();
                this.resizeEnd.emit();
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
