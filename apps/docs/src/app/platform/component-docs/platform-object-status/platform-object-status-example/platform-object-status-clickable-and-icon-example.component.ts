import { Component } from '@angular/core';
import { IndicationColorType } from '@fundamental-ngx/platform/object-status';

@Component({
    selector: 'fdp-platform-object-status-clickable-and-icon-example',
    templateUrl: './platform-object-status-clickable-and-icon-example.component.html',
    styleUrls: ['./platform-object-status-clickable-and-icon-example.component.scss']
})
export class PlatformObjectStatusClickableAndIconExampleComponent {
    items: IndicationColorType[] = [1, 2, 3, 4, 5, 6, 7, 8];

    showAlert(index: IndicationColorType): void {
        alert('you clicked the clickable ObjectStatus' + index);
    }

    showObjectStatus(): void {
        alert('you clicked the clickable ObjectStatus');
    }
}
