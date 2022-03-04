import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-file-uploader-example',
    templateUrl: './file-uploader-example.component.html',
    styleUrls: ['./file-uploader-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderExampleComponent {
    files: File[];

    handleFileSelection(files: File[]): void {
        alert(files.length + ' Files selected successfully!!!');
    }
}
