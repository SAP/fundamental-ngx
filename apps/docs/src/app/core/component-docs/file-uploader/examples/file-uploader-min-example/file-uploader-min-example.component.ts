import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fd-file-uploader-min-example',
    templateUrl: './file-uploader-min-example.component.html',
    styleUrls: ['./file-uploader-min-example.component.scss']
})
export class FileUploaderMinExampleComponent {

    files: File[];
    invalid_files: File[];

}
