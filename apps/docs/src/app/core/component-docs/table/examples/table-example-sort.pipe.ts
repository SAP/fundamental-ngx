import { Pipe, PipeTransform } from '@angular/core';

type columnSortType = (a: any, b: any) => boolean;
const sort = (a, b, firstComparer: columnSortType, secondComparer: columnSortType) => {
    if (firstComparer(a.column1, b.column1)) {
        return -1;
    } else if (secondComparer(a.column1, b.column1)) {
        return 1;
    } else {
        return 0;
    }
};

const asc: columnSortType = (a, b) => a < b;
const desc: columnSortType = (a, b) => a > b;

const sortMethod = {
    asc: (a, b) => sort(a, b, asc, desc),
    desc: (a, b) => sort(a, b, desc, asc)
};

@Pipe({ name: 'sortTableBy', pure: false })
export class SortTableByPipe implements PipeTransform {
    transform(tableRows: any[], sortDir: string): any[] {
        return tableRows.sort(sortMethod[sortDir]);
    }
}
