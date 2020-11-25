import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';

import { FileUploaderInvalidChangeEvent, FileUploaderSelectionChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-file-uploader-reactive-example',
    templateUrl: './platform-file-uploader-reactive-example.component.html',
    styleUrls: ['platform-file-uploader-reactive-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformFileUploaderReactiveExampleComponent {
    files: File[];
    invalidFiles: File[];
    customForm: FormGroup;
    requiredDateValidator: ValidatorFn[];

    constructor() {
        this.customForm = new FormGroup({});
        this.requiredDateValidator = [Validators.required];
    }

    handleFileSelection(files: FileUploaderSelectionChangeEvent): void {
        this.files = files.payload;
        console.log(this.customForm);
        alert('file valid count' + this.files.length);
    }
    handleInvalidFileSelection(files: FileUploaderInvalidChangeEvent): void {
        this.invalidFiles = files.payload;
        alert('file invalid count' + this.invalidFiles.length);
    }

    onSubmit(form: NgForm): void {
        if (this.customForm.valid) {
            alert('form file Uploaded successfully');
        }
    }
}
