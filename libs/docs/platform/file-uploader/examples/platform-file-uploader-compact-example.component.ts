import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import {
    FdpFormGroupModule,
    FileUploaderSelectionChangeEvent,
    PlatformFileUploaderModule
} from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-file-uploader-compact-example',
    templateUrl: './platform-file-uploader-compact-example.component.html',
    styleUrls: ['platform-file-uploader-compact-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FdpFormGroupModule, PlatformFileUploaderModule, ContentDensityDirective, FormsModule]
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
