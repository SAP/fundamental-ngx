import { Component } from '@angular/core';
import { defaultFormFieldHintOptions } from '@fundamental-ngx/platform/form';
import { HeaderTabsComponent } from '../../../shared/src/lib/core-helpers/header-tabs/header-tabs.component';
import { ImportComponent } from '../../../shared/src/lib/core-helpers/import/import.component';
import { NgFor } from '@angular/common';
import { TableModule } from '@fundamental-ngx/core/table';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { DescriptionComponent } from '../../../shared/src/lib/core-helpers/description/description';
import { HeaderComponent } from '../../../shared/src/lib/core-helpers/header/header.component';
import { DocPageComponent } from '../../../shared/src/lib/core-helpers/doc-page/doc-page.component';

@Component({
    selector: 'app-form-container-header',
    templateUrl: './platform-form-container-header.component.html',
    standalone: true,
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        FocusableGridDirective,
        TableModule,
        NgFor,
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
