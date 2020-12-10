import { Pipe, PipeTransform } from '@angular/core';

import { getNestedValue } from '../../../utils/object';

@Pipe({ name: 'valueByPath' })
export class ValueByPathPipe implements PipeTransform {
    transform(value: any, key: string): any {
        return getNestedValue(key, value);
    }
}
