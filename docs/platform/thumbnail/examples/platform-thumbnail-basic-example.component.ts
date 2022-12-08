import { Component } from '@angular/core';

import { Media } from '@fundamental-ngx/platform/thumbnail';

@Component({
    selector: 'fdp-platform-thumbnail-basic-example',
    templateUrl: './platform-thumbnail-basic-example.component.html'
})
export class PlatformThumbnailBasicExampleComponent {
    data: Media[] = [
        {
            title: 'Nature Details',
            thumbnailUrl: '//picsum.photos/id/326/640/480',
            mediaType: 'image',
            mediaUrl: '//picsum.photos/id/326/640/480',
            alt: 'Failed to load //picsum.photos/id/326/640/480',
            label: 'nature'
        },
        {
            title: 'Building image',
            thumbnailUrl: '//picsum.photos/id/315/640/480',
            mediaType: 'image',
            mediaUrl: '//picsum.photos/id/315/640/480',
            alt: 'Failed to load //picsum.photos/id/315/640/480',
            label: 'building'
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
            mediaType: 'image',
            mediaUrl: '//picsum.photos/id/1008/400',
            alt: 'Failed to load //picsum.photos/id/1008/400',
            label: 'nature'
        },
        {
            title: 'Art Details',
            thumbnailUrl: '//picsum.photos/id/317/600',
            mediaType: 'image',
            mediaUrl: '//picsum.photos/id/317/600',
            alt: 'Failed to load //picsum.photos/id/317/600',
            label: 'art'
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
            title: 'Nature Details',
            thumbnailUrl: '//picsum.photos/id/1008/400',
            mediaType: 'image',
            mediaUrl: '//picsum.photos/id/1008/400',
            alt: 'Failed to load //picsum.photos/id/1008/400',
            label: 'nature'
        },
        {
            title: 'Art Details',
            thumbnailUrl: '//picsum.photos/id/319/600',
            mediaType: 'image',
            mediaUrl: '//picsum.photos/id/319/600',
            alt: 'Failed to load //picsum.photos/id/319/600',
            label: 'art'
        }
    ];
}
