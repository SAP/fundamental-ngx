import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as gridListDefaultTs from '!raw-loader!./examples/default/grid-list-example.component';
import * as gridListSingleSelectTs from '!raw-loader!./examples/single-select/grid-list-single-select-example.component';
import * as gridListSingleSelectLeftTs from '!raw-loader!./examples/single-select-left/grid-list-single-select-left-example.component';
import * as gridListSingleSelectRightTs from '!raw-loader!./examples/single-select-right/grid-list-single-select-right-example.component';
import * as gridListMultiSelectTs from '!raw-loader!./examples/multi-select/grid-list-multi-select-example.component';
import * as gridListDeleteTs from '!raw-loader!./examples/delete/grid-list-delete-example.component';
import * as gridListGroupTs from '!raw-loader!./examples/group/grid-list-group-example.component';
import * as gridListStatesTs from '!raw-loader!./examples/states/grid-list-states-example.component';
import * as gridListStatusesTs from '!raw-loader!./examples/statuses/grid-list-statuses-example.component';
import * as gridListMoreTs from '!raw-loader!./examples/more/grid-list-more-example.component';
import * as gridListFooterTs from '!raw-loader!./examples/footer/grid-list-footer-example.component';
import * as gridListDndTs from '!raw-loader!./examples/dnd/grid-list-dnd-example.component';
import * as gridListLayoutTs from '!raw-loader!./examples/layout/grid-list-layout-example.component';
import * as gridListFocusingTs from '!raw-loader!./examples/focusing/grid-list-focusing-example.component';

import * as gridListDefaultHtml from '!raw-loader!./examples/default/grid-list-example.component.html';
import * as gridListSingleSelectHtml from '!raw-loader!./examples/single-select/grid-list-single-select-example.component.html';
import * as gridListSingleSelectLeftHtml from '!raw-loader!./examples/single-select-left/grid-list-single-select-left-example.component.html';
import * as gridListSingleSelectRightHtml from '!raw-loader!./examples/single-select-right/grid-list-single-select-right-example.component.html';
import * as gridListMultiSelectHtml from '!raw-loader!./examples/multi-select/grid-list-multi-select-example.component.html';
import * as gridListDeleteHtml from '!raw-loader!./examples/delete/grid-list-delete-example.component.html';
import * as gridListGroupHtml from '!raw-loader!./examples/group/grid-list-group-example.component.html';
import * as gridListStatesHtml from '!raw-loader!./examples/states/grid-list-states-example.component.html';
import * as gridListStatusesHtml from '!raw-loader!./examples/statuses/grid-list-statuses-example.component.html';
import * as gridListMoreHtml from '!raw-loader!./examples/more/grid-list-more-example.component.html';
import * as gridListFooterHtml from '!raw-loader!./examples/footer/grid-list-footer-example.component.html';
import * as gridListDndHtml from '!raw-loader!./examples/dnd/grid-list-dnd-example.component.html';
import * as gridListLayoutHtml from '!raw-loader!./examples/layout/grid-list-layout-example.component.html';
import * as gridListFocusingHtml from '!raw-loader!./examples/focusing/grid-list-focusing-example.component.html';

import * as scssFileCode from '!raw-loader!./examples/grid-list.component.scss';

