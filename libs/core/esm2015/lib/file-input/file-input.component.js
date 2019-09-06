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
export class FileInputComponent {
    constructor() {
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
        () => { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @hidden
     * @param {?} files
     * @return {?}
     */
    writeValue(files) {
        // not needed - should be handled by user.
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    selectHandler(event) {
        if (this.maxFileSize) {
            /** @type {?} */
            const valid_files = [];
            /** @type {?} */
            const invalid_files = [];
            event.forEach((/**
             * @param {?} file
             * @return {?}
             */
            file => {
                if (file.size < this.maxFileSize) {
                    valid_files.push(file);
                }
                else {
                    invalid_files.push(file);
                }
            }));
            if (valid_files.length > 0) {
                this.onChange(valid_files);
                this.onSelect.emit(valid_files);
            }
            if (invalid_files.length > 0) {
                this.onInvalidFiles.emit(invalid_files);
            }
        }
        else {
            this.onChange(event);
            this.onSelect.emit(event);
        }
    }
    /**
     * Opens the file selector.
     * @return {?}
     */
    open() {
        this.inputRef.nativeElement.click();
    }
    /**
     * Clears the files from the input.
     * @return {?}
     */
    clear() {
        this.inputRef.nativeElement.value = '';
        this.onChange([]);
    }
}
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
                        () => FileInputComponent)),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvZmlsZS1pbnB1dC9maWxlLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUksT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFxQnpFLE1BQU0sT0FBTyxrQkFBa0I7SUFkL0I7Ozs7UUFrQkkscUJBQWdCLEdBQVksSUFBSSxDQUFDOzs7O1FBUWpDLGFBQVEsR0FBWSxLQUFLLENBQUM7Ozs7UUFJMUIsYUFBUSxHQUFZLElBQUksQ0FBQzs7OztRQVF6QixjQUFTLEdBQVksSUFBSSxDQUFDOzs7O1FBUWpCLGFBQVEsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQzs7OztRQUk1RCxtQkFBYyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDOzs7O1FBSWxFLGdCQUFXLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7Ozs7UUFJM0QsZ0JBQVcsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQzs7OztRQUdwRSxhQUFROzs7UUFBYSxHQUFHLEVBQUUsR0FBRSxDQUFDLEVBQUM7Ozs7UUFHOUIsY0FBUzs7O1FBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUFDO0lBOERuQyxDQUFDOzs7Ozs7SUEzREcsZ0JBQWdCLENBQUMsRUFBTztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7Ozs7SUFHRCxpQkFBaUIsQ0FBQyxFQUFPO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7OztJQUdELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUM7Ozs7OztJQUdELFVBQVUsQ0FBQyxLQUFhO1FBQ3BCLDBDQUEwQztJQUM5QyxDQUFDOzs7Ozs7SUFHRCxhQUFhLENBQUMsS0FBYTtRQUN2QixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7O2tCQUNaLFdBQVcsR0FBVyxFQUFFOztrQkFDeEIsYUFBYSxHQUFXLEVBQUU7WUFDaEMsS0FBSyxDQUFDLE9BQU87Ozs7WUFBQyxJQUFJLENBQUMsRUFBRTtnQkFDakIsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQzlCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzFCO3FCQUFNO29CQUNILGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzVCO1lBQ0wsQ0FBQyxFQUFDLENBQUM7WUFDSCxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNuQztZQUNELElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzNDO1NBQ0o7YUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7SUFDTCxDQUFDOzs7OztJQUtNLElBQUk7UUFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QyxDQUFDOzs7OztJQUtNLEtBQUs7UUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEIsQ0FBQzs7O1lBNUhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsOG9CQUEwQztnQkFFMUMsSUFBSSxFQUFFO29CQUNGLFFBQVEsRUFBRSxhQUFhO2lCQUMxQjtnQkFDRCxTQUFTLEVBQUUsQ0FBQzt3QkFDUixPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVTs7O3dCQUFDLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixFQUFDO3dCQUNqRCxLQUFLLEVBQUUsSUFBSTtxQkFDZCxDQUFDO2dCQUNGLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN4Qzs7OytCQUlJLFdBQVcsU0FBQyxxQkFBcUI7dUJBSWpDLFNBQVMsU0FBQyxPQUFPO3VCQUlqQixLQUFLO3VCQUlMLEtBQUs7cUJBSUwsS0FBSzt3QkFJTCxLQUFLOzBCQUlMLEtBQUs7dUJBSUwsTUFBTTs2QkFJTixNQUFNOzBCQUlOLE1BQU07MEJBSU4sTUFBTTs7Ozs7OztJQXhDUCw4Q0FDaUM7Ozs7O0lBR2pDLHNDQUNxQjs7Ozs7SUFHckIsc0NBQzBCOzs7OztJQUcxQixzQ0FDeUI7Ozs7O0lBR3pCLG9DQUNlOzs7OztJQUdmLHVDQUMwQjs7Ozs7SUFHMUIseUNBQ29COzs7OztJQUdwQixzQ0FDcUU7Ozs7O0lBR3JFLDRDQUMyRTs7Ozs7SUFHM0UseUNBQ29FOzs7OztJQUdwRSx5Q0FDb0U7Ozs7O0lBR3BFLHNDQUE4Qjs7Ozs7SUFHOUIsdUNBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8qKlxuICogVG9vbCB0byBmYWNpbGl0YXRlIHRoZSBpbnB1dCBvZiBmaWxlcyBmcm9tIHRoZSB1c2VyLlxuICogSXQgc3VwcG9ydHMgZHJhZyBhbmQgZHJvcCwgbXVsdGlwbGUgaW5wdXQsIG1heCBmaWxlIHNpemUgYW5kIG1vcmUuXG4gKiBUaGUgZHJhZyBldmVudHMgbWFrZSBpdCB2ZXJ5IGVhc3kgdG8gY3JlYXRlIGFuZCBzdHlsZSBlbGVtZW50cyBsaWtlIGEgZHJvcHpvbmUuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtZmlsZS1pbnB1dCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2ZpbGUtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2ZpbGUtaW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICcoYmx1ciknOiAnb25Ub3VjaGVkKCknXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFt7XG4gICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBGaWxlSW5wdXRDb21wb25lbnQpLFxuICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9XSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1maWxlLWlucHV0JylcbiAgICBmZEZpbGVJbnB1dENsYXNzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQFZpZXdDaGlsZCgnaW5wdXQnKVxuICAgIGlucHV0UmVmOiBFbGVtZW50UmVmO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGZpbGUgaW5wdXQgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGZpbGUgaW5wdXQgc2hvdWxkIGFjY2VwdCBtdWx0aXBsZSBmaWxlcy4gKi9cbiAgICBASW5wdXQoKVxuICAgIG11bHRpcGxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBBY2NlcHRlZCBmaWxlIGV4dGVuc2lvbnMuIEZvcm1hdDogYCcucG5nLC5qcGcnYC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGFjY2VwdDogc3RyaW5nO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGZpbGUgaW5wdXQgYWNjZXB0cyBkcmFnIGFuZCBkcm9wcGVkIGZpbGVzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZHJhZ25kcm9wOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBNYXggZmlsZSBzaXplIGluIGJ5dGVzIHRoYXQgdGhlIGlucHV0IHdpbGwgYWNjZXB0LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgbWF4RmlsZVNpemU6IG51bWJlcjtcblxuICAgIC8qKiBFdmVudCBmaXJlZCB3aGVuIGZpbGVzIGFyZSBzZWxlY3RlZC4gUGFzc2VkIG9iamVjdCBpcyB0aGUgYXJyYXkgb2YgZmlsZXMgc2VsZWN0ZWQuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxGaWxlW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlW10+KCk7XG5cbiAgICAvKiogRXZlbnQgZmlyZWQgd2hlbiBzb21lIGludmFsaWQgZmlsZXMgYXJlIHNlbGVjdGVkLiBQYXNzZWQgb2JqZWN0IGlzIHRoZSBhcnJheSBvZiBpbnZhbGlkIGZpbGVzLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IG9uSW52YWxpZEZpbGVzOiBFdmVudEVtaXR0ZXI8RmlsZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVtdPigpO1xuXG4gICAgLyoqIEV2ZW50IGZpcmVkIHdoZW4gdGhlIGRyYWdnZWQgZmlsZSBlbnRlcnMgdGhlIGNvbXBvbmVudCBib3VuZGFyaWVzLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IG9uRHJhZ0VudGVyOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogRXZlbnQgZmlyZWQgd2hlbiB0aGUgZHJhZ2dlZCBmaWxlIGV4aXRzIHRoZSBjb21wb25lbnQgYm91bmRhcmllcy4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBvbkRyYWdMZWF2ZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvbkNoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25Ub3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgd3JpdGVWYWx1ZShmaWxlczogRmlsZVtdKTogdm9pZCB7XG4gICAgICAgIC8vIG5vdCBuZWVkZWQgLSBzaG91bGQgYmUgaGFuZGxlZCBieSB1c2VyLlxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgc2VsZWN0SGFuZGxlcihldmVudDogRmlsZVtdKSB7XG4gICAgICAgIGlmICh0aGlzLm1heEZpbGVTaXplKSB7XG4gICAgICAgICAgICBjb25zdCB2YWxpZF9maWxlczogRmlsZVtdID0gW107XG4gICAgICAgICAgICBjb25zdCBpbnZhbGlkX2ZpbGVzOiBGaWxlW10gPSBbXTtcbiAgICAgICAgICAgIGV2ZW50LmZvckVhY2goZmlsZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGUuc2l6ZSA8IHRoaXMubWF4RmlsZVNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRfZmlsZXMucHVzaChmaWxlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbnZhbGlkX2ZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodmFsaWRfZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodmFsaWRfZmlsZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh2YWxpZF9maWxlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW52YWxpZF9maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkludmFsaWRGaWxlcy5lbWl0KGludmFsaWRfZmlsZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgdGhlIGZpbGUgc2VsZWN0b3IuXG4gICAgICovXG4gICAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXRSZWYubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgZmlsZXMgZnJvbSB0aGUgaW5wdXQuXG4gICAgICovXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlucHV0UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgdGhpcy5vbkNoYW5nZShbXSk7XG4gICAgfVxuXG59XG4iXX0=