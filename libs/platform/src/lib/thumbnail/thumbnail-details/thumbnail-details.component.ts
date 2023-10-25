import { CdkScrollable } from '@angular/cdk/overlay';
import { NgIf } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    forwardRef,
    HostListener,
    OnInit,
    ViewChild
} from '@angular/core';
import { warnOnce } from '@fundamental-ngx/cdk/utils';
import { ButtonBarComponent } from '@fundamental-ngx/core/bar';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogRef
} from '@fundamental-ngx/core/dialog';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { ThumbnailImageComponent } from '../thumbnail-image/thumbnail-image.component';
import { Media } from '../thumbnail.interfaces';

interface DialogRefData {
    selectedMedia: Media;
    mediaList: Media[];
    rtl: boolean;
    maxImages: number;
    thumbnailId: string;
}

/**
 * @deprecated
 * ThumbnailDetails component is deprecated since version 0.40.0
 */
@Component({
    selector: 'fdp-thumbnail-details',
    templateUrl: './thumbnail-details.component.html',
    styleUrls: ['./thumbnail-details.component.scss'],
    standalone: true,
    imports: [
        DialogComponent,
        DialogHeaderComponent,
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        DialogBodyComponent,
        NgIf,
        ThumbnailImageComponent,
        DialogFooterComponent,
        ButtonBarComponent,
        FdTranslatePipe
    ]
})
export class ThumbnailDetailsComponent implements OnInit, AfterViewInit {
    /** Reference to thumbnail images component */
    @ViewChild(forwardRef(() => ThumbnailImageComponent))
    thumbnailImage: ThumbnailImageComponent;

    /** @hidden Start index of currently active items */
    currentActiveSlidesStartIndex = 0;

    /** @hidden Make left navigation button disabled */
    leftButtonDisabled = false;

    /** @hidden Make right navigation button disabled */
    rightButtonDisabled = false;
    /** medialist to display */
    mediaList = this.dialogRef.data.mediaList;

    /** max limit  */
    maxImages = this.dialogRef.data.maxImages;

    /** @hidden */
    constructor(public dialogRef: DialogRef, private _cdr: ChangeDetectorRef) {
        warnOnce('ThumbnailDetailsComponent is deprecated since version 0.40.0 and will be removed in next release.');
    }

    /** @hidden */
    ngOnInit(): void {
        this.dialogRef.data.selectedMedia.selected = true;
        this.currentActiveSlidesStartIndex = this.mediaList.indexOf(this.dialogRef.data.selectedMedia);
        this._buttonVisibility();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.currentActiveSlidesStartIndex = this.mediaList.indexOf(this.dialogRef.data.selectedMedia);
        if (this.mediaList.length > 0) {
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
        }
        this.currentActiveSlidesStartIndex = this.currentActiveSlidesStartIndex - 1;
        this.dialogRef.data.selectedMedia = this.mediaList[this.currentActiveSlidesStartIndex];
        const thumbnailImagesArray = this.thumbnailImage.thumbnailImages.toArray();
        thumbnailImagesArray[this.currentActiveSlidesStartIndex].nativeElement.focus();
        this.mediaList.forEach((item) => (item.selected = false));
        this.mediaList[this.currentActiveSlidesStartIndex].selected = true;
        this._cdr.detectChanges();
        this._buttonVisibility();
    }

    /** Transitions to the next image in the thumbnail. */
    next(): void {
        if (this.currentActiveSlidesStartIndex >= this.dialogRef.data.mediaList.length - 1) {
            return;
        }
        this.currentActiveSlidesStartIndex = this.currentActiveSlidesStartIndex + 1;
        this.dialogRef.data.selectedMedia = this.mediaList[this.currentActiveSlidesStartIndex];
        const thumbnailImagesArray = this.thumbnailImage.thumbnailImages.toArray();
        thumbnailImagesArray[this.currentActiveSlidesStartIndex].nativeElement.focus();
        this.mediaList.forEach((item) => (item.selected = false));
        this.mediaList[this.currentActiveSlidesStartIndex].selected = true;
        this._cdr.detectChanges();
        this._buttonVisibility();
    }

    /** handles click on thumbnail images  */
    thumbnailClickHandle(selectedmedia: Media): void {
        this.dialogRef.data.selectedMedia = selectedmedia;
        this.currentActiveSlidesStartIndex = this.mediaList.indexOf(this.dialogRef.data.selectedMedia);
        this._buttonVisibility();
    }

    /** Close dialog */
    closeDialog(): void {
        if (this.mediaList.length > this.maxImages) {
            this.dialogRef.data.mediaList[this.maxImages - 1].overlayRequired = true;
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
            if (this.dialogRef.data.rtl) {
                this.leftButtonDisabled = false;
                this.rightButtonDisabled = true;
            } else {
                this.leftButtonDisabled = true;
                this.rightButtonDisabled = false;
            }
        } else if (this.currentActiveSlidesStartIndex === this.mediaList.length - 1) {
            if (this.dialogRef.data.rtl) {
                this.leftButtonDisabled = true;
                this.rightButtonDisabled = false;
            } else {
                this.leftButtonDisabled = false;
                this.rightButtonDisabled = true;
            }
        } else {
            this.leftButtonDisabled = false;
            this.rightButtonDisabled = false;
        }
        if (this.mediaList.length === 1) {
            this.leftButtonDisabled = true;
            this.rightButtonDisabled = true;
        }
    }
}
