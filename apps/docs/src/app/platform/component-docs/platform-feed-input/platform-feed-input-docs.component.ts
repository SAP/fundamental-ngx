import { Component } from '@angular/core';

import * as feedInputT from '!raw-loader!./platform-feed-input-examples/platform-feed-input-example/platform-feed-input-example.component.ts';

@Component({
    selector: 'app-feed-input',
    templateUrl: './platform-feed-input-docs.component.html'
})
export class PlatformFeedInputDocsComponent {

    feedInput = feedInputT;

}
