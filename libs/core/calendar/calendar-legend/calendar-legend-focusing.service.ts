import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CalendarLegendFocusingService {
    cellSubject = new BehaviorSubject<string>('');
}
