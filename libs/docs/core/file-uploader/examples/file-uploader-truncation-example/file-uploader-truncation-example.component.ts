import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploaderModule } from '@fundamental-ngx/core/file-uploader';

@Component({
    selector: 'fd-file-uploader-truncation-example',
    templateUrl: './file-uploader-truncation-example.component.html',
    styleUrls: ['./file-uploader-truncation-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FileUploaderModule, FormsModule, NgFor]
})
export class FileUploaderTruncationExampleComponent {
    files: File[];
}
