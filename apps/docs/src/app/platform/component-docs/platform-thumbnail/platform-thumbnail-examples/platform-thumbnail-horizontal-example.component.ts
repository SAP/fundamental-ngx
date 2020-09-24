import { Component } from '@angular/core';
import { Media } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-thumbnail-horizontal-example',
    templateUrl: './platform-thumbnail-horizontal-example.component.html'
})
export class PlatformThumbnailHorizontalExampleComponent {

    data: Media[] = [{
        thumbnailUrl: 'http://lorempixel.com/640/480/nature/2',
        mediaType: 'image',
        mediaUrl: 'http://lorempixel.com/640/480/nature/2',
        alt: 'Failed to load http://lorempixel.com/640/480/nature/2',
        label: 'nature'
    },
    {
        thumbnailUrl: 'http://lorempixel.com/480/640/animals/2',
        mediaType: 'image',
        mediaUrl: 'http://lorempixel.com/480/640/animals/2',
        alt: 'Failed to load http://lorempixel.com/480/640/animals/2',
        label: 'animal'
    },
    {
        thumbnailUrl: 'http://lorempixel.com/600/600/city/2',
        mediaType: 'image',
        mediaUrl: 'http://lorempixel.com/600/600/city/2',
        alt: 'Failed to load http://lorempixel.com/600/600/city/2',
        label: 'culture'
    },
    {
        thumbnailUrl: 'http://lorempixel.com/640/480/sports/2',
        mediaType: 'image',
        mediaUrl: 'http://lorempixel.com/640/480/sports/2',
        alt: 'Failed to load http://lorempixel.com/640/480/sports/2',
        label: 'sports'
    },
    {
        thumbnailUrl: 'http://lorempixel.com/400/400/abstract/2',
        mediaType: 'image',
        mediaUrl: 'http://lorempixel.com/400/400/abstract/2',
        alt: 'Failed to load http://lorempixel.com/400/400/abstract/2',
        label: 'art'
    }
    ];

}
