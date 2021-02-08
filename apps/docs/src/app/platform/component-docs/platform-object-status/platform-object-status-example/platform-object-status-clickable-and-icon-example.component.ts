import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-object-status-clickable-and-icon-example',
    templateUrl: './platform-object-status-clickable-and-icon-example.component.html',
    styleUrls: ['./platform-object-status-clickable-and-icon-example.component.scss']
})
export class PlatformObjectStatusClickableAndIconExampleComponent {
    showAlert(index: number): void {
        alert('you clicked the clickable ObjectStatus' + index);
    }
    showObjectStatus(): void {
        alert('you clicked the clickable ObjectStatus');
    }
}
