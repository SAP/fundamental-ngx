import { Nullable } from '@fundamental-ngx/core/shared';

/**
 * Utility type, that allows to track and select ranges of elements while using multi-selection.
 *
 * @usage
 * Imagine we have a simple list of checkboxes:
 * ```html
 * <input
 *  #checkboxInput
 *  *ngFor="let o of options; let idx = index"
 *  type="checkbox"
 *  [checked]="selectionModel.checked(o)"
 *  (click)="toggle(idx, $event)"
 *  >
 * ```
 * With the given layout the logic should be as follows:
 * ```typescript
 * export class YourComponent {
 *  options = ['a', 'b', 'c'];
 *  readonly selectionModel = new SelectionModel(true);
 *
 *  private readonly _rangeSelector = new RangeSelector();
 *
 *
 *  toggle(idx: number, event: PointerEvent): void {
 *      // getting the toggled value of the checkbox
 *      const toggledSelection = event.target.value;
 *
 *      // registering the selection of current checkbox
 *      this._rangeSelector.onRangeElementToggled(idx, event);
 *
 *      // Apply value to each element in range.
 *      // If checkbox was toggled without shift pressed or without previously selected one,
 *      // this method will select only it.
 *      this._rangeSelector.applyValueToEachInRange(idx => {
 *          if (toggledSelection) {
 *              this.selectionModel.select(options[idx]);
 *          } else {
 *              this.selectionModel.deselect(options[idx]);
 *          }
 *      });
 *  }
 * }
 * ```
 */
export class RangeSelector {
    /** @hidden */
    private _previousSelectedIndex: number | null = null;
    /** @hidden */
    private _state: RangeSelectionState | null;

    /**
     * Last registered selection state (either multiple or single).
     * Is updated on each `onRangeElementClicked` invokation. Will be `null` initially or once `reset()` is called.
     */
    get lastRangeSelectionState(): RangeSelectionState | null {
        return this._state ? { ...this._state } : null;
    }

    /**
     * The method that should be used to register each checkbox toggle.
     * Accepts two arguments: `index` and `event`. If none provided, will reset existing state.
     * Otherwise will register current index as last checked.
     *
     * If toggling was done with "shift" pressed and there's a previously registered index, will register a range selection.
     * At the same time if checkbox was toggled without shift pressed or without previously selected one, this method will select only it.
     *
     * After calling this method it's recommended to use `applyValueToEachInRange` to actually toggle each checkbox in range.
     *
     * See usage example on this class itself.
     */
    onRangeElementToggled(index?: number, event?: KeyboardEvent | MouseEvent | TouchEvent): RangeSelectionState | null {
        if (
            this._isNonNegativeInteger(this._previousSelectedIndex) &&
            this._isNonNegativeInteger(index) &&
            event?.shiftKey
        ) {
            this._state = {
                isRangeSelection: true,
                from: Math.min(this._previousSelectedIndex, index),
                to: Math.max(this._previousSelectedIndex, index)
            };
            this._previousSelectedIndex = index;
        } else if (this._isNonNegativeInteger(index)) {
            this._state = { isRangeSelection: false, from: index, to: index };
            this._previousSelectedIndex = index;
        } else {
            this.reset();
        }

        return this.lastRangeSelectionState;
    }

    /**
     * Allows to apply selection to each item in selection range.
     * Accepts a function to apply selection to each item by registered index.
     *
     * See usage example on this class itself.
     */
    applyValueToEachInRange(selectionMethod: (index: number) => void): void {
        const state = this.lastRangeSelectionState;

        if (this._isNonNegativeInteger(state?.from) && this._isNonNegativeInteger(state?.to)) {
            for (let index = state!.from; index <= state!.to; index++) {
                selectionMethod(index);
            }
        }
    }

    /** Resets selection state. Useful when the list of selectable items is changed (e.g. by filtering, sorting, page change) */
    reset(): void {
        this._state = null;
        this._previousSelectedIndex = null;
    }

    /** @hidden */
    private _isNonNegativeInteger(num: Nullable<number>): num is number {
        return Number.isInteger(num) && num! >= 0;
    }
}

export interface RangeSelectionState {
    isRangeSelection: boolean;
    from: number;
    to: number;
}
