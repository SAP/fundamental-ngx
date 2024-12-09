import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { GridListAutoHeightExampleComponent } from './examples/auto-height/grid-list-auto-height-example.component';
import { GridListComboSelectComponent } from './examples/combo-select/grid-list-combo-select-example.component';
import { GridListDndExampleComponent } from './examples/dnd/grid-list-dnd-example.component';
import { GridListFocusingItemExampleComponent } from './examples/focusing/grid-list-focusing-example.component';
import { GridListFooterExampleComponent } from './examples/footer/grid-list-footer-example.component';
import { GridListGroupExampleComponent } from './examples/group/grid-list-group-example.component';
import { GridListLayoutExampleComponent } from './examples/layout/grid-list-layout-example.component';
import { GridListMoreExampleComponent } from './examples/more/grid-list-more-example.component';
import { GridListStatesExampleComponent } from './examples/states/grid-list-states-example.component';
import { GridListStatusesExampleComponent } from './examples/statuses/grid-list-statuses-example.component';

const gridListGroupTs = 'group/grid-list-group-example.component.ts';
const gridListStatesTs = 'states/grid-list-states-example.component.ts';
const gridListStatusesTs = 'statuses/grid-list-statuses-example.component.ts';
const gridListMoreTs = 'more/grid-list-more-example.component.ts';
const gridListFooterTs = 'footer/grid-list-footer-example.component.ts';
const gridListDndTs = 'dnd/grid-list-dnd-example.component.ts';
const gridListLayoutTs = 'layout/grid-list-layout-example.component.ts';
const gridListFocusingTs = 'focusing/grid-list-focusing-example.component.ts';
const gridListAutoHeightTs = 'auto-height/grid-list-auto-height-example.component.ts';
const gridListComboSelectTs = 'combo-select/grid-list-combo-select-example.component.ts';

const scssFileCode = 'grid-list.component.scss';

const gridListGroupHtml = 'group/grid-list-group-example.component.html';
const gridListStatesHtml = 'states/grid-list-states-example.component.html';
const gridListStatusesHtml = 'statuses/grid-list-statuses-example.component.html';
const gridListMoreHtml = 'more/grid-list-more-example.component.html';
const gridListFooterHtml = 'footer/grid-list-footer-example.component.html';
const gridListDndHtml = 'dnd/grid-list-dnd-example.component.html';
const gridListLayoutHtml = 'layout/grid-list-layout-example.component.html';
const gridListFocusingHtml = 'focusing/grid-list-focusing-example.component.html';
const gridListAutoHeightHtml = 'auto-height/grid-list-auto-height-example.component.html';
const gridListComboSelectHtml = 'combo-select/grid-list-combo-select-example.component.html';

@Component({
    selector: 'app-grid-list',
    templateUrl: './grid-list-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        GridListGroupExampleComponent,
        GridListStatesExampleComponent,
        GridListStatusesExampleComponent,
        GridListMoreExampleComponent,
        GridListFooterExampleComponent,
        GridListDndExampleComponent,
        GridListLayoutExampleComponent,
        GridListFocusingItemExampleComponent,
        GridListAutoHeightExampleComponent,
        GridListComboSelectComponent
    ]
})
export class GridListDocsComponent {
    private _scssFileCode = getAssetFromModuleAssets(scssFileCode);

    gridListComboExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(gridListComboSelectHtml),
            scssFileCode: this._scssFileCode,
            fileName: 'grid-list-combo-select-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(gridListComboSelectTs),
            fileName: 'grid-list-combo-select-example',
            component: 'GridListComboSelectComponent'
        }
    ];

    gridListGroupExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(gridListGroupHtml),
            scssFileCode: this._scssFileCode,
            fileName: 'grid-list-group-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(gridListGroupTs),
            fileName: 'grid-list-group-example',
            component: 'GridListGroupExampleComponent',
            scssFileCode: getAssetFromModuleAssets(scssFileCode)
        }
    ];

    gridListStatesExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(gridListStatesHtml),
            scssFileCode: this._scssFileCode,
            fileName: 'grid-list-states-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(gridListStatesTs),
            fileName: 'grid-list-states-example',
            component: 'GridListStatesExampleComponent',
            scssFileCode: getAssetFromModuleAssets(scssFileCode)
        }
    ];

    gridListStatusesExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(gridListStatusesHtml),
            scssFileCode: this._scssFileCode,
            fileName: 'grid-list-statuses-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(gridListStatusesTs),
            fileName: 'grid-list-statuses-example',
            component: 'GridListStatusesExampleComponent',
            scssFileCode: getAssetFromModuleAssets(scssFileCode)
        }
    ];

    gridListMoreExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(gridListMoreHtml),
            scssFileCode: this._scssFileCode,
            fileName: 'grid-list-more-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(gridListMoreTs),
            fileName: 'grid-list-more-example',
            component: 'GridListMoreExampleComponent',
            scssFileCode: getAssetFromModuleAssets(scssFileCode)
        }
    ];

    gridListFooterExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(gridListFooterHtml),
            scssFileCode: this._scssFileCode,
            fileName: 'grid-list-footer-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(gridListFooterTs),
            fileName: 'grid-list-footer-example',
            component: 'GridListFooterExampleComponent',
            scssFileCode: getAssetFromModuleAssets(scssFileCode)
        }
    ];

    gridListDndExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(gridListDndHtml),
            scssFileCode: this._scssFileCode,
            fileName: 'grid-list-dnd-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(gridListDndTs),
            fileName: 'grid-list-dnd-example',
            component: 'GridListDndExampleComponent',
            scssFileCode: getAssetFromModuleAssets(scssFileCode)
        }
    ];

    gridListLayoutExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(gridListLayoutHtml),
            scssFileCode: this._scssFileCode,
            fileName: 'grid-list-layout-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(gridListLayoutTs),
            fileName: 'grid-list-layout-example',
            component: 'GridListLayoutExampleComponent',
            scssFileCode: getAssetFromModuleAssets(scssFileCode)
        }
    ];

    gridListFocusingExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(gridListFocusingHtml),
            scssFileCode: this._scssFileCode,
            fileName: 'grid-list-focusing-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(gridListFocusingTs),
            fileName: 'grid-list-focusing-example',
            component: 'GridListFocusingItemExampleComponent',
            scssFileCode: getAssetFromModuleAssets(scssFileCode)
        }
    ];

    gridListAutoHeightExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(gridListAutoHeightHtml),
            scssFileCode: this._scssFileCode,
            fileName: 'grid-list-auto-height-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(gridListAutoHeightTs),
            fileName: 'grid-list-auto-height-example',
            component: 'GridListAutoHeightExampleComponent',
            scssFileCode: getAssetFromModuleAssets(scssFileCode)
        }
    ];
}
