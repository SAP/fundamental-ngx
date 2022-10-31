import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

export type GroupFunction<T = any> = (items: T[]) => { [key: string]: T[] };

@Pipe({
    name: 'listGroupPipe'
})
export class ListGroupPipe<T = any> implements PipeTransform {
    /** Group items */
    transform(items: any[], group: GroupFunction<T>): KeyValue<string, T[]>[] {
        return Object.entries(group(items)).map(([key, value]) => ({ key, value }));
    }
}
