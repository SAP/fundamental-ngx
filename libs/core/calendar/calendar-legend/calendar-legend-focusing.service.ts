import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CalendarLegendFocusingService {
    /** Subject to emit the focused element */
    cellSubject = new BehaviorSubject<{ cell: HTMLElement | null; calIndex: number | null; cellNumber: number | null }>(
        { cell: null, calIndex: null, cellNumber: null }
    );

    /** Observable to emit the focused element */
    cellSubject$ = this.cellSubject.asObservable();

    /** the current focused element */
    focusedElement: HTMLElement | null;

    /** Special Number */
    specialNumber: number | null;

    /** Calendar Index */
    calIndex: number;

    /** Setting the elements that are getting currently focused */
    setFocusOnCell(legendItem: HTMLElement, calIndex: number, specialNumber?: number): void {
        this.focusedElement = legendItem;
        this.calIndex = calIndex;
        if (specialNumber) {
            this.specialNumber = specialNumber;
            this.cellSubject.next({ cell: legendItem, calIndex, cellNumber: specialNumber });
        }
    }

    /** Getting the elements that are getting currently focused */
    getFocusedElement(): number | null {
        return this.specialNumber;
    }

    /** Setting the index of the calendar */
    setCalendarIndex(calIndex: number): void {
        this.calIndex = calIndex;
    }

    /** Getting the index of the calendar */
    getCalendarIndex(): number {
        return this.calIndex;
    }

    /** Clearing the focused element */
    clearFocusedElement(): void {
        this.focusedElement = null;
        this.specialNumber = null;
        this.cellSubject.next({ cell: null, calIndex: null, cellNumber: null });
    }
}
