import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base';

export interface Media {
    thumbnailUrl: string;
    mediaType: string;
    mediaUrl: string;
    captionFile?: string;
    audioDescFile?: string;
    alt: string;    
    label: string;
    selected?: boolean;
}

export class ThumbnailClickedEvent<T extends ThumbnailComponent = ThumbnailComponent, K = Media> {
    constructor(
        /** The source Thumbnail Component of the event. */
        public source: T,
        /** The new value of a control. */
        public payload: K
    ) { }
}

@Component({
    selector: 'fdp-thumbnail',
    templateUrl: './thumbnail.component.html',
    styleUrls: ['./thumbnail.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ThumbnailComponent extends BaseComponent implements OnInit {

    /** List of media objects to display. */
    @Input()
    mediaList: Media[];

    /** Display orientation of Thumnail component. */
    @Input()
    isHorizontal = false;

    /** Event emitted upon click of a thumbnail. */
    @Output()
    thumbnailClicked: EventEmitter<ThumbnailClickedEvent> = new EventEmitter();

    /** @hidden Currently selected media. */
    public selectedMedia: Media;

    /** @hidden Select first media object on init. */
    ngOnInit(): void {
        if (Array.isArray(this.mediaList) && this.mediaList.length > 0) {
            this.selectedMedia = this.mediaList[0];
        }
    }

    /** @hidden */
    thumbnailClickHandle(selectedMedia: Media): void {
        this.selectedMedia = selectedMedia;
        this.thumbnailClicked.emit(this.createClickEvent(this.selectedMedia));
    }

    /** @hidden
     * Create Thumbnail click event instance
     */
    createClickEvent(value: Media): ThumbnailClickedEvent {
        return new ThumbnailClickedEvent(this, value);
    }

}
