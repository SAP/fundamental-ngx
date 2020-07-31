import { Component } from '@angular/core';

@Component({
    selector: 'fd-file-uploader-example',
    templateUrl: './file-uploader-example.component.html'
})
export class FileUploaderExampleComponent {
    files: File[]; // You can also receive the files as a File[].
}
