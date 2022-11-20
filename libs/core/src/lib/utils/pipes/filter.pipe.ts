import { Pipe, PipeTransform } from '@angular/core';
import { Nullable } from '@fundamental-ngx/core/shared';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    /**
     * Performs filtering.
     * @param values Array of items.
     * @param searchTerm Search term to filter by.
     * @param key Key of the item object to check for condition.
     */
    transform(values: any[] = [], searchTerm: Nullable<string> = null, key: string = ''): any[] {
        if (!searchTerm) {
            return values;
        }
        if (key) {
            values = values.filter((item) => item[key].toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
        } else {
            values = values.filter((item) => item.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
        }
        return values;
    }
}
