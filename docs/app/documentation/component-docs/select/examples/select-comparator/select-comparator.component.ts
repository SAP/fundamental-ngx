import { Component } from '@angular/core';

@Component({
    selector: 'fd-select-comparator',
    templateUrl: './select-comparator.component.html',
    styleUrls: ['./select-comparator.component.scss']
})
export class SelectComparatorComponent {

    value: string;

    options: any[] = [
        {id: 344654},
        {id: 345673},
        {id: 467543}
    ];

    /** Case insensitive comparison of string value options. */
    customCompareFn(val1: string, val2: string): boolean {
        return val1.toLocaleUpperCase() === val2.toLocaleUpperCase();
    }

}
