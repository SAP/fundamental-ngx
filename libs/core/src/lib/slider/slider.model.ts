export enum SliderValueTargets {
    SINGLE_SLIDER,
    RANGE_SLIDER1,
    RANGE_SLIDER2
}

export enum SliderRangeHandles {
    First,
    Second
}

export interface SliderTickMark {
    value: number | string;
    label: string;
    position?: number;
}

export type SliderCustomValue = Omit<SliderTickMark, 'position'>;

export type SliderControlValue = number | number[] | SliderTickMark | SliderTickMark[];
