import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ContentDensity = 'cozy' | 'condensed' | 'compact';

/**
 * Service taking care of ContentDensity
 */
@Injectable()
export class ContentDensityService {
    contentDensity: BehaviorSubject<ContentDensity>;

    constructor() {
        this.contentDensity = new BehaviorSubject('cozy');
    }
}
