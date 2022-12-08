import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FileUploaderSelectionChangeEvent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-file-uploader-compact-example',
    templateUrl: './platform-file-uploader-compact-example.component.html',
    styleUrls: ['platform-file-uploader-compact-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformFileUploaderCompactExampleComponent {
    files: File[];

    handleFileSelection(files: FileUploaderSelectionChangeEvent): void {
        this.files = files.payload;
        if (this.files.length > 0) {
            alert('file uploaded' + this.files.length);
        }
    }
}
