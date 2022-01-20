import { Pipe, PipeTransform } from '@angular/core';
import { ContentDensity } from '@fundamental-ngx/core/utils';

@Pipe({ name: 'cozyCompactSize' })
export class CozyCompactSizePipe implements PipeTransform {
    transform(size: ContentDensity): ContentDensity {
        return size !== 'cozy' ? 'compact' : 'cozy';
    }
}
