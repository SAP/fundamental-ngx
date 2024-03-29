import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'displayFnPipe',
    standalone: true
})
export class DisplayFnPipe implements PipeTransform {
    /** Transform value with display function. */
    transform(value: any, displayFn: any, ...args: any): string {
        return displayFn(value, ...args);
    }
}
