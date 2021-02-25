import { Component } from '@angular/core';
import { Media } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-thumbnail-basic-example',
    templateUrl: './platform-thumbnail-basic-example.component.html'
})
export class PlatformThumbnailBasicExampleComponent {

    data: Media[] = [{
        title: 'Nature Details',
        thumbnailUrl: '//picsum.photos/id/320/640/480',
        mediaType: 'image',
        mediaUrl: '//picsum.photos/id/320/640/480',
        alt: 'Failed to load //picsum.photos/id/320/640/480',
        label: 'nature'
    },
    {
        title: 'Animal Details',
        thumbnailUrl: '//picsum.photos/id/315/640/480',
        mediaType: 'image',
        mediaUrl: '//picsum.photos/id/315/640/480',
        alt: 'Failed to load //picsum.photos/id/315/640/480',
        label: 'animal'
    },
    {
        title: 'Culture Details',
        thumbnailUrl: '//picsum.photos/id/316/600',
        mediaType: 'image',
        mediaUrl: '//picsum.photos/id/316/600',
        alt: 'Failed to load //picsum.photos/id/316/600',
        label: 'culture'
    },
    {
        title: 'Nature Details',
        thumbnailUrl: '//picsum.photos/id/1008/400',
        mediaType: 'video',
        mediaUrl: '//www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        alt: 'Failed to load //picsum.photos/id/1008/400',
        label: 'nature'
    },
    {
        title: 'Art Details',
        thumbnailUrl: '//picsum.photos/id/317/600',
        mediaType: 'image',
        mediaUrl: '//picsum.photos/id/316/600',
        alt: 'Failed to load //picsum.photos/id/316/600',
        label: 'art'
    },
    {
        title: 'Culture Details',
        thumbnailUrl: '//picsum.photos/id/316/600',
        mediaType: 'image',
        mediaUrl: '//picsum.photos/id/316/600',
        alt: 'Failed to load //picsum.photos/id/316/600',
        label: 'culture'
    },
    {
        title: 'Nature Details',
        thumbnailUrl: '//picsum.photos/id/1008/400',
        mediaType: 'video',
        mediaUrl: '//www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        alt: 'Failed to load //picsum.photos/id/1008/400',
        label: 'nature'
    },
    {
        title: 'Art Details',
        thumbnailUrl: '//picsum.photos/id/317/600',
        mediaType: 'image',
        mediaUrl: '//picsum.photos/id/316/600',
        alt: 'Failed to load //picsum.photos/id/316/600',
        label: 'art'
    }
    ];


}
