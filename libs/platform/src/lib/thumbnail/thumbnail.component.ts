import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    HostListener,
    Input,
    OnInit,
    Optional,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { RtlService } from '@fundamental-ngx/cdk/utils';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { BaseComponent } from '@fundamental-ngx/platform/shared';
import { ThumbnailDetailsComponent } from './thumbnail-details/thumbnail-details.component';
import { ThumbnailImageComponent } from './thumbnail-image/thumbnail-image.component';
import { Media } from './thumbnail.interfaces';

let uniqueId = 0;

export class ThumbnailClickedEvent<T extends ThumbnailComponent = ThumbnailComponent, K = Media> {
    /**
     * Thumbnail click event
     * @param source ThumbnailComponent
     * @param payload Media
     */
    constructor(
        /** The source Thumbnail Component of the event. */
        public source: T,
        /** The new value of a control. */
        public payload: K
    ) {}
}
/**
 * @deprecated
 * Thumbnail component is deprecated since version 0.40.0
 */
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

    /** Max images to display */
    @Input()
    maxImagesDisplay = 5;

    /** Event emitted upon click of a thumbnail. */
    @Output()
    thumbnailClicked: EventEmitter<ThumbnailClickedEvent> = new EventEmitter();

    /** Reference to thumbnail images component */
    @ViewChild(forwardRef(() => ThumbnailImageComponent))
    thumbnailImage: ThumbnailImageComponent;

    /** Generate unique id for the thumbnail */
    thumbnailId: string = 'fd-thumbnail-dialog-header-' + uniqueId++;

    /** @hidden Start index of currently active items */
    currentActiveSlidesStartIndex = 0;

    /** @hidden Currently selected media. */
    public selectedMedia: Media;

    /** @hidden */
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        private _dialogService: DialogService,
        @Optional() private readonly _rtlService: RtlService,
        private _cdr: ChangeDetectorRef
    ) {
        super(_changeDetectorRef);
        console.warn('ThumbnailComponent is deprecated since version 0.40.0 and will be removed in next release.');
    }

    /** @hidden Select first media object on init. */
    ngOnInit(): void {
        if (Array.isArray(this.mediaList) && this.mediaList.length > 0) {
            this.selectedMedia = this.mediaList[0];
        }
        this._setOverlay();
    }

    /** @hidden */
    thumbnailClickHandle(selectedMedia: Media): void {
        this.selectedMedia = selectedMedia;
        this.thumbnailClicked.emit(this._createClickEvent(this.selectedMedia));
    }

    /** @hidden */
    openDialog(media: Media = this.selectedMedia): void {
        this.mediaList.forEach((item) => (item.overlayRequired = false));
        this._dialogService.open(ThumbnailDetailsComponent, {
            backdropClickCloseable: false,
            escKeyCloseable: false,
            data: {
                thumbnailId: this.thumbnailId,
                selectedMedia: media,
                mediaList: this.mediaList,
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

    /** @hidden Transitions to the next image in the thumbnail  */
    @HostListener('keydown.arrowright', ['$event'])
    onKeydownArrowRight(event: KeyboardEvent): void {
        event.preventDefault();
        this._isRtl() ? this.previous() : this.next();
    }

    /** @hidden Transitions to the previous image in the thumbnail*/
    @HostListener('keydown.arrowleft', ['$event'])
    onKeydownArrowLeft(event: KeyboardEvent): void {
        event.preventDefault();
        this._isRtl() ? this.next() : this.previous();
    }

    /** Transitions to the previous image in the thumbnail. */
    previous(): void {
        if (this.currentActiveSlidesStartIndex <= 0) {
            return;
        }
        this.currentActiveSlidesStartIndex = this.currentActiveSlidesStartIndex - 1;
        const thumbnailImagesArray = this.thumbnailImage.thumbnailImages.toArray();
        thumbnailImagesArray[this.currentActiveSlidesStartIndex].nativeElement.focus();
        this._cdr.detectChanges();
    }

    /** Transitions to the next image in the thumbnail. */
    next(): void {
        if (this.currentActiveSlidesStartIndex >= this.maxImagesDisplay - 1) {
            return;
        }
        this.currentActiveSlidesStartIndex = this.currentActiveSlidesStartIndex + 1;
        const thumbnailImagesArray = this.thumbnailImage.thumbnailImages.toArray();
        thumbnailImagesArray[this.currentActiveSlidesStartIndex].nativeElement.focus();
        this._cdr.detectChanges();
    }
}
