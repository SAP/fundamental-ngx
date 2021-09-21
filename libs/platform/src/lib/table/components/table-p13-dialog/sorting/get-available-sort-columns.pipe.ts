import { Pipe, PipeTransform } from '@angular/core';
import { SortDialogColumn, SortRule } from './sorting.component';

@Pipe({ name: 'getAvailableSortColumns', pure: false })
export class GetAvailableSortColumnsPipe implements PipeTransform {

    transform(columns: SortDialogColumn[], rules: SortRule[], currentKey: string): SortDialogColumn[] {
        const usedKeys = new Set(rules.map((r) => r.columnKey));
        return columns.filter((c) => !usedKeys.has(c.key) || currentKey === c.key);
    }
}
