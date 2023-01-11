import { BehaviorSubject } from 'rxjs';
import { Optional, Injectable, Inject, InjectionToken } from '@angular/core';

const DefaultRtlLanguages = ['ar', 'arc', 'dv', 'fa', 'ha', 'he', 'khw', 'ks', 'ku', 'ps', 'ur', 'yi'];
export const RTL_LANGUAGE = new InjectionToken<string[]>('RtlLanguage');

@Injectable()
/**
 * Service taking care of RTL trough behavior subject
 * language list is used to determine if rtl should be enabled at start
 * user can overwrite default languages by using injection token RtlLanguageToken
 */
export class RtlService {
    /** RTL value */
    rtl: BehaviorSubject<boolean>;

    /** @hidden */
    constructor(@Optional() @Inject(RTL_LANGUAGE) injectedRtlLanguages: string[]) {
        injectedRtlLanguages = injectedRtlLanguages || DefaultRtlLanguages;

        const filtered = injectedRtlLanguages.filter((language) => navigator.language.includes(language));

        this.rtl = new BehaviorSubject(filtered.length > 0);
    }
}
