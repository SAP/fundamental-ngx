import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FileUploaderInvalidChangeEvent, FileUploaderSelectionChangeEvent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-file-uploader-file-types-example',
    templateUrl: './platform-file-uploader-file-types-example.component.html',
    styleUrls: ['platform-file-uploader-file-types-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformFileUploaderFileTypesExampleComponent {
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
            alert('file invalid uploaded' + this.invalidFiles.length);
        }
    }
}
