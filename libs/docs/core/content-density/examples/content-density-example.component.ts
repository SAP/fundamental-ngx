import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalContentDensityService, provideContentDensity } from '@fundamental-ngx/core/content-density';
import { SelectModule } from '@fundamental-ngx/core/select';
import { ContentDensityUserComponent } from './content-density-user/content-density-user.component';

@Component({
    selector: 'fd-content-density-example',
    templateUrl: './content-density-example.component.html',
    imports: [SelectModule, FormsModule, ContentDensityUserComponent, AsyncPipe],
    providers: [GlobalContentDensityService, provideContentDensity()]
})
export class ContentDensityExampleComponent {
    constructor(readonly _contentDensityService: GlobalContentDensityService) {}

    onChange($event: any): void {
        this._contentDensityService.updateContentDensity($event);
    }
}
