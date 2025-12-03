import { Routes } from '@angular/router';
import { RangeSliderHeader } from './header/range-slider-header';
import { RangeSliderDocs } from './range-slider-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: RangeSliderHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: RangeSliderDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'range-slider';
export const API_FILE_KEY = 'rangeSlider';
