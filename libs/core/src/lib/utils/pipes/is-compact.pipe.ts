import { Pipe, PipeTransform } from '@angular/core';
import { ContentDensity } from './../services/content-density.service';
import { isCompactDensity } from './../functions/is-compact-density';

@Pipe({ name: 'isCompactDensity' })
export class IsCompactDensityPipe implements PipeTransform {
    transform(size: ContentDensity): boolean {
        return isCompactDensity(size);
    }
}
