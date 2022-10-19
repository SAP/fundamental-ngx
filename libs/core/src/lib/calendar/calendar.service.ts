import { Subject } from 'rxjs';
import { Injectable, Optional } from '@angular/core';

import { RtlService } from '@fundamental-ngx/core/utils';
import { EscapeFocusFunction } from './models/common';

@Injectable()
export class CalendarService {
    /** Row amount */
    rowAmount = 3;

    /** Column amount */
    colAmount = 4;

    /** Event thrown, when the element is selected by space or enter keys */
    onKeySelect: Subject<number> = new Subject<number>();

    /** Event thrown, when the focus goes after list of elements */
    onListEndApproach: Subject<number> = new Subject<number>();

    /** Event thrown, when the focus goes before list of elements */
    onListStartApproach: Subject<number> = new Subject<number>();

    /** Event thrown, when the focus is changed. */
    onFocusIdChange: Subject<number> = new Subject<number>();

    /** Left Arrow Id, which will be focused by default on focus escape */
    leftArrowId: string;

    /** Function that is called when the focus would escape the element. */
    focusEscapeFunction: EscapeFocusFunction;

    /** @hidden */
    constructor(@Optional() private _rtlService: RtlService) {}

    /**
     * Standardized method to calculate grid [x][y] to index number
     */
    getId(row: number, col: number): number {
        return row * this.colAmount + col;
    }

    /**
     * Method that handles keydown events, dedicated for All Calendar views, which have a list with row x col elements.
     * Triggers the events, when the focus approaches start and end of list. Or when there is basic change of focus.
     * Triggers also event, when the element is selected by enter key, or space bar.
     * @param event KeyboardEvent
     * @param index which is number (0 - (rowAmount * colAmount))
     */
    onKeydownHandler(event: KeyboardEvent, index: number): void {
        const rtl: boolean = this._rtlService && this._rtlService.rtl.getValue();

        switch (event.key) {
            case 'Spacebar':
            case 'Enter':
            case ' ': {
                event.preventDefault();
                this.onKeySelect.next(index);
                break;
            }
            case 'Left':
            case 'ArrowLeft': {
                event.preventDefault();
                if (!rtl) {
                    this.focusLeftElement(index);
                } else {
                    this.focusRightElement(index);
                }
                break;
            }
            case 'Right':
            case 'ArrowRight': {
                event.preventDefault();
                if (!rtl) {
                    this.focusRightElement(index);
                } else {
                    this.focusLeftElement(index);
                }
                break;
            }
            case 'Up':
            case 'ArrowUp': {
                event.preventDefault();
                if (index <= this.colAmount - 1) {
                    this.onListStartApproach.next(this.getId(this.rowAmount - 1, 0) + index);
                } else {
                    this.onFocusIdChange.next(index - this.colAmount);
                }
                break;
            }
            case 'Down':
            case 'ArrowDown': {
                event.preventDefault();
                if (index >= this.getId(this.rowAmount - 1, 0)) {
                    this.onListEndApproach.next(index - this.getId(this.rowAmount - 1, 0));
                } else {
                    this.onFocusIdChange.next(index + this.colAmount);
                }
                break;
            }
            case 'Tab': {
                if (!event.shiftKey) {
                    if (typeof this.focusEscapeFunction === 'function') {
                        this.focusEscapeFunction(event);
                    } else {
                        const element = document.getElementById(this.leftArrowId);
                        if (element) {
                            element.focus();
                        }
                    }
                    event.preventDefault();
                    break;
                }
            }
        }
    }

    /**
     * @hidden
     * Right Element focus trigger
     */
    focusRightElement(index: number): void {
        if (index === this.getId(this.rowAmount, 0) - 1) {
            this.onListEndApproach.next(0);
        } else {
            this.onFocusIdChange.next(index + 1);
        }
    }

    /**
     * @hidden
     * Left Element focus trigger
     */
    focusLeftElement(index: number): void {
        if (index === 0) {
            this.onListStartApproach.next(this.getId(this.rowAmount, 0) - 1);
        } else {
            this.onFocusIdChange.next(index - 1);
        }
    }
}
