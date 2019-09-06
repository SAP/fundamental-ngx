/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
export class SearchHighlightPipe {
    /**
     * @param {?} value
     * @param {?} args
     * @param {?=} active
     * @return {?}
     */
    transform(value, args, active = true) {
        if (args && value && active) {
            /** @type {?} */
            const startIndex = value.toLowerCase().indexOf(args.toLowerCase());
            if (startIndex !== -1) {
                /** @type {?} */
                const matchingString = value.substr(startIndex, args.length);
                return value.replace(matchingString, '<strong>' + matchingString + '</strong>');
            }
        }
        return value;
    }
}
SearchHighlightPipe.decorators = [
    { type: Pipe, args: [{
                name: 'highlight'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWhpZ2hsaWdodC5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL3BpcGVzL3NlYXJjaC1oaWdobGlnaHQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFNcEQsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7OztJQUU1QixTQUFTLENBQUMsS0FBYSxFQUFFLElBQVksRUFBRSxTQUFrQixJQUFJO1FBQ3pELElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUU7O2tCQUNuQixVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbEUsSUFBSSxVQUFVLEtBQUssQ0FBQyxDQUFDLEVBQUU7O3NCQUNiLGNBQWMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUM1RCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLFVBQVUsR0FBRyxjQUFjLEdBQUcsV0FBVyxDQUFDLENBQUM7YUFDbkY7U0FFSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7OztZQWhCSixJQUFJLFNBQUM7Z0JBQ0YsSUFBSSxFQUFFLFdBQVc7YUFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnaGlnaGxpZ2h0J1xufSlcblxuZXhwb3J0IGNsYXNzIFNlYXJjaEhpZ2hsaWdodFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICAgIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCBhcmdzOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbiA9IHRydWUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoYXJncyAmJiB2YWx1ZSAmJiBhY3RpdmUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoYXJncy50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgIGlmIChzdGFydEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoaW5nU3RyaW5nID0gdmFsdWUuc3Vic3RyKHN0YXJ0SW5kZXgsIGFyZ3MubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZShtYXRjaGluZ1N0cmluZywgJzxzdHJvbmc+JyArIG1hdGNoaW5nU3RyaW5nICsgJzwvc3Ryb25nPicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cbiJdfQ==