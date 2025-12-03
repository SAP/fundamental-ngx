import { Component, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents';
import { UI5WrapperCustomEvent, ValueState } from '@fundamental-ngx/ui5-webcomponents-base';
import { FileUploader } from '@fundamental-ngx/ui5-webcomponents/file-uploader';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-file-uploader-file-size-restrictions-sample',
    templateUrl: './file-size-restrictions-sample.html',
    standalone: true,
    imports: [FileUploader, Label]
})
export class FileSizeRestrictionsSample {
    maxFileSize = signal(2);
    valueState = signal(ValueState.None);
    showError = signal(false);
    errorMessage = signal<string>('');

    onUpload(_event: UI5WrapperCustomEvent<FileUploader, 'ui5Change'>): void {
        this.valueState.set(ValueState.None);
        this.showError.set(false);
        this.errorMessage.set('');
    }

    onFileSizeExceed(event: UI5WrapperCustomEvent<FileUploader, 'ui5FileSizeExceed'>): void {
        const filesData = event.detail.filesData;
        const fileNames = filesData.map((fileData) => fileData.fileName).join(', ');
        this.valueState.set(ValueState.Negative);
        this.showError.set(true);
        this.errorMessage.set(`${fileNames} exceeds the limit of ${this.maxFileSize()} MB.`);
    }
}
