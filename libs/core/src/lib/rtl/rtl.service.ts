import { BehaviorSubject } from 'rxjs';
import { Optional } from '@angular/core';

const DefaultRtlLanguages = ['ar', 'arc', 'dv', 'fa', 'ha', 'he', 'khw', 'ks', 'ku', 'ps', 'ur', 'yi'];

export class RtlService {
    rtl: BehaviorSubject<boolean>;
    constructor(@Optional() injectedRtlLanguages: string[]) {
        injectedRtlLanguages = injectedRtlLanguages ? injectedRtlLanguages : DefaultRtlLanguages

        const filtered = injectedRtlLanguages.filter(language => navigator.language.includes(language));

        this.rtl = new BehaviorSubject(filtered.length > 0);
    }
}
