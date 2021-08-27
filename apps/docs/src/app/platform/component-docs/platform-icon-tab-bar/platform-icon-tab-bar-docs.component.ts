import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as iconTabBarTextTypeHtml from '!raw-loader!./examples/platform-icon-tab-bar-text-type-example/platform-icon-tab-bar-text-type-example.component.html';
import * as iconTabBarTextTypeTs from '!raw-loader!./examples/platform-icon-tab-bar-text-type-example/platform-icon-tab-bar-text-type-example.component.ts';


import * as iconTabBarIconOnlyTypeHtml from '!raw-loader!./examples/platform-icon-tab-bar-icon-only-type-example/platform-icon-tab-bar-icon-only-type-example.component.html';
import * as iconTabBarIconOnlyTypeTs from '!raw-loader!./examples/platform-icon-tab-bar-icon-only-type-example/platform-icon-tab-bar-icon-only-type-example.component.ts';


import * as iconTabBarIconTypeHtml from '!raw-loader!./examples/platform-icon-tab-bar-icon-type-example/platform-icon-tab-bar-icon-type-example.component.html';
import * as iconTabBarIconTypeTs from '!raw-loader!./examples/platform-icon-tab-bar-icon-type-example/platform-icon-tab-bar-icon-type-example.component.ts';

import * as iconTabBarFilterTypeHtml from '!raw-loader!./examples/platform-icon-tab-bar-filter-type-example/platform-icon-tab-bar-filter-type-example.component.html';
import * as iconTabBarFilterTypeTs from '!raw-loader!./examples/platform-icon-tab-bar-filter-type-example/platform-icon-tab-bar-filter-type-example.component.ts';

import * as iconTabBarProcessTypeHtml from '!raw-loader!./examples/platform-icon-tab-bar-process-type-example/platform-icon-tab-bar-process-type-example.component.html';
import * as iconTabBarProcessTypeTs from '!raw-loader!./examples/platform-icon-tab-bar-process-type-example/platform-icon-tab-bar-process-type-example.component.ts';

import * as iconTabBarConfigurablePaddingsHtml from '!raw-loader!./examples/platform-icon-tab-bar-configurable-paddings-example/platform-icon-tab-bar-configurable-paddings-example.component.html';
import * as iconTabBarConfigurablePaddingsTs from '!raw-loader!./examples/platform-icon-tab-bar-configurable-paddings-example/platform-icon-tab-bar-configurable-paddings-example.component.ts';

import * as iconTypeConfigs from '!raw-loader!./examples/config-for-examples/icon-type-config';

import * as textTypeConfigs from '!raw-loader!./examples/config-for-examples/text-type.config';

// Duplicate types here, because import for pure files doesn't work for stackblitz  https://github.com/SAP/fundamental-ngx/issues/5351
export type SemanticColor = 'negative' | 'critical' | 'positive' | 'informative';

export interface TabConfig {
    icon?: string;
    label?: string;
    color?: SemanticColor;
    counter?: number;
    active?: boolean;
    badge?: boolean;
    subItems?: TabConfig[];
}

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
})
export class PlatformIconTabBarDocsComponent {

    iconTabBarTextTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: iconTabBarTextTypeHtml,
            fileName: 'icon-tab-bar-text-type-example'
        },
        {
            language: 'typescript',
            code: iconTabBarTextTypeTs,
            fileName: 'icon-tab-bar-text-type-example',
            component: 'IconTabBarTextTypeExampleComponent'
        },
        {
            language: 'typescript',
            code: textTypeConfigs,
            fileName: 'long-icon-type-config',
        }
    ];

    iconTabBarIconOnlyTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: iconTabBarIconOnlyTypeHtml,
            fileName: 'icon-tab-bar-icon-only-type-example'
        },
        {
            language: 'typescript',
            code: iconTabBarIconOnlyTypeTs,
            fileName: 'icon-tab-bar-icon-only-type-example',
            component: 'IconTabBarIconOnlyTypeExampleComponent'
        },
        {
            language: 'typescript',
            code: iconTypeConfigs,
            fileName: 'long-icon-type-config',
        }
    ];

    iconTabBarIconTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: iconTabBarIconTypeHtml,
            fileName: 'icon-tab-bar-icon-type-example'
        },
        {
            language: 'typescript',
            code: iconTabBarIconTypeTs,
            fileName: 'icon-tab-bar-icon-type-example',
            component: 'IconTabBarIconTypeExampleComponent'
        },
        {
            language: 'typescript',
            code: iconTypeConfigs,
            fileName: 'long-icon-type-config',
        }
    ];

    iconTabBarFilterTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: iconTabBarFilterTypeHtml,
            fileName: 'icon-tab-bar-filter-type-example'
        },
        {
            language: 'typescript',
            code: iconTabBarFilterTypeTs,
            fileName: 'icon-tab-bar-filter-type-example',
            component: 'IconTabBarFilterTypeExampleComponent'
        },
        {
            language: 'typescript',
            code: iconTypeConfigs,
            fileName: 'long-icon-type-config',
        }
    ];

    iconTabBarProcessTypeFiles: ExampleFile[] = [
        {
            language: 'html',
            code: iconTabBarProcessTypeHtml,
            fileName: 'icon-tab-bar-process-type-example'
        },
        {
            language: 'typescript',
            code: iconTabBarProcessTypeTs,
            fileName: 'icon-tab-bar-process-type-example',
            component: 'IconTabBarProcessTypeExampleComponent'
        },
        {
            language: 'typescript',
            code: iconTypeConfigs,
            fileName: 'long-icon-type-config',
        }
    ];

    iconTabBarConfigurablePaddingsFiles: ExampleFile[] = [
        {
            language: 'html',
            code: iconTabBarConfigurablePaddingsHtml,
            fileName: 'platform-icon-tab-bar-configurable-paddings-example'
        },
        {
            language: 'typescript',
            code: iconTabBarConfigurablePaddingsTs,
            fileName: 'platform-icon-tab-bar-configurable-paddings-example',
            component: 'PlatformIconTabBarConfigurablePaddingsExampleComponent'
        },
        {
            language: 'typescript',
            code: iconTypeConfigs,
            fileName: 'icon-type-config',
        }
    ];
}
