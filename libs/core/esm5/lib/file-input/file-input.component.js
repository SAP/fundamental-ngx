/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 * Tool to facilitate the input of files from the user.
 * It supports drag and drop, multiple input, max file size and more.
 * The drag events make it very easy to create and style elements like a dropzone.
 */
var FileInputComponent = /** @class */ (function () {
    function FileInputComponent() {
        /**
         * @hidden
         */
        this.fdFileInputClass = true;
        /**
         * Whether the file input is disabled.
         */
        this.disabled = false;
        /**
         * Whether the file input should accept multiple files.
         */
        this.multiple = true;
        /**
         * Whether the file input accepts drag and dropped files.
         */
        this.dragndrop = true;
        /**
         * Event fired when files are selected. Passed object is the array of files selected.
         */
        this.onSelect = new EventEmitter();
        /**
         * Event fired when some invalid files are selected. Passed object is the array of invalid files.
         */
        this.onInvalidFiles = new EventEmitter();
        /**
         * Event fired when the dragged file enters the component boundaries.
         */
        this.onDragEnter = new EventEmitter();
        /**
         * Event fired when the dragged file exits the component boundaries.
         */
        this.onDragLeave = new EventEmitter();
        /**
         * @hidden
         */
        this.onChange = (/**
         * @return {?}
         */
        function () { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    FileInputComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    FileInputComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    FileInputComponent.prototype.setDisabledState = /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} files
     * @return {?}
     */
    FileInputComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} files
     * @return {?}
     */
    function (files) {
        // not needed - should be handled by user.
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    FileInputComponent.prototype.selectHandler = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this.maxFileSize) {
            /** @type {?} */
            var valid_files_1 = [];
            /** @type {?} */
            var invalid_files_1 = [];
            event.forEach((/**
             * @param {?} file
             * @return {?}
             */
            function (file) {
                if (file.size < _this.maxFileSize) {
                    valid_files_1.push(file);
                }
                else {
                    invalid_files_1.push(file);
                }
            }));
            if (valid_files_1.length > 0) {
                this.onChange(valid_files_1);
                this.onSelect.emit(valid_files_1);
            }
            if (invalid_files_1.length > 0) {
                this.onInvalidFiles.emit(invalid_files_1);
            }
        }
        else {
            this.onChange(event);
            this.onSelect.emit(event);
        }
    };
    /**
     * Opens the file selector.
     */
    /**
     * Opens the file selector.
     * @return {?}
     */
    FileInputComponent.prototype.open = /**
     * Opens the file selector.
     * @return {?}
     */
    function () {
        this.inputRef.nativeElement.click();
    };
    /**
     * Clears the files from the input.
     */
    /**
     * Clears the files from the input.
     * @return {?}
     */
    FileInputComponent.prototype.clear = /**
     * Clears the files from the input.
     * @return {?}
     */
    function () {
        this.inputRef.nativeElement.value = '';
        this.onChange([]);
    };
    FileInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-file-input',
                    template: "<div style=\"display: block\"\n     fdFileDragnDrop\n     [accept]=\"accept\"\n     [dragndrop]=\"dragndrop\"\n     [disabled]=\"disabled\"\n     [multiple]=\"multiple\"\n     (onFileChange)=\"selectHandler($event)\"\n     (onInvalidFiles)=\"onInvalidFiles.emit($event)\"\n     (onDragEnter)=\"onDragEnter.emit()\"\n     (onDragLeave)=\"onDragLeave.emit()\">\n    <ng-content></ng-content>\n</div>\n<input #input\n       class=\"hidden-file-input\"\n       type=\"file\"\n       [attr.accept]=\"accept\"\n       (onFileSelect)=\"selectHandler($event)\"\n       [multiple]=\"multiple\"\n       [disabled]=\"disabled\"\n       fdFileSelect>\n\n",
                    host: {
                        '(blur)': 'onTouched()'
                    },
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return FileInputComponent; })),
                            multi: true,
                        }],
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-file-input{display:inline-block}.fd-file-input input.hidden-file-input{display:none}"]
                }] }
    ];
    FileInputComponent.propDecorators = {
        fdFileInputClass: [{ type: HostBinding, args: ['class.fd-file-input',] }],
        inputRef: [{ type: ViewChild, args: ['input',] }],
        disabled: [{ type: Input }],
        multiple: [{ type: Input }],
        accept: [{ type: Input }],
        dragndrop: [{ type: Input }],
        maxFileSize: [{ type: Input }],
        onSelect: [{ type: Output }],
        onInvalidFiles: [{ type: Output }],
        onDragEnter: [{ type: Output }],
        onDragLeave: [{ type: Output }]
    };
    return FileInputComponent;
}());
export { FileInputComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    FileInputComponent.prototype.fdFileInputClass;
    /**
     * @hidden
     * @type {?}
     */
    FileInputComponent.prototype.inputRef;
    /**
     * Whether the file input is disabled.
     * @type {?}
     */
    FileInputComponent.prototype.disabled;
    /**
     * Whether the file input should accept multiple files.
     * @type {?}
     */
    FileInputComponent.prototype.multiple;
    /**
     * Accepted file extensions. Format: `'.png,.jpg'`.
     * @type {?}
     */
    FileInputComponent.prototype.accept;
    /**
     * Whether the file input accepts drag and dropped files.
     * @type {?}
     */
    FileInputComponent.prototype.dragndrop;
    /**
     * Max file size in bytes that the input will accept.
     * @type {?}
     */
    FileInputComponent.prototype.maxFileSize;
    /**
     * Event fired when files are selected. Passed object is the array of files selected.
     * @type {?}
     */
    FileInputComponent.prototype.onSelect;
    /**
     * Event fired when some invalid files are selected. Passed object is the array of invalid files.
     * @type {?}
     */
    FileInputComponent.prototype.onInvalidFiles;
    /**
     * Event fired when the dragged file enters the component boundaries.
     * @type {?}
     */
    FileInputComponent.prototype.onDragEnter;
    /**
     * Event fired when the dragged file exits the component boundaries.
     * @type {?}
     */
    FileInputComponent.prototype.onDragLeave;
    /**
     * @hidden
     * @type {?}
     */
    FileInputComponent.prototype.onChange;
    /**
     * @hidden
     * @type {?}
     */
    FileInputComponent.prototype.onTouched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvZmlsZS1pbnB1dC9maWxlLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUksT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFPekU7SUFBQTs7OztRQWtCSSxxQkFBZ0IsR0FBWSxJQUFJLENBQUM7Ozs7UUFRakMsYUFBUSxHQUFZLEtBQUssQ0FBQzs7OztRQUkxQixhQUFRLEdBQVksSUFBSSxDQUFDOzs7O1FBUXpCLGNBQVMsR0FBWSxJQUFJLENBQUM7Ozs7UUFRakIsYUFBUSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDOzs7O1FBSTVELG1CQUFjLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7Ozs7UUFJbEUsZ0JBQVcsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQzs7OztRQUkzRCxnQkFBVyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDOzs7O1FBR3BFLGFBQVE7OztRQUFhLGNBQU8sQ0FBQyxFQUFDOzs7O1FBRzlCLGNBQVM7OztRQUFhLGNBQU8sQ0FBQyxFQUFDO0lBOERuQyxDQUFDO0lBNURHLGNBQWM7Ozs7OztJQUNkLDZDQUFnQjs7Ozs7SUFBaEIsVUFBaUIsRUFBTztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsY0FBYzs7Ozs7O0lBQ2QsOENBQWlCOzs7OztJQUFqQixVQUFrQixFQUFPO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lB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K0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLyoqXG4gKiBUb29sIHRvIGZhY2lsaXRhdGUgdGhlIGlucHV0IG9mIGZpbGVzIGZyb20gdGhlIHVzZXIuXG4gKiBJdCBzdXBwb3J0cyBkcmFnIGFuZCBkcm9wLCBtdWx0aXBsZSBpbnB1dCwgbWF4IGZpbGUgc2l6ZSBhbmQgbW9yZS5cbiAqIFRoZSBkcmFnIGV2ZW50cyBtYWtlIGl0IHZlcnkgZWFzeSB0byBjcmVhdGUgYW5kIHN0eWxlIGVsZW1lbnRzIGxpa2UgYSBkcm9wem9uZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1maWxlLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmlsZS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZmlsZS1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhibHVyKSc6ICdvblRvdWNoZWQoKSdcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW3tcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZpbGVJbnB1dENvbXBvbmVudCksXG4gICAgICAgIG11bHRpOiB0cnVlLFxuICAgIH1dLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgRmlsZUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLWZpbGUtaW5wdXQnKVxuICAgIGZkRmlsZUlucHV0Q2xhc3M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAVmlld0NoaWxkKCdpbnB1dCcpXG4gICAgaW5wdXRSZWY6IEVsZW1lbnRSZWY7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZmlsZSBpbnB1dCBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZmlsZSBpbnB1dCBzaG91bGQgYWNjZXB0IG11bHRpcGxlIGZpbGVzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgbXVsdGlwbGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEFjY2VwdGVkIGZpbGUgZXh0ZW5zaW9ucy4gRm9ybWF0OiBgJy5wbmcsLmpwZydgLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgYWNjZXB0OiBzdHJpbmc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZmlsZSBpbnB1dCBhY2NlcHRzIGRyYWcgYW5kIGRyb3BwZWQgZmlsZXMuICovXG4gICAgQElucHV0KClcbiAgICBkcmFnbmRyb3A6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIE1heCBmaWxlIHNpemUgaW4gYnl0ZXMgdGhhdCB0aGUgaW5wdXQgd2lsbCBhY2NlcHQuICovXG4gICAgQElucHV0KClcbiAgICBtYXhGaWxlU2l6ZTogbnVtYmVyO1xuXG4gICAgLyoqIEV2ZW50IGZpcmVkIHdoZW4gZmlsZXMgYXJlIHNlbGVjdGVkLiBQYXNzZWQgb2JqZWN0IGlzIHRoZSBhcnJheSBvZiBmaWxlcyBzZWxlY3RlZC4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPEZpbGVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVbXT4oKTtcblxuICAgIC8qKiBFdmVudCBmaXJlZCB3aGVuIHNvbWUgaW52YWxpZCBmaWxlcyBhcmUgc2VsZWN0ZWQuIFBhc3NlZCBvYmplY3QgaXMgdGhlIGFycmF5IG9mIGludmFsaWQgZmlsZXMuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgb25JbnZhbGlkRmlsZXM6IEV2ZW50RW1pdHRlcjxGaWxlW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlW10+KCk7XG5cbiAgICAvKiogRXZlbnQgZmlyZWQgd2hlbiB0aGUgZHJhZ2dlZCBmaWxlIGVudGVycyB0aGUgY29tcG9uZW50IGJvdW5kYXJpZXMuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgb25EcmFnRW50ZXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKiBFdmVudCBmaXJlZCB3aGVuIHRoZSBkcmFnZ2VkIGZpbGUgZXhpdHMgdGhlIGNvbXBvbmVudCBib3VuZGFyaWVzLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IG9uRHJhZ0xlYXZlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvblRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICB3cml0ZVZhbHVlKGZpbGVzOiBGaWxlW10pOiB2b2lkIHtcbiAgICAgICAgLy8gbm90IG5lZWRlZCAtIHNob3VsZCBiZSBoYW5kbGVkIGJ5IHVzZXIuXG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBzZWxlY3RIYW5kbGVyKGV2ZW50OiBGaWxlW10pIHtcbiAgICAgICAgaWYgKHRoaXMubWF4RmlsZVNpemUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkX2ZpbGVzOiBGaWxlW10gPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGludmFsaWRfZmlsZXM6IEZpbGVbXSA9IFtdO1xuICAgICAgICAgICAgZXZlbnQuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZS5zaXplIDwgdGhpcy5tYXhGaWxlU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZF9maWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGludmFsaWRfZmlsZXMucHVzaChmaWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh2YWxpZF9maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWxpZF9maWxlcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHZhbGlkX2ZpbGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbnZhbGlkX2ZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uSW52YWxpZEZpbGVzLmVtaXQoaW52YWxpZF9maWxlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3QuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgZmlsZSBzZWxlY3Rvci5cbiAgICAgKi9cbiAgICBwdWJsaWMgb3BlbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnB1dFJlZi5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBmaWxlcyBmcm9tIHRoZSBpbnB1dC5cbiAgICAgKi9cbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKFtdKTtcbiAgICB9XG5cbn1cbiJdfQ==