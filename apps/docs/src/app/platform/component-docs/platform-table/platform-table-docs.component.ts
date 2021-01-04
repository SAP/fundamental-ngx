import { ChangeDetectorRef, Component } from '@angular/core';

import { RtlService } from '@fundamental-ngx/core';
import {
    TableColumnFreezeEvent,
    TableDataSource,
    TableFilterChangeEvent,
    TableGroupChangeEvent,
    TableRowSelectionChangeEvent,
    TableSortChangeEvent
} from '@fundamental-ngx/platform';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as platformTableDefaultSrc from '!raw-loader!./platform-table-examples/platform-table-default-example.component.html';
import * as platformTableDefaultTsSrc from '!raw-loader!./platform-table-examples/platform-table-default-example.component.ts';
import * as platformTableCustomColumnSrc from '!raw-loader!./platform-table-examples/platform-table-custom-column-example.component.html';
import * as platformTableCustomColumnTsSrc from '!raw-loader!./platform-table-examples/platform-table-custom-column-example.component.ts';
import * as platformTableSingleRowSelectionSrc from '!raw-loader!./platform-table-examples/platform-table-single-row-selection-example.component.html';
import * as platformTableSingleRowSelectionTsSrc from '!raw-loader!./platform-table-examples/platform-table-single-row-selection-example.component.ts';
import * as platformTableMultipleRowSelectionSrc from '!raw-loader!./platform-table-examples/platform-table-multiple-row-selection-example.component.html';
import * as platformTableMultipleRowSelectionTsSrc from '!raw-loader!./platform-table-examples/platform-table-multiple-row-selection-example.component.ts';
import * as platformTableSortableSrc from '!raw-loader!./platform-table-examples/platform-table-sortable-example.component.html';
import * as platformTableSortableTsSrc from '!raw-loader!./platform-table-examples/platform-table-sortable-example.component.ts';
import * as platformTableGroupableSrc from '!raw-loader!./platform-table-examples/platform-table-groupable-example.component.html';
import * as platformTableGroupableTsSrc from '!raw-loader!./platform-table-examples/platform-table-groupable-example.component.ts';
import * as platformTableFilterableSrc from '!raw-loader!./platform-table-examples/platform-table-filterable-example.component.html';
import * as platformTableFilterableTsSrc from '!raw-loader!./platform-table-examples/platform-table-filterable-example.component.ts';
import * as platformTableFreezableSrc from '!raw-loader!./platform-table-examples/platform-table-freezable-example.component.html';
import * as platformTableFreezableTsSrc from '!raw-loader!./platform-table-examples/platform-table-freezable-example.component.ts';
import * as platformTableInitialStateSrc from '!raw-loader!./platform-table-examples/platform-table-initial-state-example.component.html';
import * as platformTableP13Src from '!raw-loader!./platform-table-examples/platform-table-p13-example.component.html';
import * as platformTableP13TsSrc from '!raw-loader!./platform-table-examples/platform-table-p13-example.component.ts';
import * as platformTableP13ColumnSrc from '!raw-loader!./platform-table-examples/platform-table-p13-columns-example.component.html';
import * as platformTableP13SortSrc from '!raw-loader!./platform-table-examples/platform-table-p13-sort-example.component.html';
import * as platformTableP13FilterSrc from '!raw-loader!./platform-table-examples/platform-table-p13-filter-example.component.html';
import * as platformTableP13GroupSrc from '!raw-loader!./platform-table-examples/platform-table-p13-group-example.component.html';

import { TableDataProviderExample } from './platform-table-examples/platform-table-data-provider-example';
import * as platformTableDataProviderTs from '!raw-loader!./platform-table-examples/platform-table-data-provider-example';
import * as platformTableDataItemsTs from '!raw-loader!./platform-table-examples/platform-table-data-items-example';

