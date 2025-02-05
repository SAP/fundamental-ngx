import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FileUploaderModule } from '@fundamental-ngx/core/file-uploader';

@Component({
    selector: 'fd-file-uploader-example',
    templateUrl: './file-uploader-example.component.html',
    styleUrls: ['./file-uploader-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FileUploaderModule, FormsModule, ButtonComponent]
})
export class FileUploaderExampleComponent {
    files: File[];

    handleFileSelection(files: File[]): void {
        alert(files.length + ' Files selected successfully!!!');
    }

    resetFiles(): void {
        this.files = [];
    }
}
