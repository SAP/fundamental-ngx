import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlatformDynamicPagePageOverflowService {
    isExampleOpened = new BehaviorSubject<boolean>(false);
}
