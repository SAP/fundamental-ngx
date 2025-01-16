import { Component } from '@angular/core';
import { ColorAccent } from '@fundamental-ngx/cdk';
import { ObjectStatusComponent } from '@fundamental-ngx/platform/object-status';

@Component({
    selector: 'fdp-platform-object-status-generic-text-example',
    templateUrl: './platform-object-status-generic-text-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss'],
    imports: [ObjectStatusComponent]
})
export class PlatformObjectStatusGenericExampleComponent {
    items: ColorAccent[] = new Array(8).fill(null).map((_, index) => (index + 1) as ColorAccent);
}
