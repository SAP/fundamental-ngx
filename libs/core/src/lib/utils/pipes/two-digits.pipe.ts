import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'twoDigits'
})
export class TwoDigitsPipe implements PipeTransform {
    /** Transform number to two digits. */
    transform(value: number, enable: boolean = true): string {
        if ((value || value === 0) && enable) {
            return value < 10 ? '0' + value : value.toString();
        } else {
            return String(value);
        }
    }
}
