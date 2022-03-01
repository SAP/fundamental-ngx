import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const FN_CLICKED = new InjectionToken<Observable<MouseEvent | KeyboardEvent>>(
    'Injection token for providing unified click event'
);
