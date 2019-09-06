/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
var SearchHighlightPipe = /** @class */ (function () {
    function SearchHighlightPipe() {
    }
    /**
     * @param {?} value
     * @param {?} args
     * @param {?=} active
     * @return {?}
     */
    SearchHighlightPipe.prototype.transform = /**
     * @param {?} value
     * @param {?} args
     * @param {?=} active
     * @return {?}
     */
    function (value, args, active) {
        if (active === void 0) { active = true; }
        if (args && value && active) {
            /** @type {?} */
            var startIndex = value.toLowerCase().indexOf(args.toLowerCase());
            if (startIndex !== -1) {
                /** @type {?} */
                var matchingString = value.substr(startIndex, args.length);
                return value.replace(matchingString, '<strong>' + matchingString + '</strong>');
            }
        }
        return value;
    };
    SearchHighlightPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'highlight'
                },] }
    ];
    return SearchHighlightPipe;
}());
export { SearchHighlightPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWhpZ2hsaWdodC5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL3BpcGVzL3NlYXJjaC1oaWdobGlnaHQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFcEQ7SUFBQTtJQWlCQSxDQUFDOzs7Ozs7O0lBWEcsdUNBQVM7Ozs7OztJQUFULFVBQVUsS0FBYSxFQUFFLElBQVksRUFBRSxNQUFzQjtRQUF0Qix1QkFBQSxFQUFBLGFBQXNCO1FBQ3pELElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUU7O2dCQUNuQixVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbEUsSUFBSSxVQUFVLEtBQUssQ0FBQyxDQUFDLEVBQUU7O29CQUNiLGNBQWMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUM1RCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLFVBQVUsR0FBRyxjQUFjLEdBQUcsV0FBVyxDQUFDLENBQUM7YUFDbkY7U0FFSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7O2dCQWhCSixJQUFJLFNBQUM7b0JBQ0YsSUFBSSxFQUFFLFdBQVc7aUJBQ3BCOztJQWVELDBCQUFDO0NBQUEsQUFqQkQsSUFpQkM7U0FiWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnaGlnaGxpZ2h0J1xufSlcblxuZXhwb3J0IGNsYXNzIFNlYXJjaEhpZ2hsaWdodFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICAgIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCBhcmdzOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbiA9IHRydWUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoYXJncyAmJiB2YWx1ZSAmJiBhY3RpdmUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoYXJncy50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgIGlmIChzdGFydEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoaW5nU3RyaW5nID0gdmFsdWUuc3Vic3RyKHN0YXJ0SW5kZXgsIGFyZ3MubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZShtYXRjaGluZ1N0cmluZywgJzxzdHJvbmc+JyArIG1hdGNoaW5nU3RyaW5nICsgJzwvc3Ryb25nPicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cbiJdfQ==