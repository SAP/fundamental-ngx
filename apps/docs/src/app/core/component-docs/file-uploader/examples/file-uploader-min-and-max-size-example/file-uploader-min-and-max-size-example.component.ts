import { Component } from '@angular/core';

@Component({
    selector: 'fd-file-uploader-min-and-max-size-example',
    templateUrl: './file-uploader-min-and-max-size-example.component.html',
    styleUrls: ['./file-uploader-min-and-max-size-example.component.scss']
})
export class FileUploaderMinAndMaxSizeExampleComponent {
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
