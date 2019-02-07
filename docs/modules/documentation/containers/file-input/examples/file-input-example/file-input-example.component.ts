import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fd-file-input-example',
    templateUrl: './file-input-example.component.html',
    styleUrls: ['./file-input-example.component.scss']
})
export class FileInputExampleComponent implements OnInit {

    files: FileList;

    constructor() {
    }

    ngOnInit() {
    }

}
