import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentDensityMode } from '../types/content-density.mode';

export const CONTENT_DENSITY_DIRECTIVE = new InjectionToken<Observable<ContentDensityMode>>('ContentDensityDirective');
