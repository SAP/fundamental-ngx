import { Component, ViewEncapsulation } from '@angular/core';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

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
    encapsulation: ViewEncapsulation.None
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
