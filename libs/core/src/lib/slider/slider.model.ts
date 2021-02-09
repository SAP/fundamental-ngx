export enum SliderValueTargets {
    SINGLE_SLIDER,
    RANGE_SLIDER1,
    RANGE_SLIDER2
}

export enum RangeHandles {
    First,
    Second
}

export interface SliderTickMark {
    value: number | string;
    label: string;
    position?: number;
}

export type CustomValue = Omit<SliderTickMark, 'position'>;

export type ControlValue = number | number[] | SliderTickMark | SliderTickMark[];
