import { Component } from '@angular/core';
import { GlobalContentDensityService } from '@fundamental-ngx/core/content-density';

@Component({
    selector: 'fd-content-density-example',
    templateUrl: './content-density-example.component.html'
})
export class ContentDensityExampleComponent {
    constructor(readonly _contentDensityService: GlobalContentDensityService) {}

    onChange($event: any): void {
        this._contentDensityService.updateContentDensity($event);
    }
}
