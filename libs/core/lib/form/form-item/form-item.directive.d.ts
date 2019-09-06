/**
 * Directive to be applied to the parent of a form control.
 *
 * ```html
 * <div fd-form-item>
 *     <input fd-form-control type="text" />
 * </div>
 * ```
 */
export declare class FormItemDirective {
    /** Whether the form item is a checkbox. */
    isCheck: boolean;
    /** Whether the form item is inline. */
    isInline: boolean;
    /** @hidden */
    fdFormItemClass: boolean;
}
