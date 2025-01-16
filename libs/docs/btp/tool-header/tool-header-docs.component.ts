import { Component } from '@angular/core';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { TableModule } from '@fundamental-ngx/core/table';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getExampleFile,
    SeparatorComponent
} from '@fundamental-ngx/docs/shared';
import { ToolHeaderAutoModeExampleComponent } from './examples/auto-mode-example/auto-mode-example.component';
import { ToolHeaderBasicExampleComponent } from './examples/basic-example/tool-header-basic-example.component';
import { CustomLogoExampleComponent } from './examples/custom-logo-example/custom-logo-example.component';
import { MenuButtonExampleComponent } from './examples/menu-button-example/menu-button-example.component';
import { ProductSwitchExampleComponent } from './examples/product-switch-example/product-switch-example.component';
import { UsageWithLayoutExampleComponent } from './examples/usage-with-layout-example/usage-with-layout-example.component';

@Component({
    templateUrl: './tool-header-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        FocusableGridDirective,
        TableModule,
        ComponentExampleComponent,
        CodeExampleComponent,
        ToolHeaderBasicExampleComponent,
        SeparatorComponent,
        ToolHeaderAutoModeExampleComponent,
        ProductSwitchExampleComponent,
        MenuButtonExampleComponent,
        CustomLogoExampleComponent,
        MessageStripComponent,
        UsageWithLayoutExampleComponent
    ]
})
export class ToolHeaderDocsComponent {
    basicExample: ExampleFile[] = [
        getExampleFile('basic-example/tool-header-basic-example.component.html'),
        getExampleFile('basic-example/tool-header-basic-example.component.ts', {
            selector: 'tool-header-basic-example',
            component: 'ToolHeaderBasicExampleComponent'
        })
    ];
    autoModeExample: ExampleFile[] = [
        getExampleFile('auto-mode-example/auto-mode-example.component.html'),
        getExampleFile('auto-mode-example/auto-mode-example.component.ts', {
            selector: 'tool-header-auto-mode-example',
            component: 'ToolHeaderAutoModeExampleComponent'
        })
    ];
    toolLayoutExample: ExampleFile[] = [
        getExampleFile('usage-with-layout-example/usage-with-layout-example.component.html'),
        getExampleFile('usage-with-layout-example/usage-with-layout-example.component.ts', {
            selector: 'tool-layout-usage-with-layout-example',
            component: 'UsageWithLayoutExampleComponent'
        })
    ];
    menuButtonExample: ExampleFile[] = [
        getExampleFile('menu-button-example/menu-button-example.component.ts', {
            selector: 'tool-header-menu-button-example',
            component: 'MenuButtonExampleComponent'
        })
    ];
    productSwitchExample: ExampleFile[] = [
        getExampleFile('product-switch-example/product-switch-example.component.ts', {
            selector: 'tool-header-product-switch-example',
            component: 'ProductSwitchExampleComponent'
        })
    ];
    customLogoExample: ExampleFile[] = [
        getExampleFile('custom-logo-example/custom-logo-example.component.ts', {
            selector: 'tool-header-custom-logo-example',
            component: 'CustomLogoExampleComponent'
        })
    ];
}
