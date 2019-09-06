/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DynamicComponentInjector = /** @class */ (function () {
    function DynamicComponentInjector(_parentInjector, _additionalTokens) {
        this._parentInjector = _parentInjector;
        this._additionalTokens = _additionalTokens;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} flags
     * @return {?}
     */
    DynamicComponentInjector.prototype.get = /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} flags
     * @return {?}
     */
    function (token, notFoundValue, flags) {
        /** @type {?} */
        var value = this._additionalTokens.get(token);
        if (value) {
            return value;
        }
        return this._parentInjector.get(token, notFoundValue);
    };
    return DynamicComponentInjector;
}());
export { DynamicComponentInjector };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DynamicComponentInjector.prototype._parentInjector;
    /**
     * @type {?}
     * @private
     */
    DynamicComponentInjector.prototype._additionalTokens;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb21wb25lbnQtaW5qZWN0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdXRpbHMvZHluYW1pYy1jb21wb25lbnQvZHluYW1pYy1jb21wb25lbnQtaW5qZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUdBO0lBQ0ksa0NBQW9CLGVBQXlCLEVBQVUsaUJBQW9DO1FBQXZFLG9CQUFlLEdBQWYsZUFBZSxDQUFVO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUFHLENBQUM7Ozs7Ozs7SUFNL0Ysc0NBQUc7Ozs7OztJQUFILFVBQUksS0FBVSxFQUFFLGFBQW1CLEVBQUUsS0FBVzs7WUFDdEMsS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBRS9DLElBQUksS0FBSyxFQUFFO1lBQ1AsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFNLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBQ0wsK0JBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDOzs7Ozs7O0lBZmUsbURBQWlDOzs7OztJQUFFLHFEQUE0QyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgSW5qZWN0b3IsIFR5cGUsIEluamVjdGlvblRva2VuLCBJbmplY3RGbGFncyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgRHluYW1pY0NvbXBvbmVudEluamVjdG9yIGltcGxlbWVudHMgSW5qZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhcmVudEluamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBfYWRkaXRpb25hbFRva2VuczogV2Vha01hcDxhbnksIGFueT4pIHt9XG5cbiAgICBnZXQ8VD4odG9rZW46IFR5cGU8VD4gfCBJbmplY3Rpb25Ub2tlbjxUPiwgbm90Rm91bmRWYWx1ZT86IFQsIGZsYWdzPzogSW5qZWN0RmxhZ3MpOiBUO1xuXG4gICAgZ2V0KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU/OiBhbnkpO1xuXG4gICAgZ2V0KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU/OiBhbnksIGZsYWdzPzogYW55KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fYWRkaXRpb25hbFRva2Vucy5nZXQodG9rZW4pO1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudEluamVjdG9yLmdldDxhbnk+KHRva2VuLCBub3RGb3VuZFZhbHVlKTtcbiAgICB9XG59XG4iXX0=