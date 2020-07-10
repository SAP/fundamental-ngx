import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterTableBy', pure: false })
export class FilterTableByPipe implements PipeTransform {
    transform(tableRows: any[], searchTerm: string): any[] {
        const searchLower = searchTerm.toLocaleLowerCase();
        return tableRows.filter((item) => {
            if (item) {
                return item.column1.toLocaleLowerCase().includes(searchLower);
            }
        });
    }
}

