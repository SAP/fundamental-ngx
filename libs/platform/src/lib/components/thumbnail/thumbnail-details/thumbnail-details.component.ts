import { Component, OnInit, Input, Optional, ChangeDetectorRef, HostListener, AfterContentInit, ElementRef, ViewChild} from '@angular/core';
import { Media } from '../../thumbnail/thumbnail.component'
import { DialogRef } from '@fundamental-ngx/core';
import {ThumbnailImageComponent } from '../thumbnail-image/thumbnail-image.component';

interface DialogRefData {
    selectedMedia: Media;
    mediaList: Media[];
    rtl: boolean;
}

@Component({
  selector: 'fdp-thumbnail-details',
  templateUrl: './thumbnail-details.component.html',
  styleUrls: ['./thumbnail-details.component.scss']
})
export class ThumbnailDetailsComponent implements OnInit , AfterContentInit {

    @ViewChild(ThumbnailImageComponent)
    thumbnailImage: ThumbnailImageComponent;

    /** @hidden Start index of currently active items */
    currentActiveSlidesStartIndex = 0;

    /** @hidden Make left navigation button disabled */
    leftButtonDisabled = false;

    /** @hidden Make right navigation button disabled */
    rightButtonDisabled = false;

    @Input()
    loop = false;

    constructor(  private readonly _elementRef: ElementRef, public dialogRef: DialogRef,
         private _cdr: ChangeDetectorRef
          ) {
    }

 /** @hidden */
     get _data(): DialogRefData {
        return this.dialogRef.data;
    }
  ngOnInit(): void {
     this.dialogRef.data.selectedMedia.selected = true;
     this.currentActiveSlidesStartIndex = this.dialogRef.data.mediaList.indexOf(this.dialogRef.data.selectedMedia);
  }

  ngAfterContentInit(): void {
    this.currentActiveSlidesStartIndex = this.dialogRef.data.mediaList.indexOf(this.dialogRef.data.selectedMedia);
    if (this.dialogRef.data.mediaList.length > 0) {
        this._buttonVisibility();
    } else {
        this.leftButtonDisabled = true;
        this.rightButtonDisabled = true;
        this._cdr.markForCheck();
   }
  }

  /** @hidden */
  @HostListener('keydown.arrowright', ['$event'])
  onKeydownArrowRight(event: KeyboardEvent): void {
      event.preventDefault();
      this.dialogRef.data.rtl ? this.previous() : this.next();
  }

  /** @hidden */
  @HostListener('keydown.arrowleft', ['$event'])
  onKeydownArrowLeft(event: KeyboardEvent): void {
      event.preventDefault();
      this.dialogRef.data.rtl ? this.next() : this.previous();
  }

/** @hidden Handles navigation button visibility */
 _buttonVisibility(): void {
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

/** Transitions to the previous image in the thumbnail. */
    previous(): void {
    if (this.currentActiveSlidesStartIndex  <= 0) {
        return;
    } else {
        this.currentActiveSlidesStartIndex = this.currentActiveSlidesStartIndex  - 1;
        this.dialogRef.data.selectedMedia = this.dialogRef.data.mediaList[this.currentActiveSlidesStartIndex];
        this.dialogRef.data.mediaList.forEach(item => item.selected = false);
        this.dialogRef.data.mediaList[this.currentActiveSlidesStartIndex].selected = true;
        this._cdr.detectChanges();
    }
    this._buttonVisibility();
 }

/** Transitions to the next image in the thumbnail. */
    next(): void {
    if (this.currentActiveSlidesStartIndex  >= this.dialogRef.data.mediaList.length - 1) {
        return;
    }    else {
        this.currentActiveSlidesStartIndex = this.currentActiveSlidesStartIndex  + 1;
        this.dialogRef.data.mediaList.forEach(item => item.selected = false);
        this.dialogRef.data.mediaList[this.currentActiveSlidesStartIndex].selected = true;
        this.dialogRef.data.selectedMedia = this.dialogRef.data.mediaList[this.currentActiveSlidesStartIndex];
    }
    this._buttonVisibility();
}

    /** @hidden */
    thumbnailClickHandle(selectedMedia: Media): void {
        this.dialogRef.data.selectedMedia = selectedMedia;
        this.currentActiveSlidesStartIndex = this.dialogRef.data.mediaList.indexOf(this.dialogRef.data.selectedMedia);
        this._buttonVisibility();
        this._cdr.detectChanges();
    }

    /** @hidden */
    _focus(): void {

        const el = this._elementRef.nativeElement;
        if (el !== document.activeElement) {
            el.focus({ preventScroll: true });
        }
    }

    closeDialog(): void {
        if (this.dialogRef.data.mediaList.length > this.dialogRef.data.maxImages) {
            this.dialogRef.data.mediaList[this.dialogRef.data.maxImages - 1].overlayRequired = true;
        }
        this.dialogRef.close();

    }


}
