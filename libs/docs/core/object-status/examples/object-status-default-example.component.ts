import { Component } from '@angular/core';
import { ColorAccent } from '@fundamental-ngx/cdk/utils';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';

@Component({
    selector: 'fd-object-status-default-example',
    templateUrl: './object-status-default-example.component.html',
    styleUrls: ['./object-status-examples.component.scss'],
    imports: [ObjectStatusComponent]
})
export class ObjectStatusDefaultExampleComponent {
    indicators: ColorAccent[] = Array.from({ length: 8 }, (_, index) => index + 1).map(
        (colorIndex) => colorIndex as ColorAccent
    );

    showAlert(): void {
        alert('you clicked the clickable ObjectStatus');
    }
}
