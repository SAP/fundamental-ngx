import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fdp-platform-action-bar-cozy-mode-example',
    templateUrl: './platform-action-bar-cozy-mode-example.component.html',
    styleUrls: ['./platform-action-bar-cozy-mode-example.component.scss']
})
export class PlatformActionBarCozyModeExampleComponent {

    onBackBuutonClick() {
        alert('Back button clicked');
    }

}
