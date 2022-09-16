import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-action-bar-with-back-button-example',
    templateUrl: './platform-action-bar-with-back-button-example.component.html',
    styleUrls: ['./platform-action-bar-with-back-button-example.component.scss']
})
export class PlatformActionBarWithBackButtonExampleComponent {
    onBackButtonClick(): void {
        alert('Back button clicked');
    }
}
