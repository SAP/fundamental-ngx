import { Component } from '@angular/core';
import { ColorAccent } from '@fundamental-ngx/cdk/utils';
import { ObjectStatusComponent } from '@fundamental-ngx/platform/object-status';

@Component({
    selector: 'fdp-platform-object-status-clickable-and-icon-example',
    templateUrl: './platform-object-status-clickable-and-icon-example.component.html',
    styleUrls: ['./platform-object-status-clickable-and-icon-example.component.scss'],
    imports: [ObjectStatusComponent]
})
export class PlatformObjectStatusClickableAndIconExampleComponent {
    items: ColorAccent[] = new Array(8).fill(null).map((_, index) => (index + 1) as ColorAccent);

    showAlert(index: ColorAccent): void {
        alert('you clicked the clickable ObjectStatus' + index);
    }

    showObjectStatus(): void {
        alert('you clicked the clickable ObjectStatus');
    }
}
