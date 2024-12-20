import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CalendarLegendFocusingService {
    /** Subject to emit the focused element */
    cellSubject = new BehaviorSubject<{ cell: HTMLElement | null; cellNumber: number | null }>({
        cell: null,
        cellNumber: null
    });

    /** Observable to emit the focused element */
    cellSubject$ = this.cellSubject.asObservable();

    /** the current focused element */
    focusedElement: HTMLElement | null;

    /** Special Number */
    specialNumber: number | null;

    /** Setting the elements that are getting currently focused */
    setFocusOnCell(legendItem: HTMLElement, specialNumber?: number): void {
        this.focusedElement = legendItem;
        if (specialNumber) {
            this.specialNumber = specialNumber;
            this.cellSubject.next({ cell: legendItem, cellNumber: specialNumber });
        }
    }

    /** Getting the elements that are getting currently focused */
    getFocusedElement(): number | null {
        return this.specialNumber;
    }

    /** Clearing the focused element */
    clearFocusedElement(): void {
        this.focusedElement = null;
        this.specialNumber = null;
        this.cellSubject.next({ cell: null, cellNumber: null });
    }
}
