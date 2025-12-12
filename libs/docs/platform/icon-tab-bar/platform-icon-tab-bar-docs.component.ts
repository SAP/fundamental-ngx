import { Component } from '@angular/core';
import { TabConfig } from '@fundamental-ngx/platform/icon-tab-bar';

import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { IconTabBarAsyncTabsExampleComponent } from './examples/async-tabs/icon-tab-bar-async-tabs-example.component';
import { IconTabBarClosableTabsExampleComponent } from './examples/closable-tabs/icon-tab-bar-closable-tabs-example.component';
import { PlatformIconTabBarConfigurablePaddingsExampleComponent } from './examples/platform-icon-tab-bar-configurable-paddings-example/platform-icon-tab-bar-configurable-paddings-example.component';
import { PlatformIconTabBarFilterTypeExampleComponent } from './examples/platform-icon-tab-bar-filter-type-example/platform-icon-tab-bar-filter-type-example.component';
import { PlatformIconTabBarIconOnlyTypeExampleComponent } from './examples/platform-icon-tab-bar-icon-only-type-example/platform-icon-tab-bar-icon-only-type-example.component';
import { PlatformIconTabBarIconTypeExampleComponent } from './examples/platform-icon-tab-bar-icon-type-example/platform-icon-tab-bar-icon-type-example.component';
import { PlatformIconTabBarProcessTypeExampleComponent } from './examples/platform-icon-tab-bar-process-type-example/platform-icon-tab-bar-process-type-example.component';
import { PlatformIconTabBarTemplateContentExampleComponent } from './examples/platform-icon-tab-bar-template-content-example/platform-icon-tab-bar-template-content-example.component';
import { PlatformIconTabBarTextTypeExampleComponent } from './examples/platform-icon-tab-bar-text-type-example/platform-icon-tab-bar-text-type-example.component';
import { IconTabBarTabsContentExampleComponent } from './examples/tabs-content/icon-tab-bar-tabs-content-example.component';
import { IconTabBarTwoClickAreaExampleComponent } from './examples/two-click-area/icon-tab-bar-two-click-area-example.component';

const iconTabBarTextTypeHtml =
    'platform-icon-tab-bar-text-type-example/platform-icon-tab-bar-text-type-example.component.html';
const iconTabBarTextTypeTs =
    'platform-icon-tab-bar-text-type-example/platform-icon-tab-bar-text-type-example.component.ts';

const iconTabBarTemplateContentHtml =
    'platform-icon-tab-bar-template-content-example/platform-icon-tab-bar-template-content-example.component.html';
const iconTabBarTemplateContentTs =
    'platform-icon-tab-bar-template-content-example/platform-icon-tab-bar-template-content-example.component.ts';

const iconTabBarIconOnlyTypeHtml =
    'platform-icon-tab-bar-icon-only-type-example/platform-icon-tab-bar-icon-only-type-example.component.html';
const iconTabBarIconOnlyTypeTs =
    'platform-icon-tab-bar-icon-only-type-example/platform-icon-tab-bar-icon-only-type-example.component.ts';

const iconTabBarIconTypeHtml =
    'platform-icon-tab-bar-icon-type-example/platform-icon-tab-bar-icon-type-example.component.html';
const iconTabBarIconTypeTs =
    'platform-icon-tab-bar-icon-type-example/platform-icon-tab-bar-icon-type-example.component.ts';

const iconTabBarFilterTypeHtml =
    'platform-icon-tab-bar-filter-type-example/platform-icon-tab-bar-filter-type-example.component.html';
const iconTabBarFilterTypeTs =
    'platform-icon-tab-bar-filter-type-example/platform-icon-tab-bar-filter-type-example.component.ts';

const iconTabBarProcessTypeHtml =
    'platform-icon-tab-bar-process-type-example/platform-icon-tab-bar-process-type-example.component.html';
const iconTabBarProcessTypeTs =
    'platform-icon-tab-bar-process-type-example/platform-icon-tab-bar-process-type-example.component.ts';

const iconTabBarConfigurablePaddingsHtml =
    'platform-icon-tab-bar-configurable-paddings-example/platform-icon-tab-bar-configurable-paddings-example.component.html';
const iconTabBarConfigurablePaddingsTs =
    'platform-icon-tab-bar-configurable-paddings-example/platform-icon-tab-bar-configurable-paddings-example.component.ts';

const iconTabBarClosableHtml = 'closable-tabs/icon-tab-bar-closable-tabs-example.component.html';
const iconTabBarClosableTs = 'closable-tabs/icon-tab-bar-closable-tabs-example.component.ts';

const iconTabBarProjectedHtml = 'tabs-content/icon-tab-bar-tabs-content-example.component.html';
const iconTabBarProjectedTs = 'tabs-content/icon-tab-bar-tabs-content-example.component.ts';

const iconTabBarAsyncHtml = 'async-tabs/icon-tab-bar-async-tabs-example.component.html';
const iconTabBarAsyncTs = 'async-tabs/icon-tab-bar-async-tabs-example.component.ts';

const iconTabBarTwoClickHtml = 'two-click-area/icon-tab-bar-two-click-area-example.component.html';
const iconTabBarTwoClickTs = 'two-click-area/icon-tab-bar-two-click-area-example.component.ts';

const iconTypeConfigs = 'config-for-examples/icon-type-config.ts';

const textTypeConfigs = 'config-for-examples/text-type.config.ts';

// Duplicate types here, because import for pure files doesn't work for stackblitz  https://github.com/SAP/fundamental-ngx/issues/5351
export type SemanticColor = 'negative' | 'critical' | 'positive' | 'informative';

