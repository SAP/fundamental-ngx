import { Component } from '@angular/core';
import { Media } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-thumbnail-video-media-example',
    templateUrl: './platform-thumbnail-basic-example.component.html'
})
export class PlatformThumbnailVideoMediaExampleComponent {

    data: Media[] = [{
        thumbnailUrl: 'http://picsum.photos/id/1018/400/3',
        mediaType: 'video',
        mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        alt: 'Failed to load http://picsum.photos/id/1018/400/3',
        label: 'nature'
    },
    {
        thumbnailUrl: 'http://lorempixel.com/400/400/animals/5',
        mediaType: 'video',
        mediaUrl: 'https://cdn.bitdegree.org/learn/Pexels%20Videos%203373.mp4?raw=true',
        alt: 'Failed to load http://lorempixel.com/400/400/animals/5',
        label: 'animal'
    },
    {
        thumbnailUrl: 'http://lorempixel.com/g/400/200/animals/7',
        mediaType: 'video',
        mediaUrl: 'https://cdn.bitdegree.org/learn/Pexels%20Videos%203373.mp4?raw=true',
        alt: 'Failed to load http://lorempixel.com/g/400/200/animals/7',
        label: 'culture'
    },
    {
        thumbnailUrl: 'http://lorempixel.com/400/200/sports/5',
        mediaType: 'video',
        mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        alt: 'Failed to load http://lorempixel.com/400/200/sports/5',
        label: 'dance'
    },
    {
        thumbnailUrl: 'http://picsum.photos/id/1018/400/7',
        mediaType: 'video',
        mediaUrl: 'https://cdn.bitdegree.org/learn/Pexels%20Videos%203373.mp4?raw=true',
        alt: 'Failed to load http://picsum.photos/id/1018/400/7',
        label: 'nature'
    }
    ];

}
