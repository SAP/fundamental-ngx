import { Component } from '@angular/core';
import { TabConfig } from '@fundamental-ngx/platform/icon-tab-bar';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const iconTabBarTextTypeHtml =
    'platform-icon-tab-bar-text-type-example/platform-icon-tab-bar-text-type-example.component.html';
const iconTabBarTextTypeTs =
    'platform-icon-tab-bar-text-type-example/platform-icon-tab-bar-text-type-example.component.ts';

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
    templateUrl: './platform-icon-tab-bar-docs.component.html'
})
export class PlatformIconTabBarDocsComponent {
    iconTabBarTextTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTabBarTextTypeHtml),
            name: 'icon-tab-bar-text-type-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTabBarTextTypeTs),
            name: 'icon-tab-bar-text-type-example',
            component: 'IconTabBarTextTypeExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(textTypeConfigs),
            name: 'long-icon-type-config'
        }
    ];

    iconTabBarIconOnlyTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTabBarIconOnlyTypeHtml),
            name: 'icon-tab-bar-icon-only-type-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTabBarIconOnlyTypeTs),
            name: 'icon-tab-bar-icon-only-type-example',
            component: 'IconTabBarIconOnlyTypeExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTypeConfigs),
            name: 'long-icon-type-config'
        }
    ];

    iconTabBarIconTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTabBarIconTypeHtml),
            name: 'icon-tab-bar-icon-type-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTabBarIconTypeTs),
            name: 'icon-tab-bar-icon-type-example',
            component: 'IconTabBarIconTypeExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTypeConfigs),
            name: 'long-icon-type-config'
        }
    ];

    iconTabBarFilterTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTabBarFilterTypeHtml),
            name: 'icon-tab-bar-filter-type-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTabBarFilterTypeTs),
            name: 'icon-tab-bar-filter-type-example',
            component: 'IconTabBarFilterTypeExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTypeConfigs),
            name: 'long-icon-type-config'
        }
    ];

    iconTabBarProcessTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTabBarProcessTypeHtml),
            name: 'icon-tab-bar-process-type-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTabBarProcessTypeTs),
            name: 'icon-tab-bar-process-type-example',
            component: 'IconTabBarProcessTypeExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTypeConfigs),
            name: 'long-icon-type-config'
        }
    ];

    iconTabBarConfigurablePaddingsFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconTabBarConfigurablePaddingsHtml),
            name: 'platform-icon-tab-bar-configurable-paddings-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTabBarConfigurablePaddingsTs),
            name: 'platform-icon-tab-bar-configurable-paddings-example',
            component: 'PlatformIconTabBarConfigurablePaddingsExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconTypeConfigs),
            name: 'icon-type-config'
        }
    ];
}
