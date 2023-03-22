import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'lodash-es';

@Pipe({ name: 'valueByPath', standalone: true })
export class ValueByPathPipe implements PipeTransform {
    /** Get value by path. */
    transform(value: any, key: string): any {
        return get(value, key);
    }
}
