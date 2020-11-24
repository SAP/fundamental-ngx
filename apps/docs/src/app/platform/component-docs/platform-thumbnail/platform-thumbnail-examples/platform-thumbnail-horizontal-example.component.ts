import { Component } from '@angular/core';
import { Media } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-thumbnail-horizontal-example',
    templateUrl: './platform-thumbnail-horizontal-example.component.html'
})
export class PlatformThumbnailHorizontalExampleComponent {

    data: Media[] = [{
        thumbnailUrl: 'http://picsum.photos/id/316/600',
        mediaType: 'image',
        mediaUrl: 'http://picsum.photos/id/316/600',
        alt: 'Failed to load http://picsum.photos/id/316/600',
        label: 'nature'
    },
    {
        thumbnailUrl: 'http://picsum.photos/id/317/600',
        mediaType: 'image',
        mediaUrl: 'http://picsum.photos/id/317/600',
        alt: 'Failed to load http://picsum.photos/id/317/600',
        label: 'animal'
    },
    {
        thumbnailUrl: 'http://picsum.photos/id/318/600',
        mediaType: 'image',
        mediaUrl: 'http://picsum.photos/id/318/600',
        alt: 'Failed to load http://picsum.photos/id/318/600',
        label: 'culture'
    },
    {
        thumbnailUrl: 'http://picsum.photos/id/319/600',
        mediaType: 'image',
        mediaUrl: 'http://picsum.photos/id/319/600',
        alt: 'Failed to load http://picsum.photos/id/319/600',
        label: 'sports'
    },
    {
        thumbnailUrl: 'http://picsum.photos/id/321/600',
        mediaType: 'image',
        mediaUrl: 'http://picsum.photos/id/321/600',
        alt: 'Failed to load http://picsum.photos/id/321/600',
        label: 'art'
    }
    ];

}
