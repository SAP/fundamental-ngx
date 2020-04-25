import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'displayFnPipe'
})
export class DisplayFnPipe implements PipeTransform {
    transform(value: any, displayFn: Function): string {
        return displayFn(value);
    }
}