export interface IconTabBarItem extends TabConfig {
    index: number;
    uId: string;
    cssClasses: string[];
    hidden?: boolean;
    subItems?: IconTabBarItem[];
}

@Component({
    selector: 'fd-icon-tab-bar-docs',
    templateUrl: './platform-icon-tab-bar-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformIconTabBarTextTypeExampleComponent,
        PlatformIconTabBarTemplateContentExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformIconTabBarIconOnlyTypeExampleComponent,
        PlatformIconTabBarIconTypeExampleComponent,
        PlatformIconTabBarFilterTypeExampleComponent,
        PlatformIconTabBarProcessTypeExampleComponent,
        MessageStripComponent,
        PlatformIconTabBarConfigurablePaddingsExampleComponent,
        IconTabBarClosableTabsExampleComponent,
        IconTabBarTabsContentExampleComponent,
        IconTabBarTwoClickAreaExampleComponent,
        IconTabBarAsyncTabsExampleComponent
    ]
})
export class PlatformIconTabBarDocsComponent {
    iconTabBarTextTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTabBarTextTypeHtml),
            fileName: 'platform-icon-tab-bar-text-type-example',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTabBarTextTypeTs),
            fileName: 'platform-icon-tab-bar-text-type-example',
            component: 'PlatformIconTabBarTextTypeExampleComponent',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(textTypeConfigs),
            fileName: 'text-type.config',
            path: 'config-for-examples',
            pure: true
        }
    ];

    iconTabBarTemplateContentFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTabBarTemplateContentHtml),
            fileName: 'platform-icon-tab-bar-template-content-example',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTabBarTemplateContentTs),
            fileName: 'platform-icon-tab-bar-template-content-example',
            component: 'PlatformIconTabBarTemplateContentExampleComponent',
            path: 'example'
        }
    ];

    iconTabBarIconOnlyTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTabBarIconOnlyTypeHtml),
            fileName: 'platform-icon-tab-bar-icon-only-type-example',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTabBarIconOnlyTypeTs),
            fileName: 'platform-icon-tab-bar-icon-only-type-example',
            component: 'PlatformIconTabBarIconOnlyTypeExampleComponent',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTypeConfigs),
            fileName: 'icon-type-config',
            path: 'config-for-examples',
            pure: true
        }
    ];

    iconTabBarIconTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTabBarIconTypeHtml),
            fileName: 'platform-icon-tab-bar-icon-type-example',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTabBarIconTypeTs),
            fileName: 'platform-icon-tab-bar-icon-type-example',
            component: 'PlatformIconTabBarIconTypeExampleComponent',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTypeConfigs),
            fileName: 'icon-type-config',
            path: 'config-for-examples',
            pure: true
        }
    ];

    iconTabBarFilterTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTabBarFilterTypeHtml),
            fileName: 'platform-icon-tab-bar-filter-type-example',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTabBarFilterTypeTs),
            fileName: 'platform-icon-tab-bar-filter-type-example',
            component: 'PlatformIconTabBarFilterTypeExampleComponent',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTypeConfigs),
            fileName: 'icon-type-config',
            path: 'config-for-examples',
            pure: true
        }
    ];

    iconTabBarProcessTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTabBarProcessTypeHtml),
            fileName: 'platform-icon-tab-bar-process-type-example',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTabBarProcessTypeTs),
            fileName: 'platform-icon-tab-bar-process-type-example',
            component: 'PlatformIconTabBarProcessTypeExampleComponent',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTypeConfigs),
            fileName: 'icon-type-config',
            path: 'config-for-examples',
            pure: true
        }
    ];

    iconTabBarConfigurablePaddingsFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTabBarConfigurablePaddingsHtml),
            fileName: 'platform-icon-tab-bar-configurable-paddings-example',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTabBarConfigurablePaddingsTs),
            fileName: 'platform-icon-tab-bar-configurable-paddings-example',
            component: 'PlatformIconTabBarConfigurablePaddingsExampleComponent',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(textTypeConfigs),
            fileName: 'text-type.config',
            path: 'config-for-examples',
            pure: true
        }
    ];

    iconTabBarClosableTabsFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTabBarClosableHtml),
            fileName: 'icon-tab-bar-closable-tabs-example',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTabBarClosableTs),
            fileName: 'icon-tab-bar-closable-tabs-example',
            component: 'IconTabBarClosableTabsExampleComponent',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTypeConfigs),
            fileName: 'icon-type-config',
            path: 'config-for-examples',
            pure: true
        }
    ];

    iconTabBarProjectedTabsFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTabBarProjectedHtml),
            fileName: 'icon-tab-bar-tabs-content-example',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTabBarProjectedTs),
            fileName: 'icon-tab-bar-tabs-content-example',
            component: 'IconTabBarTabsContentExampleComponent',
            path: 'example'
        }
    ];

    iconTabBarAsyncTabsFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTabBarAsyncHtml),
            fileName: 'icon-tab-bar-async-tabs-example',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTabBarAsyncTs),
            fileName: 'icon-tab-bar-async-tabs-example',
            component: 'IconTabBarAsyncTabsExampleComponent',
            path: 'example'
        }
    ];

    iconTabBarTwoClickFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTabBarTwoClickHtml),
            fileName: 'icon-tab-bar-two-click-area-example',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTabBarTwoClickTs),
            fileName: 'icon-tab-bar-two-click-area-example',
            component: 'IconTabBarTwoClickAreaExampleComponent',
            path: 'example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(textTypeConfigs),
            fileName: 'text-type.config',
            path: 'config-for-examples',
            pure: true
        }
    ];
}
