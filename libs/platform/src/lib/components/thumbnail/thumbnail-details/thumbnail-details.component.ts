import { Component,
         OnInit,
         ChangeDetectorRef,
         HostListener,
         AfterContentInit,
         ElementRef,
         ViewChild,
         ChangeDetectionStrategy
         } from '@angular/core';
import { Media } from '../../thumbnail/thumbnail.component'
import { DialogRef } from '@fundamental-ngx/core';
import { ThumbnailImageComponent } from '../thumbnail-image/thumbnail-image.component';

interface DialogRefData {
    selectedMedia: Media;
    mediaList: Media[];
    rtl: boolean;
    maxImages: number;
}

@Component({
    selector: 'fdp-thumbnail-details',
    templateUrl: './thumbnail-details.component.html',
    styleUrls: ['./thumbnail-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailDetailsComponent implements OnInit, AfterContentInit {

    /** @hidden Start index of currently active items */
    @ViewChild(ThumbnailImageComponent)
    thumbnailImage: ThumbnailImageComponent;

    /** @hidden Start index of currently active items */
    currentActiveSlidesStartIndex = 0;

    /** @hidden Make left navigation button disabled */
    leftButtonDisabled = false;

    /** @hidden Make right navigation button disabled */
    rightButtonDisabled = false;

    constructor(private readonly _elementRef: ElementRef, public dialogRef: DialogRef,
        private _cdr: ChangeDetectorRef
    ) {
    }

    /** @hidden */
    ngOnInit(): void {
        this.dialogRef.data.selectedMedia.selected = true;
        this.currentActiveSlidesStartIndex = this.dialogRef.data.mediaList.indexOf(this.dialogRef.data.selectedMedia);
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this.currentActiveSlidesStartIndex = this.dialogRef.data.mediaList.indexOf(this.dialogRef.data.selectedMedia);
        if (this.dialogRef.data.mediaList.length > 0) {
            this._buttonVisibility();
        } else {
            this.leftButtonDisabled = true;
            this.rightButtonDisabled = true;
            this._cdr.detectChanges();
        }
    }

    /** Transitions to the previous image in the thumbnail. */
    previous(): void {
        if (this.currentActiveSlidesStartIndex <= 0) {
            return;
        } else {
            this.currentActiveSlidesStartIndex = this.currentActiveSlidesStartIndex - 1;
            this.dialogRef.data.selectedMedia = this.dialogRef.data.mediaList[this.currentActiveSlidesStartIndex];
            this.dialogRef.data.mediaList.forEach(item => item.selected = false);
            this.dialogRef.data.mediaList[this.currentActiveSlidesStartIndex].selected = true;
        }
        this._buttonVisibility();
    }

    /** Transitions to the next image in the thumbnail. */
    next(): void {
        if (this.currentActiveSlidesStartIndex >= this.dialogRef.data.mediaList.length - 1) {
            return;
        } else {
            this.currentActiveSlidesStartIndex = this.currentActiveSlidesStartIndex + 1;
            this.dialogRef.data.selectedMedia = this.dialogRef.data.mediaList[this.currentActiveSlidesStartIndex];
            this.dialogRef.data.mediaList.forEach(item => item.selected = false);
            this.dialogRef.data.mediaList[this.currentActiveSlidesStartIndex].selected = true;
        }
        this._buttonVisibility();

    }

    /** handles click on thumbnail images  */
    thumbnailClickHandle(selectedMedia: Media): void {
        this.dialogRef.data.selectedMedia = selectedMedia;
        this.currentActiveSlidesStartIndex = this.dialogRef.data.mediaList.indexOf(this.dialogRef.data.selectedMedia);
        this._buttonVisibility();
    }

    /**Close dialog */
    closeDialog(): void {
        if (this.dialogRef.data.mediaList.length > this.dialogRef.data.maxImages) {
            this.dialogRef.data.mediaList[this.dialogRef.data.maxImages - 1].overlayRequired = true;
        }
        this.dialogRef.close();
    }

    /** @hidden Transitions to the next image in the thumbnail  */
    @HostListener('keydown.arrowright', ['$event'])
    onKeydownArrowRight(event: KeyboardEvent): void {
        event.preventDefault();
        this.dialogRef.data.rtl ? this.previous() : this.next();
    }

    /** @hidden Transitions to the previous image in the thumbnail*/
    @HostListener('keydown.arrowleft', ['$event'])
    onKeydownArrowLeft(event: KeyboardEvent): void {
        event.preventDefault();
        this.dialogRef.data.rtl ? this.next() : this.previous();
    }

    /** @hidden returns data for dialog*/
    get _data(): DialogRefData {
        return this.dialogRef.data;
    }

    /** @hidden Handles navigation button visibility */
    private _buttonVisibility(): void {

        if (this.currentActiveSlidesStartIndex === 0) {
            this.leftButtonDisabled = true;
            this.rightButtonDisabled = false;
        } else if (this.currentActiveSlidesStartIndex === this.dialogRef.data.mediaList.length - 1) {
            this.rightButtonDisabled = true;
            this.leftButtonDisabled = false;
        } else {
            this.leftButtonDisabled = false;
            this.rightButtonDisabled = false;
        }
        if (this.dialogRef.data.mediaList.length === 1) {
            this.leftButtonDisabled = true;
            this.rightButtonDisabled = true;
        }
    }


}
