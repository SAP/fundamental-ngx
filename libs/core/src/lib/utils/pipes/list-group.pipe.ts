import { Pipe, PipeTransform } from '@angular/core';

export type GroupFunction = (any) => {key: any, value: any[]}[];

@Pipe({
    name: 'listGroupPipe'
})
export class ListGroupPipe implements PipeTransform {

    transform(items: any[], group: GroupFunction): any {
        return group(items);
    }

}
