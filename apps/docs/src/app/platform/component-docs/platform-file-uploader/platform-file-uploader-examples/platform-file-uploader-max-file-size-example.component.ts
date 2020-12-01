import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FileUploaderInvalidChangeEvent, FileUploaderSelectionChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-file-uploadermax-file-size-example',
    templateUrl: './platform-file-uploader-max-file-size-example.component.html',
    styleUrls: ['./platform-file-uploader-max-file-size-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformFileUploaderMaxFileSizeExampleComponent {
    files: File[];
    invalidFiles: File[];

    handleFileSelection(files: FileUploaderSelectionChangeEvent): void {
        this.files = files.payload;
        alert('file uploaded' + this.files.length);
    }

    handleInvalidFileSelection(files: FileUploaderInvalidChangeEvent): void {
        this.invalidFiles = files.payload;
        alert('file invalid uploaded' + this.invalidFiles.length);
    }
}
