import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Media } from '../thumbnail.component';

@Component({
    selector: 'fdp-thumbnail-image',
    templateUrl: './thumbnail-image.component.html',
    styleUrls: ['./thumbnail-image.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ThumbnailImageComponent {

    @Input()
    mediaList: Media[];

    @Input()
    isHorizontal = false;

    @Output()
    thumbnailClicked: EventEmitter<Media> = new EventEmitter();

    /** @hidden */
    thumbnailClick(selectedMedia: Media): void {
        this.thumbnailClicked.emit(selectedMedia);
    }


}
