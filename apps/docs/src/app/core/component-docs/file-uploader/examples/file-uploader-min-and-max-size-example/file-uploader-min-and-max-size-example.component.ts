import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fd-file-uploader-min-and-max-size-example',
    templateUrl: './file-uploader-min-and-max-size-example.component.html',
    styleUrls: ['./file-uploader-min-and-max-size-example.component.scss']
})
export class FileUploaderMinAndMaxSizeExampleComponent {
    files: File[];
    invalid_files: File[];

}
