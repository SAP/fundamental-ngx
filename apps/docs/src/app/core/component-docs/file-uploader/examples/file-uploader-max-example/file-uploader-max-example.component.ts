import { Component } from '@angular/core';

@Component({
    selector: 'fd-file-uploader-max-example',
    templateUrl: './file-uploader-max-example.component.html',
    styleUrls: ['./file-uploader-max-example.component.scss']
})
export class FileUploaderMaxExampleComponent {
    files: File[];
    invalidFiles: File[];

    handleFileSection(files: File[]): void {
        alert(files.length + ' Files selected successfully!!!');
    }

    handleInvalidFiles(files: File[]): void {
        alert(files.length + ' Invalid files selected ');
        this.invalidFiles = files;
    }
}
