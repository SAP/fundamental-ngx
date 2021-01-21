import { Component } from '@angular/core';
import { Media } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-thumbnail-video-media-example',
    templateUrl: './platform-thumbnail-basic-example.component.html'
})
export class PlatformThumbnailVideoMediaExampleComponent {

    data: Media[] = [{
        thumbnailUrl: 'http://picsum.photos/id/1008/400',
        mediaType: 'video',
        mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        captionFile: 'https://gist.github.com/samdutton/ca37f3adaf4e23679957b8083e061177',
        audioDescFile: 'https://gist.github.com/samdutton/ca37f3adaf4e23679957b8083e061177',
        alt: 'Failed to load http://picsum.photos/id/1008/400',
        label: 'nature',

    },
    {
        thumbnailUrl: 'http://picsum.photos/id/1004/400',
        mediaType: 'video',
        mediaUrl: 'https://cdn.bitdegree.org/learn/Pexels%20Videos%203373.mp4?raw=true',
        captionFile: 'https://gist.github.com/samdutton/ca37f3adaf4e23679957b8083e061177',
        audioDescFile: 'https://gist.github.com/samdutton/ca37f3adaf4e23679957b8083e061177',
        alt: 'Failed to load http://picsum.photos/id/1004/400',
        label: 'animal'

    },
    {
        thumbnailUrl: 'http://picsum.photos/id/1001/400',
        mediaType: 'video',
        mediaUrl: 'https://cdn.bitdegree.org/learn/Pexels%20Videos%203373.mp4?raw=true',
        captionFile: 'https://gist.github.com/samdutton/ca37f3adaf4e23679957b8083e061177',
        audioDescFile: 'https://gist.github.com/samdutton/ca37f3adaf4e23679957b8083e061177',
        alt: 'Failed to load http://picsum.photos/id/1001/400',
        label: 'culture',

    },
    {
        thumbnailUrl: 'http://picsum.photos/id/1002/400',
        mediaType: 'video',
        mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        captionFile: 'https://gist.github.com/samdutton/ca37f3adaf4e23679957b8083e061177',
        audioDescFile: 'https://gist.github.com/samdutton/ca37f3adaf4e23679957b8083e061177',
        alt: 'Failed to load http://picsum.photos/id/1002/400',
        label: 'dance',
        selected: false
    },
    {
        thumbnailUrl: 'http://picsum.photos/id/1019/400',
        mediaType: 'video',
        mediaUrl: 'https://cdn.bitdegree.org/learn/Pexels%20Videos%203373.mp4?raw=true',
        captionFile: 'https://gist.github.com/samdutton/ca37f3adaf4e23679957b8083e061177',
        audioDescFile: 'https://gist.github.com/samdutton/ca37f3adaf4e23679957b8083e061177',
        alt: 'Failed to load http://picsum.photos/id/1019/400',
        label: 'nature',
        selected: false
    }
    ];

}
