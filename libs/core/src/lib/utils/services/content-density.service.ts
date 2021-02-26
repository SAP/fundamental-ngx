import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ContentDensity = 'cozy' | 'condensed' | 'compact';

@Injectable()
/**
 * Service taking care of ContentDensity
 */
export class ContentDensityService {
    contentDensity: BehaviorSubject<ContentDensity>;

    constructor() {
        this.contentDensity = new BehaviorSubject('cozy');
    }
}
