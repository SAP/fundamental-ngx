import { RangeSelector } from './range-selector';

// class MockPointerEvent {}

describe('RangeSelector', () => {
    let rangeSelector: RangeSelector;

    function getEvent(shiftKey = false): PointerEvent {
        return new PointerEvent('click', { shiftKey });
    }

    beforeEach(() => {
        global.window.PointerEvent = MouseEvent as any;
        rangeSelector = new RangeSelector();
    });

    it('should be initialised as empty', () => {
        expect(rangeSelector.lastRangeSelectionState).toBe(null);
    });

    it('should register each selection as first, if "shift" is not pressed', () => {
        rangeSelector.onRangeElementToggled(1, getEvent());
        expect(rangeSelector.lastRangeSelectionState).toEqual({ from: 1, to: 1, isRangeSelection: false });
        rangeSelector.onRangeElementToggled(2, getEvent());
        expect(rangeSelector.lastRangeSelectionState).toEqual({ from: 2, to: 2, isRangeSelection: false });
    });

    it('should register range seelction, if "shift" is pressed', () => {
        rangeSelector.onRangeElementToggled(1, getEvent());
        expect(rangeSelector.lastRangeSelectionState).toEqual({ from: 1, to: 1, isRangeSelection: false });
        rangeSelector.onRangeElementToggled(2, getEvent(true));
        expect(rangeSelector.lastRangeSelectionState).toEqual({ from: 1, to: 2, isRangeSelection: true });
        rangeSelector.onRangeElementToggled(5, getEvent(true));
        expect(rangeSelector.lastRangeSelectionState).toEqual({ from: 2, to: 5, isRangeSelection: true });
        rangeSelector.onRangeElementToggled(10, getEvent());
        expect(rangeSelector.lastRangeSelectionState).toEqual({ from: 10, to: 10, isRangeSelection: false });
    });

    it('should apply proper order of "from/to" when second index is less than first', () => {
        rangeSelector.onRangeElementToggled(1, getEvent());
        expect(rangeSelector.lastRangeSelectionState).toEqual({ from: 1, to: 1, isRangeSelection: false });
        rangeSelector.onRangeElementToggled(5, getEvent(true));
        expect(rangeSelector.lastRangeSelectionState).toEqual({ from: 1, to: 5, isRangeSelection: true });
        rangeSelector.onRangeElementToggled(2, getEvent(true));
        expect(rangeSelector.lastRangeSelectionState).toEqual({ from: 2, to: 5, isRangeSelection: true });
    });

    it('should apply value to selected index, when "applyValueToEachInRange" is called without multi-selection', () => {
        const spy = jest.fn();

        rangeSelector.applyValueToEachInRange(spy);
        expect(spy).toHaveBeenCalledTimes(0);

        rangeSelector.onRangeElementToggled(1, getEvent());
        rangeSelector.applyValueToEachInRange(spy);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith(1);
    });

    it('should apply value to each index at range, when "applyValueToEachInRange" is called', () => {
        const spy = jest.fn();

        rangeSelector.applyValueToEachInRange(spy);
        expect(spy).toHaveBeenCalledTimes(0);

        rangeSelector.onRangeElementToggled(1, getEvent());
        rangeSelector.onRangeElementToggled(4, getEvent(true));
        rangeSelector.applyValueToEachInRange(spy);
        expect(spy).toHaveBeenCalledTimes(4);
        expect(spy).toHaveBeenCalledWith(1);
        expect(spy).toHaveBeenCalledWith(2);
        expect(spy).toHaveBeenCalledWith(3);
        expect(spy).toHaveBeenCalledWith(4);
    });

    it('should reset selected range, when "reset" is called', () => {
        rangeSelector.onRangeElementToggled(1, getEvent());
        rangeSelector.onRangeElementToggled(2, getEvent(true));
        expect(rangeSelector.lastRangeSelectionState).toEqual({ from: 1, to: 2, isRangeSelection: true });
        rangeSelector.reset();
        expect(rangeSelector.lastRangeSelectionState).toEqual(null);
    });
});
