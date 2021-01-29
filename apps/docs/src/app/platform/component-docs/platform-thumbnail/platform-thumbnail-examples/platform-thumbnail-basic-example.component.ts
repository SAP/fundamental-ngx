import { Component } from '@angular/core';
import { Media } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-thumbnail-basic-example',
    templateUrl: './platform-thumbnail-basic-example.component.html'
})
export class PlatformThumbnailBasicExampleComponent {

    data: Media[] = [{
        thumbnailUrl: '//picsum.photos/id/320/640/480',
        mediaType: 'image',
        mediaUrl: '//picsum.photos/id/320/640/480',
        alt: 'Failed to load //picsum.photos/id/320/640/480',
        label: 'nature'
    },
    {
        thumbnailUrl: '//picsum.photos/id/315/640/480',
        mediaType: 'image',
        mediaUrl: '//picsum.photos/id/315/640/480',
        alt: 'Failed to load //picsum.photos/id/315/640/480',
        label: 'animal'
    },
    {
        thumbnailUrl: '//picsum.photos/id/316/600',
        mediaType: 'image',
        mediaUrl: '//picsum.photos/id/316/600',
        alt: 'Failed to load //picsum.photos/id/316/600',
        label: 'culture'
    },
    {
        thumbnailUrl: '//picsum.photos/id/316/600',
        mediaType: 'image',
        mediaUrl: '//picsum.photos/id/316/600',
        alt: 'Failed to load //picsum.photos/id/316/600',
        label: 'sports'
    },
    {
        thumbnailUrl: '//picsum.photos/id/317/600',
        mediaType: 'image',
        mediaUrl: '//picsum.photos/id/317/600',
        alt: 'Failed to load //picsum.photos/id/317/600',
        label: 'art'
    }
    ];

}
