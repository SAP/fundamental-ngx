import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import gridListDefaultTs from '!./examples/default/grid-list-example.component?raw';
import gridListSingleSelectTs from '!./examples/single-select/grid-list-single-select-example.component?raw';
import gridListSingleSelectLeftTs from '!./examples/single-select-left/grid-list-single-select-left-example.component?raw';
import gridListSingleSelectRightTs from '!./examples/single-select-right/grid-list-single-select-right-example.component?raw';
import gridListMultiSelectTs from '!./examples/multi-select/grid-list-multi-select-example.component?raw';
import gridListDeleteTs from '!./examples/delete/grid-list-delete-example.component?raw';
import gridListGroupTs from '!./examples/group/grid-list-group-example.component?raw';
import gridListStatesTs from '!./examples/states/grid-list-states-example.component?raw';
import gridListStatusesTs from '!./examples/statuses/grid-list-statuses-example.component?raw';
import gridListMoreTs from '!./examples/more/grid-list-more-example.component?raw';
import gridListFooterTs from '!./examples/footer/grid-list-footer-example.component?raw';
import gridListDndTs from '!./examples/dnd/grid-list-dnd-example.component?raw';
import gridListLayoutTs from '!./examples/layout/grid-list-layout-example.component?raw';
import gridListFocusingTs from '!./examples/focusing/grid-list-focusing-example.component?raw';

import gridListDefaultHtml from '!./examples/default/grid-list-example.component.html?raw';
import gridListSingleSelectHtml from '!./examples/single-select/grid-list-single-select-example.component.html?raw';
import gridListSingleSelectLeftHtml from '!./examples/single-select-left/grid-list-single-select-left-example.component.html?raw';
import gridListSingleSelectRightHtml from '!./examples/single-select-right/grid-list-single-select-right-example.component.html?raw';
import gridListMultiSelectHtml from '!./examples/multi-select/grid-list-multi-select-example.component.html?raw';
import gridListDeleteHtml from '!./examples/delete/grid-list-delete-example.component.html?raw';
import gridListGroupHtml from '!./examples/group/grid-list-group-example.component.html?raw';
import gridListStatesHtml from '!./examples/states/grid-list-states-example.component.html?raw';
import gridListStatusesHtml from '!./examples/statuses/grid-list-statuses-example.component.html?raw';
import gridListMoreHtml from '!./examples/more/grid-list-more-example.component.html?raw';
import gridListFooterHtml from '!./examples/footer/grid-list-footer-example.component.html?raw';
import gridListDndHtml from '!./examples/dnd/grid-list-dnd-example.component.html?raw';
import gridListLayoutHtml from '!./examples/layout/grid-list-layout-example.component.html?raw';
import gridListFocusingHtml from '!./examples/focusing/grid-list-focusing-example.component.html?raw';

import scssFileCode from '!./examples/grid-list.component.scss?raw';

@Component({
    selector: 'app-grid-list',
    templateUrl: './grid-list-docs.component.html'
})
export class GridListDocsComponent {
    gridListDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            code: gridListDefaultHtml,
            scssFileCode,
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
            scssFileCode,
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
            scssFileCode,
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
            scssFileCode,
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
            scssFileCode,
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
            scssFileCode,
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
            scssFileCode,
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
            scssFileCode,
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
            scssFileCode,
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
            scssFileCode,
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
            scssFileCode,
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
            scssFileCode,
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
            scssFileCode,
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
            scssFileCode,
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
