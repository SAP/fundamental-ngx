import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-file-uploader-drag-disabled-example',
    templateUrl: './file-uploader-drag-disabled-example.component.html',
    styleUrls: ['./file-uploader-drag-disabled-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderDragDisabledExampleComponent {
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
