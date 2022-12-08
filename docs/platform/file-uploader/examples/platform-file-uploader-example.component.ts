import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FileUploaderSelectionChangeEvent, FileUploaderInvalidChangeEvent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-file-uploader-example',
    templateUrl: './platform-file-uploader-example.component.html',
    styleUrls: ['platform-file-uploader-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformFileUploaderExampleComponent {
    files: File[];
    invalidFiles: File[];

    handleFileSelection(files: FileUploaderSelectionChangeEvent): void {
        this.files = files.payload;
        if (this.files.length > 0) {
            alert('file uploaded' + this.files.length);
        }
    }

    handleInvalidFileSelection(files: FileUploaderInvalidChangeEvent): void {
        this.invalidFiles = files.payload;
        if (this.invalidFiles.length > 0) {
            alert('Invalid file ' + this.invalidFiles.length);
        }
    }
}
