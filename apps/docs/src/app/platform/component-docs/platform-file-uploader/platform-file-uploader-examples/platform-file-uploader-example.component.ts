import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FileUploaderSelectionChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-file-uploader-example',
    templateUrl: './platform-file-uploader-example.component.html',
    styleUrls: ['platform-file-uploader-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformFileUploaderExampleComponent {
    files: File[];

    handleFileSelection(files: FileUploaderSelectionChangeEvent): void {
        this.files = files.payload;
        if (this.files.length > 0) {
            alert('file uploaded' + this.files.length);
        }
    }
}
