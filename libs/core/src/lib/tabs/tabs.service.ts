import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * Service that is responsible for providing keyboard actions support
 * */
@Injectable()
export class TabsService {

    /** Event is thrown always when tab is selected by keyboard actions */
    public tabSelected = new Subject<number>();

    /** @hidden */
    tabHeaderKeyHandler(index: number, event: any, elements: HTMLElement[]): void {
        switch (event.key) {
            case ('ArrowLeft'): {
                if (index - 1 >= 0) {
                    this.getTabLinkFromIndex(index - 1, elements).focus();
                } else {
                    this.getTabLinkFromIndex(elements.length - 1, elements).focus();
                }
                break;
            }
            case ('ArrowRight'): {
                if (index + 1 < elements.length) {
                    this.getTabLinkFromIndex(index + 1, elements).focus();
                } else {
                    this.getTabLinkFromIndex(0, elements).focus();
                }
                break;
            }
            case (' '): {
                event.preventDefault();
                this.tabSelected.next(index);
                break;
            }
            case ('Enter'): {
                this.tabSelected.next(index);
            }
        }
    }

    /** @hidden */
    private getTabLinkFromIndex(index: number, elements: HTMLElement[]): HTMLElement {
        return elements[index];
    }
}
