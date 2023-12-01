import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate',
    standalone: true
})
export class TruncatePipe implements PipeTransform {
    /** Truncate string to given length. */
    transform(value: string, limit: number = 500): string {
        return value && value.length > limit ? value.substring(0, limit) + '...' : value;
    }
}
