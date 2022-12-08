import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-file-uploader-compact-example',
    templateUrl: './file-uploader-compact-example.component.html',
    styleUrls: ['./file-uploader-compact-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderCompactExampleComponent {
    files: File[];
}
