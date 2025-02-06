import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { SmartFilterBarCustomToolbarExampleComponent } from './examples/custom-toolbar/smart-filter-bar-custom-toolbar-example.component';
import { PlatformSmartFilterBarLoadingExampleComponent } from './examples/loading/platform-smart-filter-bar-loading-example.component';
import { PlatformSmartFilterBarBasicExampleComponent } from './examples/platform-smart-filter-bar-basic-example.component';
import { PlatformSmartFilterBarCustomFilterExampleComponent } from './examples/platform-smart-filter-bar-custom-filter-example.component';
import { PlatformSmartFilterBarCustomLabelsExampleComponent } from './examples/platform-smart-filter-bar-custom-labels-example.component';
import { PlatformSmartFilterBarDynamicPageExampleComponent } from './examples/platform-smart-filter-bar-dynamic-page-example.component';
import { PlatformSmartFilterBarObservableExampleComponent } from './examples/platform-smart-filter-bar-observable-example.component';

@Component({
    selector: 'app-smart-filter-bar',
    templateUrl: './platform-smart-filter-bar-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformSmartFilterBarBasicExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformSmartFilterBarObservableExampleComponent,
        PlatformSmartFilterBarCustomFilterExampleComponent,
        PlatformSmartFilterBarCustomLabelsExampleComponent,
        PlatformSmartFilterBarDynamicPageExampleComponent,
        PlatformSmartFilterBarLoadingExampleComponent,
        SmartFilterBarCustomToolbarExampleComponent
    ]
})
export class PlatformSmartFilterBarDocsComponent {
    sfbBasic: ExampleFile[] = [
        getExampleFile('platform-smart-filter-bar-basic-example.component.html'),
        getExampleFile('platform-smart-filter-bar-basic-example.component.ts', {
            selector: 'platform-smart-filter-bar-basic-example',
            component: 'PlatformSmartFilterBarBasicExampleComponent'
        })
    ];

    sfbCustomDataSource: ExampleFile[] = [
        getExampleFile('platform-smart-filter-bar-observable-example.component.html'),
        getExampleFile('platform-smart-filter-bar-observable-example.component.ts', {
            selector: 'smart-filter-bar-observable-example',
            component: 'PlatformSmartFilterBarObservableExampleComponent'
        })
    ];

    sfbCustomFilters: ExampleFile[] = [
        getExampleFile('platform-smart-filter-bar-custom-filter-example.component.html'),
        getExampleFile('platform-smart-filter-bar-custom-filter-example.component.ts', {
            selector: 'platform-smart-filter-bar-custom-filter-example',
            component: 'PlatformSmartFilterBarCustomFilterExampleComponent'
        })
    ];

    sfbCustomLabels: ExampleFile[] = [
        getExampleFile('platform-smart-filter-bar-custom-labels-example.component.html'),
        getExampleFile('platform-smart-filter-bar-custom-labels-example.component.ts', {
            selector: 'platform-smart-filter-bar-custom-labels-example',
            component: 'PlatformSmartFilterBarCustomLabelsExampleComponent'
        })
    ];

    sfbDynamicPage: ExampleFile[] = [
        getExampleFile('platform-smart-filter-bar-dynamic-page-example.component.html'),
        getExampleFile('platform-smart-filter-bar-dynamic-page-example.component.ts', {
            selector: 'platform-smart-filter-bar-dynamic-page-example',
            component: 'PlatformSmartFilterBarDynamicPageExampleComponent'
        })
    ];

    sfbLoading: ExampleFile[] = [
        getExampleFile('loading/platform-smart-filter-bar-loading-example.component.html'),
        getExampleFile('loading/platform-smart-filter-bar-loading-example.component.ts', {
            selector: 'platform-smart-filter-bar-loading-example',
            component: 'PlatformSmartFilterBarLoadingExampleComponent'
        })
    ];

    sfbCustomToolbar: ExampleFile[] = [
        getExampleFile('custom-toolbar/smart-filter-bar-custom-toolbar-example.component.html'),
        getExampleFile('custom-toolbar/smart-filter-bar-custom-toolbar-example.component.ts', {
            selector: 'smart-filter-bar-custom-toolbar-example',
            component: 'SmartFilterBarCustomToolbarExampleComponent'
        })
    ];
}
