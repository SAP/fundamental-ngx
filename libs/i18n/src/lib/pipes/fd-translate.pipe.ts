import { Pipe, PipeTransform } from '@angular/core';
import { FdLanguageKeyArgs } from '../models/lang';
import { resolveTranslationSignal } from '../utils';

@Pipe({
    name: 'fdTranslate',
    pure: false, // required to update the value when the observable is resolved
    standalone: true
})
export class FdTranslatePipe implements PipeTransform {
    /** @hidden */
    private resolveTranslationSignal = resolveTranslationSignal();

    /** Translate a key with arguments and, optionally, default value */
    transform(key: string, args?: FdLanguageKeyArgs | Record<string, any>, defaultValue = ''): string {
        const translationSignal = this.resolveTranslationSignal(key, args);
        return translationSignal() || defaultValue;
    }
}
