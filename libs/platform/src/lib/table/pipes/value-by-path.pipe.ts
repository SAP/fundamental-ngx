import { Pipe, PipeTransform } from '@angular/core';

import { getNestedValue } from '@fundamental-ngx/platform/shared';

@Pipe({ name: 'valueByPath' })
export class ValueByPathPipe implements PipeTransform {
    transform(value: any, key: string): any {
        return getNestedValue(key, value);
    }
}
