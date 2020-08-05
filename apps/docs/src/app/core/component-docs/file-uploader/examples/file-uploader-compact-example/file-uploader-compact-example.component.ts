import { Component, OnInit, ChangeDetectorRef, QueryList, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FileUploaderComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-file-uploader-compact-example',
    templateUrl: './file-uploader-compact-example.component.html',
    styleUrls: ['./file-uploader-compact-example.component.scss']
})
export class FileUploaderCompactExampleComponent {

    @ViewChild('fileInput', { static: false }) inputElement: ElementRef;
    constructor() { }

    @ViewChild(FileUploaderComponent) fileuploader: FileUploaderComponent;

    files: File[];

}
