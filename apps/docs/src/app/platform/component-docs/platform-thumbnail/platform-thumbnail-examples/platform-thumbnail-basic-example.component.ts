import { Component } from '@angular/core';
import { Media } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-thumbnail-basic-example',
    templateUrl: './platform-thumbnail-basic-example.component.html'
})
export class PlatformThumbnailBasicExampleComponent {

    data: Media[] = [{
        thumbnailUrl: 'http://picsum.photos/id/320/640/480',
        mediaType: 'image',
        mediaUrl: 'http://picsum.photos/id/320/640/480',
        alt: 'Failed to load http://picsum.photos/id/320/640/480',
        label: 'nature'
    },
    {
        thumbnailUrl: 'http://picsum.photos/id/315/640/480',
        mediaType: 'image',
        mediaUrl: 'http://picsum.photos/id/315/640/480',
        alt: 'Failed to load http://picsum.photos/id/315/640/480',
        label: 'animal'
    },
    {
        thumbnailUrl: 'http://picsum.photos/id/316/600',
        mediaType: 'image',
        mediaUrl: 'http://picsum.photos/id/316/600',
        alt: 'Failed to load http://picsum.photos/id/316/600',
        label: 'culture'
    },
    {
        thumbnailUrl: 'http://picsum.photos/id/316/600',
        mediaType: 'image',
        mediaUrl: 'http://picsum.photos/id/316/600',
        alt: 'Failed to load http://picsum.photos/id/316/600',
        label: 'sports'
    },
    {
        thumbnailUrl: 'http://picsum.photos/id/317/600',
        mediaType: 'image',
        mediaUrl: 'http://picsum.photos/id/316/600',
        alt: 'Failed to load http://picsum.photos/id/316/600',
        label: 'art'
    }
    ];

}
