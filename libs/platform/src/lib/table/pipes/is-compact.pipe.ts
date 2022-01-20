import { Pipe, PipeTransform } from '@angular/core';
import { ContentDensity } from '@fundamental-ngx/core/utils';

@Pipe({ name: 'isCompactSize' })
export class IsCompactSizePipe implements PipeTransform {
    transform(size: ContentDensity): boolean {
        return size !== 'cozy';
    }
}
