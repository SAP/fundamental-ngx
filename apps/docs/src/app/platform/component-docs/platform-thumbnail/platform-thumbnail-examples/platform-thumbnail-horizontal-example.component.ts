import { Component } from '@angular/core';
import { Media } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-thumbnail-horizontal-example',
    templateUrl: './platform-thumbnail-horizontal-example.component.html'
})
export class PlatformThumbnailHorizontalExampleComponent {

    data: Media[] = [{
        thumbnailUrl: 'http://lorempixel.com/400/400/nature',
        mediaType: 'image',
        mediaUrl: 'http://lorempixel.com/400/400/nature',
        alt: 'Failed to load http://lorempixel.com/400/400/nature',
        label: 'nature'
    },
    {
        thumbnailUrl: 'http://lorempixel.com/400/400/',
        mediaType: 'image',
        mediaUrl: 'http://lorempixel.com/400/400/',
        alt: 'Failed to load http://lorempixel.com/400/400/',
        label: 'animal'
    },
    {
        thumbnailUrl: 'http://lorempixel.com/g/400/200/',
        mediaType: 'image',
        mediaUrl: 'http://lorempixel.com/g/400/200/',
        alt: 'Failed to load http://lorempixel.com/g/400/200/',
        label: 'culture'
    },
    {
        thumbnailUrl: 'http://lorempixel.com/400/200/sports/1/',
        mediaType: 'image',
        mediaUrl: 'http://lorempixel.com/400/200/sports/1/',
        alt: 'Failed to load http://lorempixel.com/400/200/sports/1/',
        label: 'dance'
    },
    {
        thumbnailUrl: 'http://lorempixel.com/400/400/nature',
        mediaType: 'image',
        mediaUrl: 'http://lorempixel.com/400/400/nature',
        alt: 'Failed to load http://lorempixel.com/400/400/nature',
        label: 'nature'
    }
    ];

}