@Component({
    selector: 'app-grid-list',
    templateUrl: './grid-list-docs.component.html'
})
export class GridListDocsComponent {
    gridListDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            code: gridListDefaultHtml,
            scssFileCode: scssFileCode,
            fileName: 'grid-list-example'
        },
        {
            language: 'typescript',
            code: gridListDefaultTs,
            fileName: 'grid-list-example',
            component: 'GridListDefaultExampleComponent'
        }
    ];

    gridListSingleSelectExample: ExampleFile[] = [
        {
            language: 'html',
            code: gridListSingleSelectHtml,
            scssFileCode: scssFileCode,
            fileName: 'grid-list-single-select-example'
        },
        {
            language: 'typescript',
            code: gridListSingleSelectTs,
            fileName: 'grid-list-single-select-example',
            component: 'GridListSingleSelectExampleComponent'
        }
    ];

    gridListSingleSelectLeftExample: ExampleFile[] = [
        {
            language: 'html',
            code: gridListSingleSelectLeftHtml,
            scssFileCode: scssFileCode,
            fileName: 'grid-list-single-select-left-example'
        },
        {
            language: 'typescript',
            code: gridListSingleSelectLeftTs,
            fileName: 'grid-list-single-select-left-example',
            component: 'GridListSingleSelectLeftExampleComponent'
        }
    ];

    gridListSingleSelectRightExample: ExampleFile[] = [
        {
            language: 'html',
            code: gridListSingleSelectRightHtml,
            scssFileCode: scssFileCode,
            fileName: 'grid-list-single-select-right-example'
        },
        {
            language: 'typescript',
            code: gridListSingleSelectRightTs,
            fileName: 'grid-list-single-select-right-example',
            component: 'GridListSingleSelectRightExampleComponent'
        }
    ];

    gridListMultiSelectExample: ExampleFile[] = [
        {
            language: 'html',
            code: gridListMultiSelectHtml,
            scssFileCode: scssFileCode,
            fileName: 'grid-list-multi-select-example'
        },
        {
            language: 'typescript',
            code: gridListMultiSelectTs,
            fileName: 'grid-list-multi-select-example',
            component: 'GridListMultiSelectExampleComponent'
        }
    ];

    gridListDeleteExample: ExampleFile[] = [
        {
            language: 'html',
            code: gridListDeleteHtml,
            scssFileCode: scssFileCode,
            fileName: 'grid-list-delete-example'
        },
        {
            language: 'typescript',
            code: gridListDeleteTs,
            fileName: 'grid-list-delete-example',
            component: 'GridListDeleteExampleComponent'
        }
    ];

    gridListGroupExample: ExampleFile[] = [
        {
            language: 'html',
            code: gridListGroupHtml,
            scssFileCode: scssFileCode,
            fileName: 'grid-list-delete-example'
        },
        {
            language: 'typescript',
            code: gridListGroupTs,
            fileName: 'grid-list-delete-example',
            component: 'GridListGroupExampleComponent'
        }
    ];

    gridListStatesExample: ExampleFile[] = [
        {
            language: 'html',
            code: gridListStatesHtml,
            scssFileCode: scssFileCode,
            fileName: 'grid-list-states-example'
        },
        {
            language: 'typescript',
            code: gridListStatesTs,
            fileName: 'grid-list-states-example',
            component: 'GridListStatesExampleComponent'
        }
    ];

    gridListStatusesExample: ExampleFile[] = [
        {
            language: 'html',
            code: gridListStatusesHtml,
            scssFileCode: scssFileCode,
            fileName: 'grid-list-statuses-example'
        },
        {
            language: 'typescript',
            code: gridListStatusesTs,
            fileName: 'grid-list-statuses-example',
            component: 'GridListStatusesExampleComponent'
        }
    ];

    gridListMoreExample: ExampleFile[] = [
        {
            language: 'html',
            code: gridListMoreHtml,
            scssFileCode: scssFileCode,
            fileName: 'grid-list-more-example'
        },
        {
            language: 'typescript',
            code: gridListMoreTs,
            fileName: 'grid-list-more-example',
            component: 'GridListMoreExampleComponent'
        }
    ];

    gridListFooterExample: ExampleFile[] = [
        {
            language: 'html',
            code: gridListFooterHtml,
            scssFileCode: scssFileCode,
            fileName: 'grid-list-footer-example'
        },
        {
            language: 'typescript',
            code: gridListFooterTs,
            fileName: 'grid-list-footer-example',
            component: 'GridListFooterExampleComponent'
        }
    ];

    gridListDndExample: ExampleFile[] = [
        {
            language: 'html',
            code: gridListDndHtml,
            scssFileCode: scssFileCode,
            fileName: 'grid-list-dnd-example'
        },
        {
            language: 'typescript',
            code: gridListDndTs,
            fileName: 'grid-list-dnd-example',
            component: 'GridListDndExampleComponent'
        }
    ];

    gridListLayoutExample: ExampleFile[] = [
        {
            language: 'html',
            code: gridListLayoutHtml,
            scssFileCode: scssFileCode,
            fileName: 'grid-list-layout-example'
        },
        {
            language: 'typescript',
            code: gridListLayoutTs,
            fileName: 'grid-list-layout-example',
            component: 'GridListLayoutExampleComponent'
        }
    ];

    gridListFocusingExample: ExampleFile[] = [
        {
            language: 'html',
            code: gridListFocusingHtml,
            scssFileCode: scssFileCode,
            fileName: 'grid-list-focusing-example'
        },
        {
            language: 'typescript',
            code: gridListFocusingTs,
            fileName: 'grid-list-focusing-example',
            component: 'GridListFocusingItemExampleComponent'
        }
    ];
}
