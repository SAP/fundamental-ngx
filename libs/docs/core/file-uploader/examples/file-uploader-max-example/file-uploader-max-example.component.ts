import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-file-uploader-max-example',
    templateUrl: './file-uploader-max-example.component.html',
    styleUrls: ['./file-uploader-max-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderMaxExampleComponent {
    files: File[];
    invalidFiles: File[];

    handleFileSelection(files: File[]): void {
        alert(files.length + ' Files selected successfully!!!');
    }

    handleInvalidFiles(files: File[]): void {
        alert(files.length + ' Invalid files selected ');
        this.invalidFiles = files;
    }
}
