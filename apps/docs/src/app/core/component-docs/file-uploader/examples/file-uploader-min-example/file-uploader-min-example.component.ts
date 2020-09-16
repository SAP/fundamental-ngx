import { Component } from '@angular/core';

@Component({
    selector: 'fd-file-uploader-min-example',
    templateUrl: './file-uploader-min-example.component.html',
    styleUrls: ['./file-uploader-min-example.component.scss']
})
export class FileUploaderMinExampleComponent {

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
