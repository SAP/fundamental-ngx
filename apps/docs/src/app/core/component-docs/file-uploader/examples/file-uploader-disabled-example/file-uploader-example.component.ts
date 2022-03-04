import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-file-uploader-disabled-example',
    templateUrl: './file-uploader-disabled-example.component.html',
    styleUrls: ['./file-uploader-disabled-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderDisabledExampleComponent {
    filesDisabled: File[];

    handleFileSelection(files: File[]): void {
        alert(files.length + ' Files selected successfully!!!');
    }
}
