import { Component } from '@angular/core';
import { TabConfig } from '@fundamental-ngx/platform/icon-tab-bar';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import iconTabBarTextTypeHtml from '!./examples/platform-icon-tab-bar-text-type-example/platform-icon-tab-bar-text-type-example.component.html?raw';
import iconTabBarTextTypeTs from '!./examples/platform-icon-tab-bar-text-type-example/platform-icon-tab-bar-text-type-example.component.ts?raw';

import iconTabBarIconOnlyTypeHtml from '!./examples/platform-icon-tab-bar-icon-only-type-example/platform-icon-tab-bar-icon-only-type-example.component.html?raw';
import iconTabBarIconOnlyTypeTs from '!./examples/platform-icon-tab-bar-icon-only-type-example/platform-icon-tab-bar-icon-only-type-example.component.ts?raw';

import iconTabBarIconTypeHtml from '!./examples/platform-icon-tab-bar-icon-type-example/platform-icon-tab-bar-icon-type-example.component.html?raw';
import iconTabBarIconTypeTs from '!./examples/platform-icon-tab-bar-icon-type-example/platform-icon-tab-bar-icon-type-example.component.ts?raw';

import iconTabBarFilterTypeHtml from '!./examples/platform-icon-tab-bar-filter-type-example/platform-icon-tab-bar-filter-type-example.component.html?raw';
import iconTabBarFilterTypeTs from '!./examples/platform-icon-tab-bar-filter-type-example/platform-icon-tab-bar-filter-type-example.component.ts?raw';

import iconTabBarProcessTypeHtml from '!./examples/platform-icon-tab-bar-process-type-example/platform-icon-tab-bar-process-type-example.component.html?raw';
import iconTabBarProcessTypeTs from '!./examples/platform-icon-tab-bar-process-type-example/platform-icon-tab-bar-process-type-example.component.ts?raw';

import iconTabBarConfigurablePaddingsHtml from '!./examples/platform-icon-tab-bar-configurable-paddings-example/platform-icon-tab-bar-configurable-paddings-example.component.html?raw';
import iconTabBarConfigurablePaddingsTs from '!./examples/platform-icon-tab-bar-configurable-paddings-example/platform-icon-tab-bar-configurable-paddings-example.component.ts?raw';

import iconTypeConfigs from '!./examples/config-for-examples/icon-type-config?raw';

import textTypeConfigs from '!./examples/config-for-examples/text-type.config?raw';

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
            code: iconTabBarTextTypeHtml,
            name: 'icon-tab-bar-text-type-example'
        },
        {
            language: 'typescript',
            code: iconTabBarTextTypeTs,
            name: 'icon-tab-bar-text-type-example',
            component: 'IconTabBarTextTypeExampleComponent'
        },
        {
            language: 'typescript',
            code: textTypeConfigs,
            name: 'long-icon-type-config'
        }
    ];

    iconTabBarIconOnlyTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: iconTabBarIconOnlyTypeHtml,
            name: 'icon-tab-bar-icon-only-type-example'
        },
        {
            language: 'typescript',
            code: iconTabBarIconOnlyTypeTs,
            name: 'icon-tab-bar-icon-only-type-example',
            component: 'IconTabBarIconOnlyTypeExampleComponent'
        },
        {
            language: 'typescript',
            code: iconTypeConfigs,
            name: 'long-icon-type-config'
        }
    ];

    iconTabBarIconTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: iconTabBarIconTypeHtml,
            name: 'icon-tab-bar-icon-type-example'
        },
        {
            language: 'typescript',
            code: iconTabBarIconTypeTs,
            name: 'icon-tab-bar-icon-type-example',
            component: 'IconTabBarIconTypeExampleComponent'
        },
        {
            language: 'typescript',
            code: iconTypeConfigs,
            name: 'long-icon-type-config'
        }
    ];

    iconTabBarFilterTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: iconTabBarFilterTypeHtml,
            name: 'icon-tab-bar-filter-type-example'
        },
        {
            language: 'typescript',
            code: iconTabBarFilterTypeTs,
            name: 'icon-tab-bar-filter-type-example',
            component: 'IconTabBarFilterTypeExampleComponent'
        },
        {
            language: 'typescript',
            code: iconTypeConfigs,
            name: 'long-icon-type-config'
        }
    ];

    iconTabBarProcessTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: iconTabBarProcessTypeHtml,
            name: 'icon-tab-bar-process-type-example'
        },
        {
            language: 'typescript',
            code: iconTabBarProcessTypeTs,
            name: 'icon-tab-bar-process-type-example',
            component: 'IconTabBarProcessTypeExampleComponent'
        },
        {
            language: 'typescript',
            code: iconTypeConfigs,
            name: 'long-icon-type-config'
        }
    ];

    iconTabBarConfigurablePaddingsFiles: ExampleFile[] = [
        {
            language: 'html',
            code: iconTabBarConfigurablePaddingsHtml,
            name: 'platform-icon-tab-bar-configurable-paddings-example'
        },
        {
            language: 'typescript',
            code: iconTabBarConfigurablePaddingsTs,
            name: 'platform-icon-tab-bar-configurable-paddings-example',
            component: 'PlatformIconTabBarConfigurablePaddingsExampleComponent'
        },
        {
            language: 'typescript',
            code: iconTypeConfigs,
            name: 'icon-type-config'
        }
    ];
}
