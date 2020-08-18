import { Component } from '@angular/core';

@Component({
    selector: 'fd-file-uploader-example',
    templateUrl: './file-uploader-example.component.html',
    styleUrls: ['./file-uploader-example.component.scss']
})
export class FileUploaderExampleComponent {

    files: File[];

    handleFileSection(): void {
        alert('Files selected successfully!!!');
    }
}
