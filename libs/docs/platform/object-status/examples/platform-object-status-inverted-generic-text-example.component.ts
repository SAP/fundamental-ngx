import { Component } from '@angular/core';
import { ColorAccent } from '@fundamental-ngx/cdk';
import { ObjectStatusComponent } from '@fundamental-ngx/platform/object-status';

@Component({
    selector: 'fdp-platform-object-status-inverted-generic-text-example',
    templateUrl: './platform-object-status-inverted-generic-text-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss'],
    imports: [ObjectStatusComponent]
})
export class PlatformObjectStatusInvertedGenericTextExampleComponent {
    items: ColorAccent[] = new Array(10).fill(null).map((_, index) => (index + 1) as ColorAccent);
}
