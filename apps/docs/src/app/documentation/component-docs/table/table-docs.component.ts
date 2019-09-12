import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as tableHtmlSrc from '!raw-loader!./examples/table-example.component.html';
import * as tableTsSrc from '!raw-loader!./examples/table-example.component.ts';
import * as tableCheckHtml from '!raw-loader!./examples/table-checkboxes-example.component.html';
import * as tableCheckTs from '!raw-loader!./examples/table-checkboxes-example.component.ts';
import * as tableCdkHtml from '!raw-loader!./examples/table-cdk-example.component.html';
import * as tableCdkTs from '!raw-loader!./examples/table-cdk-example.component.ts';
import * as tableResponsiveHtml from '!raw-loader!./examples/table-responsive-example.component.html';
import * as tableResponsiveTs from '!raw-loader!./examples/table-responsive-example.component.ts';
import { ExampleFile } from '../../core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-table',
    templateUrl: './table-docs.component.html',
    styles: [
        `
            ::ng-deep app-table .fd-tile {
                display: block;
            }
        `
    ]
})
export class TableDocsComponent implements OnInit, AfterViewInit {
    static schema: Schema = {
        properties: {
            state: {
                type: 'object',
                properties: {
                    disabled: {
                        type: 'boolean'
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;
    data: any = {
        state: {
            disabled: false
        }
    };

    tableExample: ExampleFile[] = [
        {
            language: 'html',
            code: tableHtmlSrc
        },
        {
            language: 'typescript',
            code: tableTsSrc
        }
    ];

    tableCheckboxes: ExampleFile[] = [
        {
            language: 'html',
            code: tableCheckHtml
        },
        {
            language: 'typescript',
            code: tableCheckTs
        }
    ];

    tableCdk: ExampleFile[] = [
        {
            language: 'html',
            code: tableCdkHtml
        },
        {
            language: 'typescript',
            code: tableCdkTs
        }
    ];

    tableResponsive: ExampleFile[] = [
        {
            language: 'html',
            code: tableResponsiveHtml
        },
        {
            language: 'typescript',
            code: tableResponsiveTs
        }
    ];

    private fragment: any;
    @ViewChildren(DocsSectionTitleComponent, { read: ElementRef }) myList: QueryList<ElementRef>;

    constructor(private schemaFactory: SchemaFactoryService, private route: ActivatedRoute) {
        this.schema = this.schemaFactory.getComponent('table');
    }

    ngOnInit() {
        this.route.fragment.subscribe(fragment => {
            this.fragment = fragment;
        });
    }

    ngAfterViewInit(): void {
        const myArr = this.myList.toArray();
        for (let i = 0; i < myArr.length; i++) {
            if (myArr[i].nativeElement.firstChild.id === this.fragment) {
                myArr[i].nativeElement.scrollIntoView();
            }
        }
    }

    onSchemaValues(data) {
        this.data = data;
    }
}
