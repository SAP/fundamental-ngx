/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { alertContainerNgIf } from './alert-animations';
var AlertContainerComponent = /** @class */ (function () {
    function AlertContainerComponent() {
        /**
         * @hidden
         */
        this.fdAlertContainerClass = true;
    }
    AlertContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-alert-container',
                    template: "",
                    host: {
                        '[@alertContainerNgIf]': ''
                    },
                    animations: [
                        alertContainerNgIf
                    ],
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n        .fd-alert-container {\n            position: fixed;\n            display: flex;\n            flex-direction: column;\n            z-index: 5000;\n            align-items: center;\n            top: 0;\n            right: 50%;\n            left: 50%;\n        }\n    "]
                }] }
    ];
    AlertContainerComponent.propDecorators = {
        fdAlertContainerClass: [{ type: HostBinding, args: ['class.fd-alert-container',] }]
    };
    return AlertContainerComponent;
}());
export { AlertContainerComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    AlertContainerComponent.prototype.fdAlertContainerClass;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9hbGVydC9hbGVydC11dGlscy9hbGVydC1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV4RDtJQUFBOzs7O1FBMkJJLDBCQUFxQixHQUFZLElBQUksQ0FBQztJQUMxQyxDQUFDOztnQkE1QkEsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxFQUFFO29CQWFaLElBQUksRUFBRTt3QkFDRix1QkFBdUIsRUFBRSxFQUFFO3FCQUM5QjtvQkFDRCxVQUFVLEVBQUU7d0JBQ1Isa0JBQWtCO3FCQUNyQjtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs2QkFsQjVCLHFSQVdSO2lCQVFKOzs7d0NBSUksV0FBVyxTQUFDLDBCQUEwQjs7SUFFM0MsOEJBQUM7Q0FBQSxBQTVCRCxJQTRCQztTQUxZLHVCQUF1Qjs7Ozs7O0lBR2hDLHdEQUNzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBhbGVydENvbnRhaW5lck5nSWYgfSBmcm9tICcuL2FsZXJ0LWFuaW1hdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLWFsZXJ0LWNvbnRhaW5lcicsXG4gICAgdGVtcGxhdGU6IGBgLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgLmZkLWFsZXJ0LWNvbnRhaW5lciB7XG4gICAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgIHotaW5kZXg6IDUwMDA7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgICAgcmlnaHQ6IDUwJTtcbiAgICAgICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgfVxuICAgIGBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tAYWxlcnRDb250YWluZXJOZ0lmXSc6ICcnXG4gICAgfSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIGFsZXJ0Q29udGFpbmVyTmdJZlxuICAgIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBBbGVydENvbnRhaW5lckNvbXBvbmVudCB7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtYWxlcnQtY29udGFpbmVyJylcbiAgICBmZEFsZXJ0Q29udGFpbmVyQ2xhc3M6IGJvb2xlYW4gPSB0cnVlO1xufVxuIl19