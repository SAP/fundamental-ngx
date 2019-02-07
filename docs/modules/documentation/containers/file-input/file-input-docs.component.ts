import { Component, OnInit } from '@angular/core';

import * as fileInputH from '!raw-loader!./examples/file-input-example/file-input-example.component.html';
import * as fileInputT from '!raw-loader!./examples/file-input-example/file-input-example.component.ts';

import * as fileInputCustomH from '!raw-loader!./examples/file-input-custom-example/file-input-custom-example.component.html';

@Component({
    selector: 'app-file-input',
    templateUrl: './file-input-docs.component.html',
    styleUrls: ['./file-input-docs.component.scss']
})
export class FileInputDocsComponent implements OnInit {

    fileInputExampleHtml = fileInputH;
    fileInputExampleTs = fileInputT;

    fileInputCustomH = fileInputCustomH;

    constructor() {
    }

    ngOnInit() {
    }

}
