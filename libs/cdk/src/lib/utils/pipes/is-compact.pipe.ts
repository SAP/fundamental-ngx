import { Pipe, PipeTransform } from '@angular/core';
import { isCompactDensity } from '../functions/is-compact-density';
import { ContentDensity } from '../interfaces/content-density';

@Pipe({ name: 'isCompactDensity', standalone: true })
export class IsCompactDensityPipe implements PipeTransform {
    /** Check if the content density is compact. */
    transform(size: ContentDensity): boolean {
        return isCompactDensity(size);
    }
}
