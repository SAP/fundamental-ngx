import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fd-file-uploader-truncation-example',
    templateUrl: './file-uploader-truncation-example.component.html',
    styleUrls: ['./file-uploader-truncation-example.component.scss']
})
export class FileUploaderTruncationExampleComponent {

    files: File[]; // You can also receive the files as a File[].
}
