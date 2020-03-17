import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'groupByPipe'
})

export class GroupByPipe implements PipeTransform {

    transform(items: [], groupBy: string): any {
        return items.reduce(
            (result, item) => ({
                ...result,
                [item[groupBy]]: [
                    ...(result[item[groupBy]] || []),
                    item,
                ],
            }),
            {},
        );
    }
}
