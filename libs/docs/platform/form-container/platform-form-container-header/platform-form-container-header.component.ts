import { Component } from '@angular/core';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { TableModule } from '@fundamental-ngx/core/table';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';
import { defaultFormFieldHintOptions } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'app-form-container-header',
    templateUrl: './platform-form-container-header.component.html',
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        FocusableGridDirective,
        TableModule,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class PlatformFormContainerHeaderComponent {
    defaultHintOptions = Object.keys(defaultFormFieldHintOptions).map((propName) => [
        propName,
        JSON.stringify(defaultFormFieldHintOptions[propName])
    ]);
}
