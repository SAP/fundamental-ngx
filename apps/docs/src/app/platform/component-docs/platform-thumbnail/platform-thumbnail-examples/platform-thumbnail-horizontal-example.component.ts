import { Component } from '@angular/core';
import { Media } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-thumbnail-horizontal-example',
    templateUrl: './platform-thumbnail-horizontal-example.component.html'
})
export class PlatformThumbnailHorizontalExampleComponent {

    data: Media[] = [{
        title: 'Nature Details',
        thumbnailUrl: '//picsum.photos/id/316/600',
        mediaType: 'image',
        mediaUrl: '//picsum.photos/id/316/600',
        alt: 'Failed to load //picsum.photos/id/316/600',
        label: 'nature'
    },
    {
        title: 'Animal Details',
        thumbnailUrl: '//picsum.photos/id/317/600',
        mediaType: 'image',
        mediaUrl: '//picsum.photos/id/317/600',
        alt: 'Failed to load //picsum.photos/id/317/600',
        label: 'animal'
    },
    {
        title: 'Culture Details',
        thumbnailUrl: '//picsum.photos/id/318/600',
        mediaType: 'image',
        mediaUrl: '//picsum.photos/id/318/600',
        alt: 'Failed to load //picsum.photos/id/318/600',
        label: 'culture'
    },
    {
        title: 'Sports Details',
        thumbnailUrl: '//picsum.photos/id/319/600',
        mediaType: 'image',
        mediaUrl: '//picsum.photos/id/319/600',
        alt: 'Failed to load //picsum.photos/id/319/600',
        label: 'sports'
    },
    {
        title: 'Art Details',
        thumbnailUrl: '//picsum.photos/id/321/600',
        mediaType: 'image',
        mediaUrl: '//picsum.photos/id/321/600',
        alt: 'Failed to load //picsum.photos/id/321/600',
        label: 'art'
    }
    ];

}
