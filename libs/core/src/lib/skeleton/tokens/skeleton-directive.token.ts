import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const SKELETON_DIRECTIVE = new InjectionToken<Observable<boolean>>('SkeletonDirective');
