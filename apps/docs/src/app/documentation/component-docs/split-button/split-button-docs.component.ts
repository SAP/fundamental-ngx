import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as buttonTypesExample from '!raw-loader!./examples/split-button-types-example.component.html';
import * as buttonSplitProgrammaticalyExample from '!raw-loader!./examples/split-button-programmatical-example.component.html';
import * as buttonSplitOptionsExample from '!raw-loader!./examples/split-button-options-example.component.html';
import * as buttonSplitIcons from '!raw-loader!./examples/split-button-icons-example.component.html';
import * as buttonSplitTemplateExample from '!raw-loader!./examples/split-button-template-example.component.html';
import { ExampleFile } from '../../core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-split-button',
    templateUrl: './split-button-docs.component.html'
})
export class SplitButtonDocsComponent implements OnInit, AfterViewInit {
    schema: Schema;

    data: any = {
        properties: {
            label: 'click here',
            fdType: 'default',
            option: 'default',
            size: 'default',
            icon: ''
        }
    };

    buttonHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: buttonTypesExample
        }
    ];

    buttonSplitProgrammaticallyExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSplitProgrammaticalyExample
        }
    ];

    buttonSplitTemplateExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSplitTemplateExample
        }
    ];

    buttonSplitOptionsExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSplitOptionsExample
        }
    ];

    buttonSplitIcons: ExampleFile[] = [
        {
            language: 'html',
            code: buttonSplitIcons
        }
    ];

    private fragment: any;
    @ViewChildren(DocsSectionTitleComponent, { read: ElementRef }) myList: QueryList<ElementRef>;

    constructor(private schemaFactory: SchemaFactoryService, private route: ActivatedRoute) {
        this.schema = this.schemaFactory.getComponent('button');
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
