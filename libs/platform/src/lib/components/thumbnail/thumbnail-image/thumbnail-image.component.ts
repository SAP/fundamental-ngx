import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { Media } from '../thumbnail.component';

@Component({
    selector: 'fdp-thumbnail-image',
    templateUrl: './thumbnail-image.component.html',
    styleUrls: ['./thumbnail-image.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ThumbnailImageComponent implements OnChanges {

    @Input()
    mediaList: Media[];

    @Input()
    isHorizontal = false;

    @Output()
    thumbnailClicked: EventEmitter<Media> = new EventEmitter();

    ngOnChanges(changes: SimpleChanges): void {
        // Select first image by default, if none has been selected
        if (changes.mediaList && Array.isArray(this.mediaList)) {
            const alreadySelected: boolean = this.mediaList.reduce((selected, image) => {
              return  selected || image.selected;
            }, false);
            if (!alreadySelected) {
                this.mediaList[0].selected = true;
            }
        }
    }

    /** @hidden */
    thumbnailClick(selectedMedia: Media): void {
        this.mediaList.forEach(item => item.selected = false);
        selectedMedia.selected = true;
        this.thumbnailClicked.emit(selectedMedia);
    }


}
