import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { FileUploaderInvalidChangeEvent, FileUploaderSelectionChangeEvent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-file-uploader-reactive-example',
    templateUrl: './platform-file-uploader-reactive-example.component.html',
    styleUrls: ['platform-file-uploader-reactive-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformFileUploaderReactiveExampleComponent {
    files: File[];
    invalidFiles: File[];
    customForm: FormGroup = new FormGroup({});
    requiredDateValidator: ValidatorFn[] = [Validators.required];

    handleFileSelection(files: FileUploaderSelectionChangeEvent): void {
        this.files = files.payload;
        console.log(this.customForm);
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

    onSubmit(): void {
        if (this.customForm.valid) {
            alert('form file Uploaded successfully');
        }
    }
}
