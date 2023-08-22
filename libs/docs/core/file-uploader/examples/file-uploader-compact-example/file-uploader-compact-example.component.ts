import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FileUploaderModule } from '@fundamental-ngx/core/file-uploader';

@Component({
    selector: 'fd-file-uploader-compact-example',
    templateUrl: './file-uploader-compact-example.component.html',
    styleUrls: ['./file-uploader-compact-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FileUploaderModule, ContentDensityDirective, FormsModule, NgFor]
})
export class FileUploaderCompactExampleComponent {
    files: File[];
}
