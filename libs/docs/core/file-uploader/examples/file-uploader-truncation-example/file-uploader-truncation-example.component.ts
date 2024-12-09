import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploaderModule } from '@fundamental-ngx/core/file-uploader';

@Component({
    selector: 'fd-file-uploader-truncation-example',
    templateUrl: './file-uploader-truncation-example.component.html',
    styleUrls: ['./file-uploader-truncation-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FileUploaderModule, FormsModule]
})
export class FileUploaderTruncationExampleComponent {
    files: File[];
}
