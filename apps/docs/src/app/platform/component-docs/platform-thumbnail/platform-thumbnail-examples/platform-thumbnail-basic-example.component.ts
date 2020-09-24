import { Component } from '@angular/core';
import { Media } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-thumbnail-basic-example',
    templateUrl: './platform-thumbnail-basic-example.component.html'
})
export class PlatformThumbnailBasicExampleComponent {

    data: Media[] = [{
        thumbnailUrl: 'http://lorempixel.com/640/480/nature/1',
        mediaType: 'image',
        mediaUrl: 'http://lorempixel.com/640/480/nature/1',
        alt: 'Failed to load http://lorempixel.com/640/480/nature/1',
        label: 'nature'
    },
    {
        thumbnailUrl: 'http://lorempixel.com/480/640/animals/1',
        mediaType: 'image',
        mediaUrl: 'http://lorempixel.com/480/640/animals/1',
        alt: 'Failed to load http://lorempixel.com/480/640/animals/1',
        label: 'animal'
    },
    {
        thumbnailUrl: 'http://lorempixel.com/g/600/600/fashion/1',
        mediaType: 'image',
        mediaUrl: 'http://lorempixel.com/g/600/600/fashion/1',
        alt: 'Failed to load http://lorempixel.com/g/600/600/fashion/1',
        label: 'culture'
    },
    {
        thumbnailUrl: 'http://lorempixel.com/400/200/sports/1/',
        mediaType: 'image',
        mediaUrl: 'http://lorempixel.com/400/200/sports/1/',
        alt: 'Failed to load http://lorempixel.com/400/200/sports/1/',
        label: 'sports'
    },
    {
        thumbnailUrl: 'http://lorempixel.com/400/400/abstract/1',
        mediaType: 'image',
        mediaUrl: 'http://lorempixel.com/400/400/abstract/1',
        alt: 'Failed to load http://lorempixel.com/400/400/abstract/1',
        label: 'art'
    }
    ];

}
