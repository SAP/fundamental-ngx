import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-feed-input-example',
    templateUrl: './platform-feed-input-example.component.html'
})
export class PlatformFeedInputExampleComponent {
    feedValue: string;

    onSubmit(value: string): void {
        this.feedValue = value;
    }
}
