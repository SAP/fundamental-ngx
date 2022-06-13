import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentDensityMode } from '../content-density.types';

export const CONTENT_DENSITY_DIRECTIVE = new InjectionToken<Observable<ContentDensityMode>>('ContentDensityDirective');
