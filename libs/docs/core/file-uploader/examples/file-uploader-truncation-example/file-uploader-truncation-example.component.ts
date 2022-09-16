import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-file-uploader-truncation-example',
    templateUrl: './file-uploader-truncation-example.component.html',
    styleUrls: ['./file-uploader-truncation-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderTruncationExampleComponent {
    files: File[];
}
