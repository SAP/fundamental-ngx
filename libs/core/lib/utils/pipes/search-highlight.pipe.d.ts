import { PipeTransform } from '@angular/core';
export declare class SearchHighlightPipe implements PipeTransform {
    transform(value: string, args: string, active?: boolean): string;
}
