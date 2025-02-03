import { Component } from '@angular/core';
import { ColorAccent } from '@fundamental-ngx/cdk/utils';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';

@Component({
    selector: 'fd-object-status-inverted-example',
    templateUrl: './object-status-inverted-example.component.html',
    styleUrls: ['./object-status-examples.component.scss'],
    imports: [ObjectStatusComponent]
})
export class ObjectStatusInvertedExampleComponent {
    indicators: ColorAccent[] = Array.from({ length: 10 }, (_, index) => index + 1).map(
        (colorIndex) => colorIndex as ColorAccent
    );
}
