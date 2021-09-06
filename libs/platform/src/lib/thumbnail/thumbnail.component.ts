import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Optional, Output, ViewEncapsulation } from '@angular/core';

import { RtlService } from '@fundamental-ngx/core/utils';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { BaseComponent } from '@fundamental-ngx/platform/shared';
import { ThumbnailDetailsComponent } from './thumbnail-details/thumbnail-details.component';
import { Media } from './thumbnail.interfaces';

export class ThumbnailClickedEvent<T extends ThumbnailComponent = ThumbnailComponent, K = Media> {
    constructor(
        /** The source Thumbnail Component of the event. */
        public source: T,
        /** The new value of a control. */
        public payload: K
    ) {}
}

@Component({
    selector: 'fdp-thumbnail',
    templateUrl: './thumbnail.component.html',
    styleUrls: ['./thumbnail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ThumbnailComponent extends BaseComponent implements OnInit {
    /** List of media objects to display. */
    @Input()
    mediaList: Media[];

    /** Display orientation of Thumnail component. */
    @Input()
    isHorizontal = false;

    @Input()
    maxImagesDisplay = 5;

    /** Event emitted upon click of a thumbnail. */
    @Output()
    thumbnailClicked: EventEmitter<ThumbnailClickedEvent> = new EventEmitter();

    /** @hidden Currently selected media. */
    public selectedMedia: Media;

    /** @hidden */
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        private _dialogService: DialogService,
        @Optional() private readonly _rtlService: RtlService
    ) {
        super(_changeDetectorRef);
    }

    /** @hidden Select first media object on init. */
    ngOnInit(): void {
        if (Array.isArray(this.mediaList) && this.mediaList.length > 0) {
            this.selectedMedia = this.mediaList[0];
        }
        this._setOverlay();
    }

    thumbnailClickHandle(selectedMedia: Media): void {
        this.selectedMedia = selectedMedia;
        this.thumbnailClicked.emit(this._createClickEvent(this.selectedMedia));
    }

    openDialog(selectedMedia: Media, mediaList: Media[]): void {
        mediaList.forEach((item) => (item.overlayRequired = false));
        const dialogRef = this._dialogService.open(ThumbnailDetailsComponent, {
            backdropClickCloseable: false,
            escKeyCloseable: false,
            data: {
                selectedMedia: selectedMedia,
                mediaList: mediaList,
                rtl: this._isRtl(),
                maxImages: this.maxImagesDisplay
            }
        });
    }

    /** @hidden returns rtl value */
    _isRtl(): boolean {
        return this._rtlService?.rtl.getValue();
    }

    /** @hidden Create Thumbnail click event instance */
    private _createClickEvent(value: Media): ThumbnailClickedEvent {
        return new ThumbnailClickedEvent(this, value);
    }

    /** @hidden */
    private _setOverlay(): void {
        if (this.mediaList.length > this.maxImagesDisplay) {
            this.mediaList[this.maxImagesDisplay - 1].overlayRequired = true;
        }
    }
}
