import {
    Component,
    Input,
    Optional,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    OnInit,
    ChangeDetectorRef,
    ViewChildren,
    QueryList,
    ElementRef
} from '@angular/core';

import { KeyUtil, RtlService } from '@fundamental-ngx/core/utils';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { Media } from '../thumbnail.interfaces';
import { SPACE } from '@angular/cdk/keycodes';

@Component({
    selector: 'fdp-thumbnail-image',
    templateUrl: './thumbnail-image.component.html',
    styleUrls: ['./thumbnail-image.component.scss']
})
export class ThumbnailImageComponent implements OnChanges, OnInit {
    /** media list obejct contains group of Media object.*/
    @Input()
    mediaList: Media[];

    /** Boolean to set the orientaiton of thumbnail images.*/
    @Input()
    isHorizontal = false;

    /** Maximum limit for the thumbnail images to display */
    @Input()
    maxImages = 5;

    /** Role description for the thumbnail image  */
    @Input()
    roleDescription: string;

    @Input()
    thumbnailId: string;

    /** Output event for thumbnail image click */
    @Output()
    thumbnailClicked: EventEmitter<Media> = new EventEmitter();

    @Output()
    openDetailsDialog = new EventEmitter<Media>();

    /** List of thumbnail images reference */
    @ViewChildren('thumbnailImage')
    thumbnailImages: QueryList<ElementRef>;

    /** @hidden */
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        private _dialogService: DialogService,
        @Optional() private _rtlService: RtlService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._setOverlay();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.mediaList && Array.isArray(this.mediaList)) {
            const alreadySelected: boolean = this.mediaList.some((image) => image.selected);
            if (!alreadySelected) {
                this.mediaList[0].selected = true;
            }
        }
        this._changeDetectorRef.detectChanges();
    }

    /** Opens the Dialog when the imgaes croses the maximum number of images to display */
    openDialog(media: Media): void {
        this.mediaList.forEach((item) => (item.selected = false));
        media.selected = true;
        this.openDetailsDialog.emit(media);
    }

    /** @hidden */
    thumbnailClick(selectedMedia: Media, event?: Event): void {
        if (event instanceof KeyboardEvent && KeyUtil.isKeyCode(event, SPACE)) {
            event?.preventDefault();
        }
        this.mediaList.forEach((item) => (item.selected = false));
        selectedMedia.selected = true;
        this.thumbnailClicked.emit(selectedMedia);
    }

    /** @hidden  returns boolean value for rtl */
    private _isRtl(): boolean {
        return this._rtlService?.rtl.getValue();
    }

    private _setOverlay(): void {
        if (this.mediaList.length > this.maxImages) {
            this.mediaList[this.maxImages - 1].overlayRequired = true;
        }
    }

    openImage(image: Media, event?: Event): void {
        image.overlayRequired ? this.openDialog(image) : this.thumbnailClick(image, event);
    }
}
