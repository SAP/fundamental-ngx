import { Component, OnInit, ChangeDetectorRef, QueryList, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FileUploaderComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-file-uploader-compact-example',
    templateUrl: './file-uploader-compact-example.component.html'
})
export class FileUploaderCompactExampleComponent {

    @ViewChild('fileInput', { static: false }) inputElement: ElementRef;
    constructor() { }

    @ViewChild(FileUploaderComponent) fileuploader: FileUploaderComponent;

    files: File[];



    displayFileName(selectedfiles) {
        // selectedfiles.map(file => {
        //   this.inputElement.nativeElement.value = file.name;
        // })
    }



}
