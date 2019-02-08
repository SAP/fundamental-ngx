import { Component } from '@angular/core';

import * as fileInputH from '!raw-loader!./examples/file-input-example/file-input-example.component.html';
import * as fileInputT from '!raw-loader!./examples/file-input-example/file-input-example.component.ts';

import * as fileInputCustomH from '!raw-loader!./examples/file-input-custom-example/file-input-custom-example.component.html';
import * as fileInputCustomT from '!raw-loader!./examples/file-input-custom-example/file-input-custom-example.component.ts';

import * as fileInputInvalidH from '!raw-loader!./examples/file-input-drag-disabled-example/file-input-drag-disabled-example.component.html';
import * as fileInputInvalidT from '!raw-loader!./examples/file-input-drag-disabled-example/file-input-drag-disabled-example.component.ts';

import * as fileInputMaxT from '!raw-loader!./examples/file-input-max-example/file-input-max-example.component.ts';
import * as fileInputMaxH from '!raw-loader!./examples/file-input-max-example/file-input-max-example.component.html';

@Component({
    selector: 'app-file-input',
    templateUrl: './file-input-docs.component.html',
    styleUrls: ['./file-input-docs.component.scss']
})
export class FileInputDocsComponent {

    fileInputExampleHtml = fileInputH;
    fileInputExampleTs = fileInputT;

    fileInputCustomH = fileInputCustomH;
    fileInputCustomT = fileInputCustomT;

    fileInvalidCustomH = fileInputInvalidH;
    fileInvalidCustomT = fileInputInvalidT;

    fileMaxSizeH = fileInputMaxH;
    fileMaxSizeT = fileInputMaxT;

}
