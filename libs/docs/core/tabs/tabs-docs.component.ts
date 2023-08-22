import { Component, ViewEncapsulation } from '@angular/core';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { PlayGroundComponent } from '../../shared/src/lib/core-helpers/playground/playground.component';
import { DefaultTabExampleComponent } from './examples/default-tab/default-tab-example.component';
import { TabCollapsibleExampleComponent } from './examples/tab-collapsible-example/tab-collapsible-example.component';
import { TabStackedContentExampleComponent } from './examples/tab-stacked-content-example/tab-stacked-content-example.component';
import { TabCollapsibleOverflowExampleComponent } from './examples/tab-collapsible-overflow-example/tab-collapsible-overflow-example.component';
import { AddingTabExampleComponent } from './examples/adding-tab-example/adding-tab-example.component';
import { TabSelectionExampleComponent } from './examples/tab-selection-example/tab-selection-example.component';
import { TabFilterExampleComponent } from './examples/tab-filter-example/tab-filter-example.component';
import { TabProcessExampleComponent } from './examples/tab-process-example/tab-process-example.component';
import { TabIconOnlyExampleComponent } from './examples/tab-icon-only-example/tab-icon-only-example.component';
import { TabCounterComponent } from './examples/tab-counter-example/tab-counter.component';
import { TabFormElementExampleComponent } from './examples/tab-form-element-example/tab-form-element-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { TabsExampleComponent } from './examples/tabs-example/tabs-example-component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const tabSrc = 'tabs-example/tabs-example.component.html';
const tabForm = 'tab-form-element-example/tab-form-element-example.component.html';
const tabCounter = 'tab-counter-example/tab-counter.component.html';
const tabProcess = 'tab-process-example/tab-process-example.component.html';
const tabIcon = 'tab-icon-only-example/tab-icon-only-example.component.html';
const tabFilter = 'tab-filter-example/tab-filter-example.component.html';
const tabSelectionSrc = 'tab-selection-example/tab-selection-example.component.html';
const tabSelectionSrcTs = 'tab-selection-example/tab-selection-example.component.ts';
const tabAddH = 'adding-tab-example/adding-tab-example.component.html';
const tabAddT = 'adding-tab-example/adding-tab-example.component.ts';
const tabAddS = 'adding-tab-example/adding-tab-example.component.scss';
const collapsibleOverflowTabT = 'tab-collapsible-overflow-example/tab-collapsible-overflow-example.component.ts';
const collapsibleOverflowTabH = 'tab-collapsible-overflow-example/tab-collapsible-overflow-example.component.html';
const stackedTabT = 'tab-stacked-content-example/tab-stacked-content-example.component.ts';
const stackedTabH = 'tab-stacked-content-example/tab-stacked-content-example.component.html';
const collapsibleTabT = 'tab-collapsible-example/tab-collapsible-example.component.ts';
const collapsibleTabH = 'tab-collapsible-example/tab-collapsible-example.component.html';
const defaultTabT = 'default-tab/default-tab-example.component.ts';
const defaultTabH = 'default-tab/default-tab-example.component.html';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs-docs.component.html',
    styleUrls: ['tabs-docs.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        TabsExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        TabFormElementExampleComponent,
        TabCounterComponent,
        TabIconOnlyExampleComponent,
        TabProcessExampleComponent,
        TabFilterExampleComponent,
        TabSelectionExampleComponent,
        AddingTabExampleComponent,
        TabCollapsibleOverflowExampleComponent,
        TabStackedContentExampleComponent,
        TabCollapsibleExampleComponent,
        DefaultTabExampleComponent,
        PlayGroundComponent,
        TabsModule,
        ContentDensityDirective
    ]
})
export class TabsDocsComponent {
    schema: Schema;

    data: any = {
        properties: {
            items: {
                mode: '',
                compact: false
            },
            item1: {
                title: 'Title1',
                counter: '1',
                content: 'Content 1',
                icon: 'menu'
            },
            item2: {
                title2: 'Title2',
                counter2: '2',
                content2: 'Content 2',
                icon2: 'menu'
            },
            item3: {
                title3: 'Title3',
                counter3: '3',
                content3: 'Content 3',
                icon3: 'menu'
            }
        }
    };

    tabExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tabSrc),
            fileName: 'tabs-example'
        }
    ];

    tabFormExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tabForm),
            fileName: 'tab-form-element-example'
        }
    ];

    tabCounter: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tabCounter),
            fileName: 'tab-counter-example'
        }
    ];

    tabProcess: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tabProcess),
            fileName: 'tab-process-example'
        }
    ];

    tabIcon: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tabIcon),
            fileName: 'tab-icon-example'
        }
    ];

    tabFilter: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tabFilter),
            fileName: 'tab-filter-example'
        }
    ];

    addingTab: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tabAddH),
            fileName: 'adding-tab-example',
            scssFileCode: getAssetFromModuleAssets(tabAddS)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(tabAddT),
            fileName: 'adding-tab-example',
            component: 'AddingTabExampleComponent'
        }
    ];

    collapsibleOverflowTab: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(collapsibleOverflowTabH),
            fileName: 'tab-collapsible-overflow-example',
            scssFileCode: getAssetFromModuleAssets(tabAddS)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(collapsibleOverflowTabT),
            fileName: 'tab-collapsible-overflow-example',
            component: 'TabCollapsibleOverflowExampleComponent'
        }
    ];

    stackedTab: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(stackedTabH),
            fileName: 'tab-stacked-content-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(stackedTabT),
            fileName: 'tab-stacked-content-example',
            component: 'TabStackedContentExampleComponent'
        }
    ];

    collapsibleTab: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(collapsibleTabH),
            fileName: 'tab-collapsible-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(collapsibleTabT),
            fileName: 'tab-collapsible-example',
            component: 'tabCollapsibleExampleComponent'
        }
    ];

    tabSelection: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tabSelectionSrc),
            fileName: 'tab-selection-example',
            typescriptFileCode: getAssetFromModuleAssets(tabSelectionSrcTs),
            component: 'TabSelectionExampleComponent'
        }
    ];

    defaultTab: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(defaultTabH),
            fileName: 'default-tab-example',
            typescriptFileCode: getAssetFromModuleAssets(defaultTabT),
            component: 'TabSelectionExampleComponent'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('tabs');
    }

    onSchemaValues(data): void {
        this.data = data;
    }
}
