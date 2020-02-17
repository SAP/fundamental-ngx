import { BehaviorSubject } from 'rxjs';
import { Optional, Injectable } from '@angular/core';

const DefaultRtlLanguages = ['ar', 'arc', 'dv', 'fa', 'ha', 'he', 'khw', 'ks', 'ku', 'ps', 'ur', 'yi'];

@Injectable()
/** 
 * Service taking care of RTL trough behavior subject
 * language list is used to determine if rtl should be enabled at start
 * user can overwrite default languages by using injection token 
 * name of variable used in constructor: injectedRtlLanguages
*/
export class RtlService {
    rtl: BehaviorSubject<boolean>;
    constructor(@Optional() injectedRtlLanguages: string[]) {
        injectedRtlLanguages = injectedRtlLanguages ? injectedRtlLanguages : DefaultRtlLanguages

        const filtered = injectedRtlLanguages.filter(language => navigator.language.includes(language));

        this.rtl = new BehaviorSubject(filtered.length > 0);
    }
}
