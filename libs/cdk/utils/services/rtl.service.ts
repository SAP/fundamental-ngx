import { Inject, Injectable, InjectionToken, Optional, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

/** Default RTL languages */
const DefaultRtlLanguages = ['ar', 'arc', 'dv', 'fa', 'ha', 'he', 'khw', 'ks', 'ku', 'ps', 'ur', 'yi'];
/** @deprecated Use RTL_LANGUAGE from BidiService instead */
export const RTL_LANGUAGE_DEPRECATED = new InjectionToken<string[]>('RtlLanguage');

@Injectable()
/**
 * Service taking care of RTL trough behavior subject
 * language list is used to determine if rtl should be enabled at start
 * user can overwrite default languages by using injection token RtlLanguageToken
 */
export class RtlService {
    /** RTL value */
    rtl: BehaviorSubject<boolean>;

    /** Signal wrapper for RTL value. */
    rtlSignal: Signal<boolean>;

    /** @hidden */
    constructor(@Optional() @Inject(RTL_LANGUAGE_DEPRECATED) injectedRtlLanguages: string[]) {
        injectedRtlLanguages = injectedRtlLanguages || DefaultRtlLanguages;

        const filtered = injectedRtlLanguages.filter((language) => navigator.language.includes(language));

        this.rtl = new BehaviorSubject(filtered.length > 0);

        this.rtlSignal = toSignal(this.rtl, { requireSync: true });
    }
}
