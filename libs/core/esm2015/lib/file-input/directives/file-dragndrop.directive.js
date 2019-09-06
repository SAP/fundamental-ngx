/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
/**
 * Directive that handles the drag and drop feature of the file input.
 */
export class FileDragndropDirective {
    constructor() {
        /**
         * Whether multiple files can be dropped at once.
         */
        this.multiple = true;
        /**
         * Whether selecting of new files is disabled.
         */
        this.disabled = false;
        /**
         * Whether drag and drop is enabled. Disables this directive.
         */
        this.dragndrop = true;
        /**
         * Event emitted when files are selected. Passes back an array of files.
         */
        this.onFileChange = new EventEmitter();
        /**
         * Event emitted when invalid files are selected. Passes back an array of files.
         */
        this.onInvalidFiles = new EventEmitter();
        /**
         * Event emitted when the dragged file enters the dropzone.
         */
        this.onDragEnter = new EventEmitter();
        /**
         * Event emitted when the dragged file exits the dropzone.
         */
        this.onDragLeave = new EventEmitter();
        this.elementStateCounter = 0;
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    onDragover(event) {
        if (this.dragndrop) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    onDragenter() {
        ++this.elementStateCounter;
        if (this.dragndrop && this.elementStateCounter === 1) {
            this.onDragEnter.emit();
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    onDragleave(event) {
        --this.elementStateCounter;
        if (this.dragndrop && this.elementStateCounter === 0) {
            event.preventDefault();
            event.stopPropagation();
            this.onDragLeave.emit();
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    onDrop(event) {
        this.elementStateCounter = 0;
        if (!this.dragndrop || this.disabled) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        /** @type {?} */
        const rawFiles = event.dataTransfer.files;
        /** @type {?} */
        const files = Array.from(rawFiles);
        if (!this.multiple && files.length > 1) {
            this.onInvalidFiles.emit(files);
            return;
        }
        /** @type {?} */
        const valid_files = [];
        /** @type {?} */
        const invalid_files = [];
        if (files.length > 0) {
            if (!this.accept) {
                files.forEach((/**
                 * @param {?} file
                 * @return {?}
                 */
                (file) => {
                    valid_files.push(file);
                }));
            }
            else {
                /** @type {?} */
                const allowed_extensions = this.accept.toLocaleLowerCase().replace(/[\s.]/g, '').split(',');
                files.forEach((/**
                 * @param {?} file
                 * @return {?}
                 */
                (file) => {
                    /** @type {?} */
                    const ext = file.name.split('.')[file.name.split('.').length - 1];
                    if (allowed_extensions.lastIndexOf(ext) !== -1) {
                        valid_files.push(file);
                    }
                    else {
                        invalid_files.push(file);
                    }
                }));
            }
            this.onFileChange.emit(valid_files);
            if (invalid_files.length > 0) {
                this.onInvalidFiles.emit(invalid_files);
            }
        }
    }
}
FileDragndropDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fdFileDragnDrop]'
            },] }
];
FileDragndropDirective.propDecorators = {
    multiple: [{ type: Input }],
    accept: [{ type: Input }],
    disabled: [{ type: Input }],
    dragndrop: [{ type: Input }],
    onFileChange: [{ type: Output }],
    onInvalidFiles: [{ type: Output }],
    onDragEnter: [{ type: Output }],
    onDragLeave: [{ type: Output }],
    onDragover: [{ type: HostListener, args: ['dragover', ['$event'],] }],
    onDragenter: [{ type: HostListener, args: ['dragenter', [],] }],
    onDragleave: [{ type: HostListener, args: ['dragleave', ['$event'],] }],
    onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }]
};
if (false) {
    /**
     * Whether multiple files can be dropped at once.
     * @type {?}
     */
    FileDragndropDirective.prototype.multiple;
    /**
     * Accepted file extensions. Format: `'.png,.jpg'`.
     * @type {?}
     */
    FileDragndropDirective.prototype.accept;
    /**
     * Whether selecting of new files is disabled.
     * @type {?}
     */
    FileDragndropDirective.prototype.disabled;
    /**
     * Whether drag and drop is enabled. Disables this directive.
     * @type {?}
     */
    FileDragndropDirective.prototype.dragndrop;
    /**
     * Event emitted when files are selected. Passes back an array of files.
     * @type {?}
     */
    FileDragndropDirective.prototype.onFileChange;
    /**
     * Event emitted when invalid files are selected. Passes back an array of files.
     * @type {?}
     */
    FileDragndropDirective.prototype.onInvalidFiles;
    /**
     * Event emitted when the dragged file enters the dropzone.
     * @type {?}
     */
    FileDragndropDirective.prototype.onDragEnter;
    /**
     * Event emitted when the dragged file exits the dropzone.
     * @type {?}
     */
    FileDragndropDirective.prototype.onDragLeave;
    /**
     * @type {?}
     * @private
     */
    FileDragndropDirective.prototype.elementStateCounter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kcmFnbmRyb3AuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2ZpbGUtaW5wdXQvZGlyZWN0aXZlcy9maWxlLWRyYWduZHJvcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBUXJGLE1BQU0sT0FBTyxzQkFBc0I7SUFIbkM7Ozs7UUFPSSxhQUFRLEdBQVksSUFBSSxDQUFDOzs7O1FBUXpCLGFBQVEsR0FBWSxLQUFLLENBQUM7Ozs7UUFJMUIsY0FBUyxHQUFZLElBQUksQ0FBQzs7OztRQUlqQixpQkFBWSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDOzs7O1FBSWhFLG1CQUFjLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7Ozs7UUFJbEUsZ0JBQVcsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQzs7OztRQUkzRCxnQkFBVyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRTVELHdCQUFtQixHQUFXLENBQUMsQ0FBQztJQTJFNUMsQ0FBQzs7Ozs7O0lBdkVVLFVBQVUsQ0FBQyxLQUFLO1FBQ25CLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQzs7Ozs7SUFJTSxXQUFXO1FBQ2QsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDM0IsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxDQUFDLEVBQUU7WUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7Ozs7OztJQUlN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QUFZLFNBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDOzs7Ozs7O0lBL0RoQywwQ0FDeUI7Ozs7O0lBR3pCLHdDQUNlOzs7OztJQUdmLDBDQUMwQjs7Ozs7SUFHMUIsMkNBQzBCOzs7OztJQUcxQiw4Q0FDeUU7Ozs7O0lBR3pFLGdEQUMyRTs7Ozs7SUFHM0UsNkNBQ29FOzs7OztJQUdwRSw2Q0FDb0U7Ozs7O0lBRXBFLHFEQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdGhhdCBoYW5kbGVzIHRoZSBkcmFnIGFuZCBkcm9wIGZlYXR1cmUgb2YgdGhlIGZpbGUgaW5wdXQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2ZkRmlsZURyYWduRHJvcF0nXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVEcmFnbmRyb3BEaXJlY3RpdmUge1xuXG4gICAgLyoqIFdoZXRoZXIgbXVsdGlwbGUgZmlsZXMgY2FuIGJlIGRyb3BwZWQgYXQgb25jZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIG11bHRpcGxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBBY2NlcHRlZCBmaWxlIGV4dGVuc2lvbnMuIEZvcm1hdDogYCcucG5nLC5qcGcnYC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGFjY2VwdDogc3RyaW5nO1xuXG4gICAgLyoqIFdoZXRoZXIgc2VsZWN0aW5nIG9mIG5ldyBmaWxlcyBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciBkcmFnIGFuZCBkcm9wIGlzIGVuYWJsZWQuIERpc2FibGVzIHRoaXMgZGlyZWN0aXZlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZHJhZ25kcm9wOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gZmlsZXMgYXJlIHNlbGVjdGVkLiBQYXNzZXMgYmFjayBhbiBhcnJheSBvZiBmaWxlcy4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBvbkZpbGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxGaWxlW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlW10+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIGludmFsaWQgZmlsZXMgYXJlIHNlbGVjdGVkLiBQYXNzZXMgYmFjayBhbiBhcnJheSBvZiBmaWxlcy4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBvbkludmFsaWRGaWxlczogRXZlbnRFbWl0dGVyPEZpbGVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVbXT4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGRyYWdnZWQgZmlsZSBlbnRlcnMgdGhlIGRyb3B6b25lLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IG9uRHJhZ0VudGVyOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBkcmFnZ2VkIGZpbGUgZXhpdHMgdGhlIGRyb3B6b25lLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IG9uRHJhZ0xlYXZlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBwcml2YXRlIGVsZW1lbnRTdGF0ZUNvdW50ZXI6IG51bWJlciA9IDA7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSlcbiAgICBwdWJsaWMgb25EcmFnb3ZlcihldmVudCkge1xuICAgICAgICBpZiAodGhpcy5kcmFnbmRyb3ApIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RMaXN0ZW5lcignZHJhZ2VudGVyJywgW10pXG4gICAgcHVibGljIG9uRHJhZ2VudGVyKCkge1xuICAgICAgICArK3RoaXMuZWxlbWVudFN0YXRlQ291bnRlcjtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ25kcm9wICYmIHRoaXMuZWxlbWVudFN0YXRlQ291bnRlciA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5vbkRyYWdFbnRlci5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXG4gICAgcHVibGljIG9uRHJhZ2xlYXZlKGV2ZW50KSB7XG4gICAgICAgIC0tdGhpcy5lbGVtZW50U3RhdGVDb3VudGVyO1xuICAgICAgICBpZiAodGhpcy5kcmFnbmRyb3AgJiYgdGhpcy5lbGVtZW50U3RhdGVDb3VudGVyID09PSAwKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLm9uRHJhZ0xlYXZlLmVtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXG4gICAgcHVibGljIG9uRHJvcChldmVudCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRTdGF0ZUNvdW50ZXIgPSAwO1xuXG4gICAgICAgIGlmICghdGhpcy5kcmFnbmRyb3AgfHwgdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgcmF3RmlsZXMgPSBldmVudC5kYXRhVHJhbnNmZXIuZmlsZXM7XG4gICAgICAgIGNvbnN0IGZpbGVzOiBGaWxlW10gPSBBcnJheS5mcm9tKHJhd0ZpbGVzKTtcblxuICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUgJiYgZmlsZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhpcy5vbkludmFsaWRGaWxlcy5lbWl0KGZpbGVzKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhbGlkX2ZpbGVzOiBGaWxlW10gPSBbXTtcbiAgICAgICAgY29uc3QgaW52YWxpZF9maWxlczogRmlsZVtdID0gW107XG4gICAgICAgIGlmIChmaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYWNjZXB0KSB7XG4gICAgICAgICAgICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZTogRmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZF9maWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhbGxvd2VkX2V4dGVuc2lvbnMgPSB0aGlzLmFjY2VwdC50b0xvY2FsZUxvd2VyQ2FzZSgpLnJlcGxhY2UoL1tcXHMuXS9nLCAnJykuc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICBmaWxlcy5mb3JFYWNoKChmaWxlOiBGaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4dCA9IGZpbGUubmFtZS5zcGxpdCgnLicpW2ZpbGUubmFtZS5zcGxpdCgnLicpLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsb3dlZF9leHRlbnNpb25zLmxhc3RJbmRleE9mKGV4dCkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZF9maWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZF9maWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uRmlsZUNoYW5nZS5lbWl0KHZhbGlkX2ZpbGVzKTtcbiAgICAgICAgICAgIGlmIChpbnZhbGlkX2ZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uSW52YWxpZEZpbGVzLmVtaXQoaW52YWxpZF9maWxlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=