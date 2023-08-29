import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploaderModule } from '@fundamental-ngx/core/file-uploader';

@Component({
    selector: 'fd-file-uploader-min-example',
    templateUrl: './file-uploader-min-example.component.html',
    styleUrls: ['./file-uploader-min-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FileUploaderModule, FormsModule, NgFor]
})
export class FileUploaderMinExampleComponent {
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
