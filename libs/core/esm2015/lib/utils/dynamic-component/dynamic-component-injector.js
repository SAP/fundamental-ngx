/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class DynamicComponentInjector {
    /**
     * @param {?} _parentInjector
     * @param {?} _additionalTokens
     */
    constructor(_parentInjector, _additionalTokens) {
        this._parentInjector = _parentInjector;
        this._additionalTokens = _additionalTokens;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} flags
     * @return {?}
     */
    get(token, notFoundValue, flags) {
        /** @type {?} */
        const value = this._additionalTokens.get(token);
        if (value) {
            return value;
        }
        return this._parentInjector.get(token, notFoundValue);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb21wb25lbnQtaW5qZWN0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdXRpbHMvZHluYW1pYy1jb21wb25lbnQvZHluYW1pYy1jb21wb25lbnQtaW5qZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUdBLE1BQU0sT0FBTyx3QkFBd0I7Ozs7O0lBQ2pDLFlBQW9CLGVBQXlCLEVBQVUsaUJBQW9DO1FBQXZFLG9CQUFlLEdBQWYsZUFBZSxDQUFVO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUFHLENBQUM7Ozs7Ozs7SUFNL0YsR0FBRyxDQUFDLEtBQVUsRUFBRSxhQUFtQixFQUFFLEtBQVc7O2NBQ3RDLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUUvQyxJQUFJLEtBQUssRUFBRTtZQUNQLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBTSxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNKOzs7Ozs7SUFmZSxtREFBaUM7Ozs7O0lBQUUscURBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBJbmplY3RvciwgVHlwZSwgSW5qZWN0aW9uVG9rZW4sIEluamVjdEZsYWdzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBEeW5hbWljQ29tcG9uZW50SW5qZWN0b3IgaW1wbGVtZW50cyBJbmplY3RvciB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFyZW50SW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIF9hZGRpdGlvbmFsVG9rZW5zOiBXZWFrTWFwPGFueSwgYW55Pikge31cblxuICAgIGdldDxUPih0b2tlbjogVHlwZTxUPiB8IEluamVjdGlvblRva2VuPFQ+LCBub3RGb3VuZFZhbHVlPzogVCwgZmxhZ3M/OiBJbmplY3RGbGFncyk6IFQ7XG5cbiAgICBnZXQodG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZT86IGFueSk7XG5cbiAgICBnZXQodG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZT86IGFueSwgZmxhZ3M/OiBhbnkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9hZGRpdGlvbmFsVG9rZW5zLmdldCh0b2tlbik7XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50SW5qZWN0b3IuZ2V0PGFueT4odG9rZW4sIG5vdEZvdW5kVmFsdWUpO1xuICAgIH1cbn1cbiJdfQ==