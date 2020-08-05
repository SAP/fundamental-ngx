import { Component } from '@angular/core';

@Component({
    selector: 'fd-file-uploader-max-example',
    templateUrl: './file-uploader-max-example.component.html'
})
export class FileUploaderMaxExampleComponent {
    files: File[];
    invalidFiles: File[];
}
