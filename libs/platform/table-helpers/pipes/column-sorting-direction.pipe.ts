import { Pipe, PipeTransform } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { SortDirection } from '../enums';
import { CollectionSort } from '../interfaces';

export const ARIA_SORT: Record<`${SortDirection}`, string> = {
    none: 'none',
    asc: 'ascending',
    desc: 'descending'
};

@Pipe({
    pure: true,
    standalone: true,
    name: 'fdpTableColumnSortingDirection'
})
export class TableColumnSortingDirectionPipe implements PipeTransform {
    /** @hidden */
    transform(sorting: Nullable<CollectionSort>): string {
        if (!sorting) {
            return 'none';
        }

        return ARIA_SORT[sorting.direction];
    }
}
