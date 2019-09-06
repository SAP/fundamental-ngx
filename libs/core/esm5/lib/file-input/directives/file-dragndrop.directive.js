/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
/**
 * Directive that handles the drag and drop feature of the file input.
 */
var FileDragndropDirective = /** @class */ (function () {
    function FileDragndropDirective() {
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
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    FileDragndropDirective.prototype.onDragover = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.dragndrop) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    FileDragndropDirective.prototype.onDragenter = /**
     * @hidden
     * @return {?}
     */
    function () {
        ++this.elementStateCounter;
        if (this.dragndrop && this.elementStateCounter === 1) {
            this.onDragEnter.emit();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    FileDragndropDirective.prototype.onDragleave = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        --this.elementStateCounter;
        if (this.dragndrop && this.elementStateCounter === 0) {
            event.preventDefault();
            event.stopPropagation();
            this.onDragLeave.emit();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    FileDragndropDirective.prototype.onDrop = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.elementStateCounter = 0;
        if (!this.dragndrop || this.disabled) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        /** @type {?} */
        var rawFiles = event.dataTransfer.files;
        /** @type {?} */
        var files = Array.from(rawFiles);
        if (!this.multiple && files.length > 1) {
            this.onInvalidFiles.emit(files);
            return;
        }
        /** @type {?} */
        var valid_files = [];
        /** @type {?} */
        var invalid_files = [];
        if (files.length > 0) {
            if (!this.accept) {
                files.forEach((/**
                 * @param {?} file
                 * @return {?}
                 */
                function (file) {
                    valid_files.push(file);
                }));
            }
            else {
                /** @type {?} */
                var allowed_extensions_1 = this.accept.toLocaleLowerCase().replace(/[\s.]/g, '').split(',');
                files.forEach((/**
                 * @param {?} file
                 * @return {?}
                 */
                function (file) {
                    /** @type {?} */
                    var ext = file.name.split('.')[file.name.split('.').length - 1];
                    if (allowed_extensions_1.lastIndexOf(ext) !== -1) {
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
    };
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
    return FileDragndropDirective;
}());
export { FileDragndropDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kcmFnbmRyb3AuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2ZpbGUtaW5wdXQvZGlyZWN0aXZlcy9maWxlLWRyYWduZHJvcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBS3JGO0lBQUE7Ozs7UUFPSSxhQUFRLEdBQVksSUFBSSxDQUFDOzs7O1FBUXpCLGFBQVEsR0FBWSxLQUFLLENBQUM7Ozs7UUFJMUIsY0FBUyxHQUFZLElBQUksQ0FBQzs7OztRQUlqQixpQkFBWSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDOzs7O1FBSWhFLG1CQUFjLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7Ozs7UUFJbEUsZ0JBQVcsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQzs7OztRQUkzRCxnQkFBVyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRTVELHdCQUFtQixHQUFXLENBQUMsQ0FBQztJQTJFNUMsQ0FBQztJQXpFRyxjQUFjOzs7Ozs7SUFFUCwyQ0FBVTs7Ozs7SUFEakIsVUFDa0IsS0FBSztRQUNuQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFRCxjQUFjOzs7OztJQUVQLDRDQUFXOzs7O0lBRGxCO1FBRUksRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDM0IsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxDQUFDLEVBQUU7WUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztT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NUIsWUFBWSxTQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQzt5QkFXcEMsWUFBWSxTQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUEyQ3BDLDZCQUFDO0NBQUEsQUFoSEQsSUFnSEM7U0E3R1ksc0JBQXNCOzs7Ozs7SUFHL0IsMENBQ3lCOzs7OztJQUd6Qix3Q0FDZTs7Ozs7SUFHZiwwQ0FDMEI7Ozs7O0lBRzFCLDJDQUMwQjs7Ozs7SUFHMUIsOENBQ3lFOzs7OztJQUd6RSxnREFDMkU7Ozs7O0lBRzNFLDZDQUNvRTs7Ozs7SUFHcEUsNkNBQ29FOzs7OztJQUVwRSxxREFBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgaGFuZGxlcyB0aGUgZHJhZyBhbmQgZHJvcCBmZWF0dXJlIG9mIHRoZSBmaWxlIGlucHV0LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tmZEZpbGVEcmFnbkRyb3BdJ1xufSlcbmV4cG9ydCBjbGFzcyBGaWxlRHJhZ25kcm9wRGlyZWN0aXZlIHtcblxuICAgIC8qKiBXaGV0aGVyIG11bHRpcGxlIGZpbGVzIGNhbiBiZSBkcm9wcGVkIGF0IG9uY2UuICovXG4gICAgQElucHV0KClcbiAgICBtdWx0aXBsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogQWNjZXB0ZWQgZmlsZSBleHRlbnNpb25zLiBGb3JtYXQ6IGAnLnBuZywuanBnJ2AuICovXG4gICAgQElucHV0KClcbiAgICBhY2NlcHQ6IHN0cmluZztcblxuICAgIC8qKiBXaGV0aGVyIHNlbGVjdGluZyBvZiBuZXcgZmlsZXMgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgZHJhZyBhbmQgZHJvcCBpcyBlbmFibGVkLiBEaXNhYmxlcyB0aGlzIGRpcmVjdGl2ZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRyYWduZHJvcDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIGZpbGVzIGFyZSBzZWxlY3RlZC4gUGFzc2VzIGJhY2sgYW4gYXJyYXkgb2YgZmlsZXMuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgb25GaWxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RmlsZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVtdPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiBpbnZhbGlkIGZpbGVzIGFyZSBzZWxlY3RlZC4gUGFzc2VzIGJhY2sgYW4gYXJyYXkgb2YgZmlsZXMuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgb25JbnZhbGlkRmlsZXM6IEV2ZW50RW1pdHRlcjxGaWxlW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlW10+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBkcmFnZ2VkIGZpbGUgZW50ZXJzIHRoZSBkcm9wem9uZS4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBvbkRyYWdFbnRlcjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZHJhZ2dlZCBmaWxlIGV4aXRzIHRoZSBkcm9wem9uZS4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBvbkRyYWdMZWF2ZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgcHJpdmF0ZSBlbGVtZW50U3RhdGVDb3VudGVyOiBudW1iZXIgPSAwO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXG4gICAgcHVibGljIG9uRHJhZ292ZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ25kcm9wKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbnRlcicsIFtdKVxuICAgIHB1YmxpYyBvbkRyYWdlbnRlcigpIHtcbiAgICAgICAgKyt0aGlzLmVsZW1lbnRTdGF0ZUNvdW50ZXI7XG4gICAgICAgIGlmICh0aGlzLmRyYWduZHJvcCAmJiB0aGlzLmVsZW1lbnRTdGF0ZUNvdW50ZXIgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMub25EcmFnRW50ZXIuZW1pdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdExpc3RlbmVyKCdkcmFnbGVhdmUnLCBbJyRldmVudCddKVxuICAgIHB1YmxpYyBvbkRyYWdsZWF2ZShldmVudCkge1xuICAgICAgICAtLXRoaXMuZWxlbWVudFN0YXRlQ291bnRlcjtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ25kcm9wICYmIHRoaXMuZWxlbWVudFN0YXRlQ291bnRlciA9PT0gMCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5vbkRyYWdMZWF2ZS5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICAgIHB1YmxpYyBvbkRyb3AoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50U3RhdGVDb3VudGVyID0gMDtcblxuICAgICAgICBpZiAoIXRoaXMuZHJhZ25kcm9wIHx8IHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IHJhd0ZpbGVzID0gZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzO1xuICAgICAgICBjb25zdCBmaWxlczogRmlsZVtdID0gQXJyYXkuZnJvbShyYXdGaWxlcyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlICYmIGZpbGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMub25JbnZhbGlkRmlsZXMuZW1pdChmaWxlcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YWxpZF9maWxlczogRmlsZVtdID0gW107XG4gICAgICAgIGNvbnN0IGludmFsaWRfZmlsZXM6IEZpbGVbXSA9IFtdO1xuICAgICAgICBpZiAoZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmFjY2VwdCkge1xuICAgICAgICAgICAgICAgIGZpbGVzLmZvckVhY2goKGZpbGU6IEZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRfZmlsZXMucHVzaChmaWxlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWxsb3dlZF9leHRlbnNpb25zID0gdGhpcy5hY2NlcHQudG9Mb2NhbGVMb3dlckNhc2UoKS5yZXBsYWNlKC9bXFxzLl0vZywgJycpLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZTogRmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBleHQgPSBmaWxlLm5hbWUuc3BsaXQoJy4nKVtmaWxlLm5hbWUuc3BsaXQoJy4nKS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFsbG93ZWRfZXh0ZW5zaW9ucy5sYXN0SW5kZXhPZihleHQpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRfZmlsZXMucHVzaChmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRfZmlsZXMucHVzaChmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vbkZpbGVDaGFuZ2UuZW1pdCh2YWxpZF9maWxlcyk7XG4gICAgICAgICAgICBpZiAoaW52YWxpZF9maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkludmFsaWRGaWxlcy5lbWl0KGludmFsaWRfZmlsZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19