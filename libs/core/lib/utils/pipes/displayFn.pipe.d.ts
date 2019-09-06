import { PipeTransform } from '@angular/core';
export declare class DisplayFnPipe implements PipeTransform {
    transform(value: any, displayFn: Function): string;
}
