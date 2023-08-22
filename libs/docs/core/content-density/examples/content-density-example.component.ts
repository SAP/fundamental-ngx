import { Component } from '@angular/core';
import { GlobalContentDensityService } from '@fundamental-ngx/core/content-density';
import { AsyncPipe } from '@angular/common';
import { ContentDensityUserComponent } from './content-density-user/content-density-user.component';
import { FormsModule } from '@angular/forms';
import { SelectModule } from '@fundamental-ngx/core/select';

@Component({
    selector: 'fd-content-density-example',
    templateUrl: './content-density-example.component.html',
    standalone: true,
    imports: [SelectModule, FormsModule, ContentDensityUserComponent, AsyncPipe]
})
export class ContentDensityExampleComponent {
    constructor(readonly _contentDensityService: GlobalContentDensityService) {}

    onChange($event: any): void {
        this._contentDensityService.updateContentDensity($event);
    }
}
