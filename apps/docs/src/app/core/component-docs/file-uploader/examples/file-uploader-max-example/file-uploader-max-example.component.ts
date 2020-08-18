import { Component } from '@angular/core';

@Component({
    selector: 'fd-file-uploader-max-example',
    templateUrl: './file-uploader-max-example.component.html',
    styleUrls: ['./file-uploader-max-example.component.scss']
})
export class FileUploaderMaxExampleComponent {
    files: File[];
    invalidFiles: File[];

    handleFileSection(): void {

        alert('Files selected successfully!!!');

    }

    handleInvalidFiles($event): void {
        alert(' Invalid file selection ');
        this.invalidFiles = $event;
    }
}
