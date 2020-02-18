import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'paginationReverse' })
export class PaginationReversePipe implements PipeTransform {
    transform(value) {
        return value.slice().reverse();
    }
}
