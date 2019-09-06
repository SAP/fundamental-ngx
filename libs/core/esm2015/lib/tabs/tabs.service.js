/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * Service that is responsible for providing keyboard actions support
 *
 */
export class TabsService {
    constructor() {
        /**
         * Event is thrown always when tab is selected by keyboard actions
         */
        this.tabSelected = new Subject();
    }
    /**
     * @hidden
     * @param {?} index
     * @param {?} event
     * @param {?} elements
     * @return {?}
     */
    tabHeaderKeyHandler(index, event, elements) {
        switch (event.code) {
            case ('ArrowLeft'): {
                if (index - 1 >= 0) {
                    this.getTabLinkFromIndex(index - 1, elements).focus();
                }
                else {
                    this.getTabLinkFromIndex(elements.length - 1, elements).focus();
                }
                break;
            }
            case ('ArrowRight'): {
                if (index + 1 < elements.length) {
                    this.getTabLinkFromIndex(index + 1, elements).focus();
                }
                else {
                    this.getTabLinkFromIndex(0, elements).focus();
                }
                break;
            }
            case ('Space'): {
                event.preventDefault();
                this.tabSelected.next(index);
                break;
            }
            case ('Enter'): {
                this.tabSelected.next(index);
            }
        }
    }
    /**
     * @hidden
     * @private
     * @param {?} index
     * @param {?} elements
     * @return {?}
     */
    getTabLinkFromIndex(index, elements) {
        return elements[index];
    }
}
TabsService.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * Event is thrown always when tab is selected by keyboard actions
     * @type {?}
     */
    TabsService.prototype.tabSelected;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3RhYnMvdGFicy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBSy9CLE1BQU0sT0FBTyxXQUFXO0lBRHhCOzs7O1FBSVcsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO0lBb0MvQyxDQUFDOzs7Ozs7OztJQWpDRyxtQkFBbUIsQ0FBQyxLQUFhLEVBQUUsS0FBVSxFQUFFLFFBQXVCO1FBQ2xFLFFBQVEsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNoQixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDaEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ3pEO3FCQUFNO29CQUNILElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDbkU7Z0JBQ0QsTUFBTTthQUNUO1lBQ0QsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksS0FBSyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFO29CQUM3QixJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDekQ7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDakQ7Z0JBQ0QsTUFBTTthQUNUO1lBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ1osS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDN0IsTUFBTTthQUNUO1lBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDaEM7U0FDSjtJQUNMLENBQUM7Ozs7Ozs7O0lBR08sbUJBQW1CLENBQUMsS0FBYSxFQUFFLFFBQXVCO1FBQzlELE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7OztZQXZDSixVQUFVOzs7Ozs7O0lBSVAsa0NBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuLyoqXG4gKiBTZXJ2aWNlIHRoYXQgaXMgcmVzcG9uc2libGUgZm9yIHByb3ZpZGluZyBrZXlib2FyZCBhY3Rpb25zIHN1cHBvcnRcbiAqICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGFic1NlcnZpY2Uge1xuXG4gICAgLyoqIEV2ZW50IGlzIHRocm93biBhbHdheXMgd2hlbiB0YWIgaXMgc2VsZWN0ZWQgYnkga2V5Ym9hcmQgYWN0aW9ucyAqL1xuICAgIHB1YmxpYyB0YWJTZWxlY3RlZCA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgdGFiSGVhZGVyS2V5SGFuZGxlcihpbmRleDogbnVtYmVyLCBldmVudDogYW55LCBlbGVtZW50czogSFRNTEVsZW1lbnRbXSk6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgKCdBcnJvd0xlZnQnKToge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRhYkxpbmtGcm9tSW5kZXgoaW5kZXggLSAxLCBlbGVtZW50cykuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRhYkxpbmtGcm9tSW5kZXgoZWxlbWVudHMubGVuZ3RoIC0gMSwgZWxlbWVudHMpLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAoJ0Fycm93UmlnaHQnKToge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCArIDEgPCBlbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUYWJMaW5rRnJvbUluZGV4KGluZGV4ICsgMSwgZWxlbWVudHMpLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUYWJMaW5rRnJvbUluZGV4KDAsIGVsZW1lbnRzKS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgKCdTcGFjZScpOiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhYlNlbGVjdGVkLm5leHQoaW5kZXgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAoJ0VudGVyJyk6IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhYlNlbGVjdGVkLm5leHQoaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBwcml2YXRlIGdldFRhYkxpbmtGcm9tSW5kZXgoaW5kZXg6IG51bWJlciwgZWxlbWVudHM6IEhUTUxFbGVtZW50W10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiBlbGVtZW50c1tpbmRleF07XG4gICAgfVxufVxuIl19