@Component({
    selector: 'fdp-table-docs',
    templateUrl: './platform-table-docs.component.html',
    providers: [RtlService]
})
export class PlatformTableDocsComponent {
    static schema: any = {
        properties: {
            table: {
                type: 'object',
                properties: {
                    contentDensity: {
                        type: 'string',
                        enum: ['compact', 'cozy', 'condensed']
                    },
                    selectionMode: {
                        type: 'string',
                        enum: ['single', 'multiple', 'none']
                    },
                    freezeColumnsTo: {
                        type: 'string',
                        enum: ['none', 'name', 'description', 'price.value']
                    },
                    noHorizontalBorders: {
                        type: 'boolean'
                    },
                    noVerticalBorders: {
                        type: 'boolean'
                    },
                    noBorders: {
                        type: 'boolean'
                    },
                    noBodyBorders: {
                        type: 'boolean'
                    }
                }
            },
            'table-toolbar': {
                type: 'object',
                properties: {
                    title: {
                        type: 'string'
                    },
                    hideItemCount: {
                        type: 'boolean'
                    }
                }
            },
            'first-column': {
                type: 'object',
                properties: {
                    align: {
                        type: 'string',
                        enum: ['start', 'center', 'end']
                    },
                    sortable: {
                        type: 'boolean'
                    },
                    filterable: {
                        type: 'boolean'
                    },
                    groupable: {
                        type: 'boolean'
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;

    data: any = {
        table: {
            contentDensity: 'compact',
            selectionMode: 'none',
            freezeColumnsTo: null,
            noHorizontalBorders: false,
            noVerticalBorders: false,
            noBorders: false,
            noBodyBorders: false
        },
        'table-toolbar': {
            title: 'Order Line Items',
            hideItemCount: false
        },
        'first-column': {
            align: 'start',
            sortable: true,
            filterable: true,
            groupable: true
        }
    };

    defaultTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableDefaultSrc,
            fileName: 'platform-table-default-example',
            component: 'PlatformTableDefaultExampleComponent',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableDefaultTsSrc,
            fileName: 'platform-table-default-example',
            name: 'platform-table-example.component.ts'
        },
        {
            language: 'typescript',
            code: platformTableDataProviderTs,
            name: 'platform-table-data-provider-example.ts'
        },
        {
            language: 'typescript',
            code: platformTableDataItemsTs,
            name: 'platform-table-data-items-example.ts'
        }
    ];

    customColumnTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableCustomColumnSrc,
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableCustomColumnTsSrc,
            fileName: 'platform-table-custom-column-example',
            component: 'PlatformTableCustomColumnExampleComponent',
            name: 'platform-table-example.component.ts'
        },
        {
            language: 'typescript',
            code: platformTableDataProviderTs,
            name: 'platform-table-data-provider-example.ts'
        },
        {
            language: 'typescript',
            code: platformTableDataItemsTs,
            name: 'platform-table-data-items-example.ts'
        }
    ];

    singleRowSelectionFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableSingleRowSelectionSrc,
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableSingleRowSelectionTsSrc,
            fileName: 'platform-table-single-row-selection-example',
            component: 'PlatformTableSingleRowSelectionExampleComponent',
            name: 'platform-table-example.component.ts'
        },
        {
            language: 'typescript',
            code: platformTableDataProviderTs,
            name: 'platform-table-data-provider-example.ts'
        },
        {
            language: 'typescript',
            code: platformTableDataItemsTs,
            name: 'platform-table-data-items-example.ts'
        }
    ];

    multipleRowSelectionFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableMultipleRowSelectionSrc,
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableMultipleRowSelectionTsSrc,
            fileName: 'platform-table-multiple-row-selection-example',
            component: 'PlatformTableMultipleRowSelectionExampleComponent',
            name: 'platform-table-example.component.ts'
        },
        {
            language: 'typescript',
            code: platformTableDataProviderTs,
            name: 'platform-table-data-provider-example.ts'
        },
        {
            language: 'typescript',
            code: platformTableDataItemsTs,
            name: 'platform-table-data-items-example.ts'
        }
    ];

    sortableTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableSortableSrc,
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableSortableTsSrc,
            fileName: 'platform-table-sortable-example',
            component: 'PlatformTableSortableExampleComponent',
            name: 'platform-table-example.component.ts'
        },
        {
            language: 'typescript',
            code: platformTableDataProviderTs,
            name: 'platform-table-data-provider-example.ts'
        },
        {
            language: 'typescript',
            code: platformTableDataItemsTs,
            name: 'platform-table-data-items-example.ts'
        }
    ];

    filterableTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableFilterableSrc,
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableFilterableTsSrc,
            fileName: 'platform-table-filterable-example',
            component: 'PlatformTableFilterableExampleComponent',
            name: 'platform-table-example.component.ts'
        },
        {
            language: 'typescript',
            code: platformTableDataProviderTs,
            name: 'platform-table-data-provider-example.ts'
        },
        {
            language: 'typescript',
            code: platformTableDataItemsTs,
            name: 'platform-table-data-items-example.ts'
        }
    ];

    groupableTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableGroupableSrc,
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableGroupableTsSrc,
            fileName: 'platform-table-groupable-example',
            component: 'PlatformTableGroupableExampleComponent',
            name: 'platform-table-example.component.ts'
        },
        {
            language: 'typescript',
            code: platformTableDataProviderTs,
            name: 'platform-table-data-provider-example.ts'
        },
        {
            language: 'typescript',
            code: platformTableDataItemsTs,
            name: 'platform-table-data-items-example.ts'
        }
    ];

    freezableTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableFreezableSrc,
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableFreezableTsSrc,
            fileName: 'platform-table-freezable-example',
            component: 'PlatformTableFreezableExampleComponent',
            name: 'platform-table-example.component.ts'
        },
        {
            language: 'typescript',
            code: platformTableDataProviderTs,
            name: 'platform-table-data-provider-example.ts'
        },
        {
            language: 'typescript',
            code: platformTableDataItemsTs,
            name: 'platform-table-data-items-example.ts'
        }
    ];

    initialStateFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableInitialStateSrc,
            name: 'platform-table-example.component.html'
        }
    ];

    p13TableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableP13Src,
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableP13TsSrc,
            fileName: 'platform-table-freezable-example',
            component: 'PlatformTableP13ExampleComponent',
            name: 'platform-table-example.component.ts'
        },
        {
            language: 'typescript',
            code: platformTableDataProviderTs,
            name: 'platform-table-data-provider-example.ts'
        },
        {
            language: 'typescript',
            code: platformTableDataItemsTs,
            name: 'platform-table-data-items-example.ts'
        }
    ];

    p13ColumnsFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableP13ColumnSrc,
            name: 'platform-table-example.component.html'
        }
    ];

    p13SortFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableP13SortSrc,
            name: 'platform-table-example.component.html'
        }
    ];

    p13FilterFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableP13FilterSrc,
            name: 'platform-table-example.component.html'
        }
    ];

    p13GroupFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableP13GroupSrc,
            name: 'platform-table-example.component.html'
        }
    ];

    dataSource = new TableDataSource(new TableDataProviderExample());

    constructor(private schemaFactory: SchemaFactoryService, private _cd: ChangeDetectorRef) {
        this.schema = this.schemaFactory.getComponent('fdp-table');
    }

    onSchemaValues(data): void {
        this.data = data;
        this._cd.detectChanges();
    }

    onRowSelectionChange(ev: TableRowSelectionChangeEvent<any>): void {
        console.log(ev);
    }

    onSortChange(ev: TableSortChangeEvent): void {
        console.log(ev);
    }

    onFilterChange(ev: TableFilterChangeEvent): void {
        console.log(ev);
    }

    onFreezeChange(ev: TableColumnFreezeEvent): void {
        console.log(ev);
    }

    onGroupChange(ev: TableGroupChangeEvent): void {
        console.log(ev);
    }
}
