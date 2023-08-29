import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { GridListDefaultExampleComponent } from './examples/default/grid-list-example.component';
import { GridListDeleteExampleComponent } from './examples/delete/grid-list-delete-example.component';
import { GridListDndExampleComponent } from './examples/dnd/grid-list-dnd-example.component';
import { GridListFocusingItemExampleComponent } from './examples/focusing/grid-list-focusing-example.component';
import { GridListFooterExampleComponent } from './examples/footer/grid-list-footer-example.component';
import { GridListGroupExampleComponent } from './examples/group/grid-list-group-example.component';
import { GridListLayoutExampleComponent } from './examples/layout/grid-list-layout-example.component';
import { GridListMoreExampleComponent } from './examples/more/grid-list-more-example.component';
import { GridListMultiSelectExampleComponent } from './examples/multi-select/grid-list-multi-select-example.component';
import { GridListSingleSelectLeftExampleComponent } from './examples/single-select-left/grid-list-single-select-left-example.component';
import { GridListSingleSelectRightExampleComponent } from './examples/single-select-right/grid-list-single-select-right-example.component';
import { GridListSingleSelectExampleComponent } from './examples/single-select/grid-list-single-select-example.component';
import { GridListStatesExampleComponent } from './examples/states/grid-list-states-example.component';
import { GridListStatusesExampleComponent } from './examples/statuses/grid-list-statuses-example.component';

const gridListDefaultTs = 'default/grid-list-example.component.ts';
const gridListSingleSelectTs = 'single-select/grid-list-single-select-example.component.ts';
const gridListSingleSelectLeftTs = 'single-select-left/grid-list-single-select-left-example.component.ts';
const gridListSingleSelectRightTs = 'single-select-right/grid-list-single-select-right-example.component.ts';
const gridListMultiSelectTs = 'multi-select/grid-list-multi-select-example.component.ts';
const gridListDeleteTs = 'delete/grid-list-delete-example.component.ts';
const gridListGroupTs = 'group/grid-list-group-example.component.ts';
const gridListStatesTs = 'states/grid-list-states-example.component.ts';
const gridListStatusesTs = 'statuses/grid-list-statuses-example.component.ts';
const gridListMoreTs = 'more/grid-list-more-example.component.ts';
const gridListFooterTs = 'footer/grid-list-footer-example.component.ts';
const gridListDndTs = 'dnd/grid-list-dnd-example.component.ts';
const gridListLayoutTs = 'layout/grid-list-layout-example.component.ts';
const gridListFocusingTs = 'focusing/grid-list-focusing-example.component.ts';

const scssFileCode = 'grid-list.component.scss';

const gridListDefaultHtml = 'default/grid-list-example.component.html';
const gridListSingleSelectHtml = 'single-select/grid-list-single-select-example.component.html';
const gridListSingleSelectLeftHtml = 'single-select-left/grid-list-single-select-left-example.component.html';
const gridListSingleSelectRightHtml = 'single-select-right/grid-list-single-select-right-example.component.html';
const gridListMultiSelectHtml = 'multi-select/grid-list-multi-select-example.component.html';
const gridListDeleteHtml = 'delete/grid-list-delete-example.component.html';
const gridListGroupHtml = 'group/grid-list-group-example.component.html';
const gridListStatesHtml = 'states/grid-list-states-example.component.html';
const gridListStatusesHtml = 'statuses/grid-list-statuses-example.component.html';
const gridListMoreHtml = 'more/grid-list-more-example.component.html';
const gridListFooterHtml = 'footer/grid-list-footer-example.component.html';
const gridListDndHtml = 'dnd/grid-list-dnd-example.component.html';
const gridListLayoutHtml = 'layout/grid-list-layout-example.component.html';
const gridListFocusingHtml = 'focusing/grid-list-focusing-example.component.html';

@Component({
    selector: 'app-grid-list',
    templateUrl: './grid-list-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        GridListDefaultExampleComponent,
        CodeExampleComponent,
        GridListSingleSelectExampleComponent,
        GridListSingleSelectLeftExampleComponent,
        GridListSingleSelectRightExampleComponent,
        GridListMultiSelectExampleComponent,
        GridListDeleteExampleComponent,
        GridListGroupExampleComponent,
        GridListStatesExampleComponent,
        GridListStatusesExampleComponent,
        GridListMoreExampleComponent,
        GridListFooterExampleComponent,
        GridListDndExampleComponent,
        GridListLayoutExampleComponent,
        GridListFocusingItemExampleComponent
    ]
})
export class GridListDocsComponent {
    private _scssFileCode = getAssetFromModuleAssets(scssFileCode);

    gridListDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(gridListDefaultHtml),
            scssFileCode: this._scssFileCode,
            fileName: 'grid-list-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(gridListDefaultTs),
            fileName: 'grid-list-example',
            component: 'GridListDefaultExampleComponent'
        }
    ];

    gridListSingleSelectExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(gridListSingleSelectHtml),
            scssFileCode: this._scssFileCode,
            fileName: 'grid-list-single-select-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(gridListSingleSelectTs),
            fileName: 'grid-list-single-select-example',
            component: 'GridListSingleSelectExampleComponent'
        }
    ];

    gridListSingleSelectLeftExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(gridListSingleSelectLeftHtml),
            scssFileCode: this._scssFileCode,
            fileName: 'grid-list-single-select-left-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(gridListSingleSelectLeftTs),
            fileName: 'grid-list-single-select-left-example',
            component: 'GridListSingleSelectLeftExampleComponent'
        }
    ];

    gridListSingleSelectRightExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(gridListSingleSelectRightHtml),
            scssFileCode: this._scssFileCode,
            fileName: 'grid-list-single-select-right-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(gridListSingleSelectRightTs),
            fileName: 'grid-list-single-select-right-example',
            component: 'GridListSingleSelectRightExampleComponent'
        }
    ];

    gridListMultiSelectExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(gridListMultiSelectHtml),
            scssFileCode: this._scssFileCode,
            fileName: 'grid-list-multi-select-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(gridListMultiSelectTs),
            fileName: 'grid-list-multi-select-example',
            component: 'GridListMultiSelectExampleComponent'
        }
    ];

    gridListDeleteExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(gridListDeleteHtml),
            scssFileCode: this._scssFileCode,
            fileName: 'grid-list-delete-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(gridListDeleteTs),
            fileName: 'grid-list-delete-example',
            component: 'GridListDeleteExampleComponent'
        }
    ];

    gridListGroupExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(gridListGroupHtml),
            scssFileCode: this._scssFileCode,
            fileName: 'grid-list-delete-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(gridListGroupTs),
            fileName: 'grid-list-delete-example',
            component: 'GridListGroupExampleComponent'
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
            component: 'GridListStatesExampleComponent'
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
            component: 'GridListStatusesExampleComponent'
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
            component: 'GridListMoreExampleComponent'
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
            component: 'GridListFooterExampleComponent'
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
            component: 'GridListDndExampleComponent'
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
            component: 'GridListLayoutExampleComponent'
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
            component: 'GridListFocusingItemExampleComponent'
        }
    ];
}
