import { Pipe, PipeTransform } from '@angular/core';
import { ContentDensity } from '../interfaces/content-density';
import { isCompactDensity } from './../functions/is-compact-density';

@Pipe({ name: 'isCompactDensity' })
export class IsCompactDensityPipe implements PipeTransform {
    transform(size: ContentDensity): boolean {
        return isCompactDensity(size);
    }
}
