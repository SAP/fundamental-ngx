import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {
    transform(values: any[] = [], searchTerm: string = '', key: string): any[] {
        if (!searchTerm) {
            return values;
        }
        if (key) {
            values = values.filter(item => item[key].toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
        } else {
            values = values.filter(item => item.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
        }
        return values;
    }
}
