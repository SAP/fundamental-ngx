import { Pipe, PipeTransform } from '@angular/core';
import { Nullable } from '../models/nullable';

@Pipe({
    name: 'fdFilterStrings'
})
export class FilterStringsPipe implements PipeTransform {
    /**
     * Performs filtering.
     * @param values Array of items.
     * @param params Search parameters.
     */
    transform(values: any[] = [], params: { searchTerm: Nullable<string>; key: string }): any[] {
        if (!params.searchTerm) {
            return values;
        }
        if (params.key) {
            values = values.filter((item) =>
                item[params.key].toLocaleLowerCase().includes(params.searchTerm?.toLocaleLowerCase())
            );
        } else {
            values = values.filter((item) => item.toLocaleLowerCase().includes(params.searchTerm?.toLocaleLowerCase()));
        }
        return values;
    }
}
