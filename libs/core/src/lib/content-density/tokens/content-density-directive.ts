import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalContentDensityMode } from '../content-density.types';

export const CONTENT_DENSITY_DIRECTIVE = new InjectionToken<Observable<LocalContentDensityMode>>(
    'ContentDensityDirective'
);
