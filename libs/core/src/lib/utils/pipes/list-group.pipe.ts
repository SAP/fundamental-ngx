import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'listGroupPipe'
})

export class ListGroupPipe implements PipeTransform {

    transform(items: any[], group: Function): any {
        return group(items);
    }

}
