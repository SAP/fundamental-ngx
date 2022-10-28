import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ratingStarLabel' })
export class RatingStarLabelPipe implements PipeTransform {
    /** Transforms the value to a rating value string. */
    transform(index: number, controlsCount: number, useHalves: boolean): string {
        if (useHalves) {
            return `${index / 2 + 0.5} of ${controlsCount / 2}`;
        }
        return `${index + 1} of ${controlsCount}`;
    }
}
