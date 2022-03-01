import { InjectionToken } from '@angular/core';
import { GetElementCapacityFn, GetElementWidthFn } from './utils.types';

export const GetComputedStyle = new InjectionToken('window.getComputedStyle, but does not depend directly on window');
export const GetElementWidth = new InjectionToken<GetElementWidthFn>('Gives element width from computed style');
export const GetElementCapacity = new InjectionToken<GetElementCapacityFn>(
    'Gives element inner width, excluding paddings'
);
