/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { Output } from '@angular/core';
var MenuKeyboardService = /** @class */ (function () {
    function MenuKeyboardService() {
        /**
         * Event emitted when an item link is clicked.
         */
        this.itemClicked = new Subject();
        /**
         * Whether user wants to remove keyboard handling
         */
        this.disableKeydownHandling = false;
    }
    /** Function that should be called every time, keydown event is used on some menu item,
     * it provides whole functionality for handling
     * ArrowDown - focus, ArrowUp - focus, Space bar - simulate click, Enter key - simulate click.
     * @param event KeyboardEvent
     * @param index index of items starts from 0
     * @param menuItems array of menu item directives
     * */
    /**
     * Function that should be called every time, keydown event is used on some menu item,
     * it provides whole functionality for handling
     * ArrowDown - focus, ArrowUp - focus, Space bar - simulate click, Enter key - simulate click.
     * @param {?} event KeyboardEvent
     * @param {?} index index of items starts from 0
     * @param {?} menuItems array of menu item directives
     *
     * @return {?}
     */
    MenuKeyboardService.prototype.keyDownHandler = /**
     * Function that should be called every time, keydown event is used on some menu item,
     * it provides whole functionality for handling
     * ArrowDown - focus, ArrowUp - focus, Space bar - simulate click, Enter key - simulate click.
     * @param {?} event KeyboardEvent
     * @param {?} index index of items starts from 0
     * @param {?} menuItems array of menu item directives
     *
     * @return {?}
     */
    function (event, index, menuItems) {
        if (this.disableKeydownHandling) {
            return;
        }
        switch (event.code) {
            case ('ArrowDown'): {
                if (menuItems.length > index + 1) {
                    menuItems[index + 1].focus();
                }
                else {
                    if (this.focusEscapeAfterList) {
                        this.focusEscapeAfterList();
                    }
                    else {
                        menuItems[0].focus();
                    }
                }
                event.preventDefault();
                break;
            }
            case ('ArrowUp'): {
                if (index > 0) {
                    menuItems[index - 1].focus();
                }
                else {
                    if (this.focusEscapeBeforeList) {
                        this.focusEscapeBeforeList();
                    }
                    else {
                        menuItems[menuItems.length - 1].focus();
                    }
                }
                event.preventDefault();
                break;
            }
            case ('Space'): {
                if (menuItems[index]) {
                    menuItems[index].click();
                    event.preventDefault();
                }
                break;
            }
            case ('Enter'): {
                if (menuItems[index]) {
                    menuItems[index].click();
                    event.preventDefault();
                }
                break;
            }
        }
    };
    MenuKeyboardService.propDecorators = {
        itemClicked: [{ type: Output }]
    };
    return MenuKeyboardService;
}());
export { MenuKeyboardService };
if (false) {
    /**
     * Event emitted when an item link is clicked.
     * @type {?}
     */
    MenuKeyboardService.prototype.itemClicked;
    /**
     * Whether user wants to remove keyboard handling
     * @type {?}
     */
    MenuKeyboardService.prototype.disableKeydownHandling;
    /**
     * Function that is supposed to be called, when focus escape before list
     * @type {?}
     */
    MenuKeyboardService.prototype.focusEscapeBeforeList;
    /**
     * Function that is supposed to be called, when focus escape after list
     * @type {?}
     */
    MenuKeyboardService.prototype.focusEscapeAfterList;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1rZXlib2FyZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21lbnUvbWVudS1rZXlib2FyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdkM7SUFBQTs7OztRQUlvQixnQkFBVyxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDOzs7O1FBR3JFLDJCQUFzQixHQUFZLEtBQUssQ0FBQztJQWdFNUMsQ0FBQztJQXhERzs7Ozs7O1NBTUs7Ozs7Ozs7Ozs7O0lBQ0wsNENBQWM7Ozs7Ozs7Ozs7SUFBZCxVQUFlLEtBQW9CLEVBQUUsS0FBYSxFQUFFLFNBQTRCO1FBRTVFLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQzdCLE9BQU87U0FDVjtRQUVELFFBQVEsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNoQixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUU7b0JBQzlCLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2hDO3FCQUFNO29CQUNILElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO3dCQUMzQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztxQkFDL0I7eUJBQU07d0JBQ0gsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO3FCQUN4QjtpQkFDSjtnQkFDRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU07YUFDVDtZQUNELEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtvQkFDWCxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUNoQztxQkFBTTtvQkFDSCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTt3QkFDNUIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7cUJBQ2hDO3lCQUFNO3dCQUNILFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO3FCQUMzQztpQkFDSjtnQkFDRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU07YUFDVDtZQUNELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNaLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNsQixTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3pCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDMUI7Z0JBQ0QsTUFBTTthQUNUO1lBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ2xCLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDekIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUMxQjtnQkFDRCxNQUFNO2FBQ1Q7U0FDSjtJQUNMLENBQUM7OzhCQW5FQSxNQUFNOztJQW9FWCwwQkFBQztDQUFBLEFBdkVELElBdUVDO1NBdkVZLG1CQUFtQjs7Ozs7O0lBRzVCLDBDQUNxRTs7Ozs7SUFHckUscURBQXdDOzs7OztJQUd4QyxvREFBZ0M7Ozs7O0lBR2hDLG1EQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVmYXVsdE1lbnVJdGVtIH0gZnJvbSAnLi9kZWZhdWx0LW1lbnUtaXRlbSc7XG5cbmV4cG9ydCBjbGFzcyBNZW51S2V5Ym9hcmRTZXJ2aWNlIHtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gYW4gaXRlbSBsaW5rIGlzIGNsaWNrZWQuKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgaXRlbUNsaWNrZWQ6IFN1YmplY3Q8bnVtYmVyPiA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcblxuICAgIC8qKiBXaGV0aGVyIHVzZXIgd2FudHMgdG8gcmVtb3ZlIGtleWJvYXJkIGhhbmRsaW5nICovXG4gICAgZGlzYWJsZUtleWRvd25IYW5kbGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgaXMgc3VwcG9zZWQgdG8gYmUgY2FsbGVkLCB3aGVuIGZvY3VzIGVzY2FwZSBiZWZvcmUgbGlzdCAqL1xuICAgIGZvY3VzRXNjYXBlQmVmb3JlTGlzdDogRnVuY3Rpb247XG5cbiAgICAvKiogRnVuY3Rpb24gdGhhdCBpcyBzdXBwb3NlZCB0byBiZSBjYWxsZWQsIHdoZW4gZm9jdXMgZXNjYXBlIGFmdGVyIGxpc3QgKi9cbiAgICBmb2N1c0VzY2FwZUFmdGVyTGlzdDogRnVuY3Rpb247XG5cbiAgICAvKiogRnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgY2FsbGVkIGV2ZXJ5IHRpbWUsIGtleWRvd24gZXZlbnQgaXMgdXNlZCBvbiBzb21lIG1lbnUgaXRlbSxcbiAgICAgKiBpdCBwcm92aWRlcyB3aG9sZSBmdW5jdGlvbmFsaXR5IGZvciBoYW5kbGluZ1xuICAgICAqIEFycm93RG93biAtIGZvY3VzLCBBcnJvd1VwIC0gZm9jdXMsIFNwYWNlIGJhciAtIHNpbXVsYXRlIGNsaWNrLCBFbnRlciBrZXkgLSBzaW11bGF0ZSBjbGljay5cbiAgICAgKiBAcGFyYW0gZXZlbnQgS2V5Ym9hcmRFdmVudFxuICAgICAqIEBwYXJhbSBpbmRleCBpbmRleCBvZiBpdGVtcyBzdGFydHMgZnJvbSAwXG4gICAgICogQHBhcmFtIG1lbnVJdGVtcyBhcnJheSBvZiBtZW51IGl0ZW0gZGlyZWN0aXZlc1xuICAgICAqICovXG4gICAga2V5RG93bkhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGluZGV4OiBudW1iZXIsIG1lbnVJdGVtczogRGVmYXVsdE1lbnVJdGVtW10pOiB2b2lkIHtcblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlS2V5ZG93bkhhbmRsaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgKCdBcnJvd0Rvd24nKToge1xuICAgICAgICAgICAgICAgIGlmIChtZW51SXRlbXMubGVuZ3RoID4gaW5kZXggKyAxKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtc1tpbmRleCArIDFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNFc2NhcGVBZnRlckxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNFc2NhcGVBZnRlckxpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtc1swXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICgnQXJyb3dVcCcpOiB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBtZW51SXRlbXNbaW5kZXggLSAxXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzRXNjYXBlQmVmb3JlTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c0VzY2FwZUJlZm9yZUxpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtc1ttZW51SXRlbXMubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAoJ1NwYWNlJyk6IHtcbiAgICAgICAgICAgICAgICBpZiAobWVudUl0ZW1zW2luZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICBtZW51SXRlbXNbaW5kZXhdLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAoJ0VudGVyJyk6IHtcbiAgICAgICAgICAgICAgICBpZiAobWVudUl0ZW1zW2luZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICBtZW51SXRlbXNbaW5kZXhdLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19