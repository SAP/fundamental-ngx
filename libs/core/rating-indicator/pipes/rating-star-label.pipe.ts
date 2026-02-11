import { Pipe, PipeTransform } from '@angular/core';
import { FdLanguage, TranslationResolver } from '@fundamental-ngx/i18n';

@Pipe({
    name: 'ratingStarLabel'
})
export class RatingStarLabelPipe implements PipeTransform {
    /** @hidden */
    private readonly _translationResolver = new TranslationResolver();

    /** Transforms the value to a rating value string. */
    transform(index: number, controlsCount: number, useHalves: boolean, currentLanguage: FdLanguage): string {
        const ofTranslation = this._translationResolver.resolve(currentLanguage, 'coreRatingIndicator.ariaLabelValue');

        if (useHalves) {
            return `${index / 2 + 0.5} ${ofTranslation} ${controlsCount / 2}`;
        }
        return `${index + 1} ${ofTranslation} ${controlsCount}`;
    }
}
