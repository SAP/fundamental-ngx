import { Pipe, PipeTransform } from '@angular/core';

export type GroupFunction<T = any> = (items: T[]) => { [key: string]: T[] };

@Pipe({
    name: 'listGroupPipe'
})
export class ListGroupPipe<T = any> implements PipeTransform {
    transform(items: any[], group: GroupFunction<T>): any {
        return group(items);
    }
}
