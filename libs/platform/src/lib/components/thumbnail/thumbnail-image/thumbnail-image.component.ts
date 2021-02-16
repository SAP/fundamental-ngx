import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Media } from '../thumbnail.component';
import { ThumbnailDetailsComponent} from '../thumbnail-details/thumbnail-details.component';
import { DialogService, RtlService } from '@fundamental-ngx/core';
@Component({
    selector: 'fdp-thumbnail-image',
    templateUrl: './thumbnail-image.component.html',
    styleUrls: ['./thumbnail-image.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ThumbnailImageComponent implements OnChanges, OnInit {

    constructor(private _dialogService: DialogService,  private  _rtlService: RtlService) {}

    @Input()
    mediaList: Media[];

    @Input()
    isHorizontal = false;

    @Input()
    maxImages = 5;


    @Output()
    thumbnailClicked: EventEmitter<Media> = new EventEmitter();

    ngOnInit(): void {

        if (this.mediaList.length > this.maxImages) {
            this.mediaList[this.maxImages - 1].overlayRequired = true;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        // Select first image by default, if none has been selected
        if (changes.mediaList && Array.isArray(this.mediaList)) {
            const alreadySelected: boolean = this.mediaList.some(image => image.selected);
            if (!alreadySelected) {
                this.mediaList[0].selected = true;
            }
            if (this.mediaList.length > this.maxImages) {
                this.mediaList[this.maxImages - 1].overlayRequired = true;
            }
        }
    }



    openDialog(selectedMedia: Media, mediaList: Media[], ): void {
        this.mediaList.forEach(item => item.selected = false);
        this.mediaList.forEach(item => item.overlayRequired = false);
        selectedMedia.selected = true;
        const dialogRef =  this._dialogService.open(ThumbnailDetailsComponent, {
            backdropClickCloseable: false,
            escKeyCloseable: false,
            data: {
                selectedMedia:  selectedMedia,
                mediaList: mediaList,
                rtl:  this._isRtl(),
                maxImages: this.maxImages
            }
        });
    }

    _isRtl(): boolean {
        return this._rtlService?.rtl.getValue();
    }

    /** @hidden */
    thumbnailClick(selectedMedia: Media): void {
        this.mediaList.forEach(item => item.selected = false);
        selectedMedia.selected = true;
        this.thumbnailClicked.emit(selectedMedia);
    }


}
