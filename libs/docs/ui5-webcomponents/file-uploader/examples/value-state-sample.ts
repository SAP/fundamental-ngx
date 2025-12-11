import { Component, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents';
import { UI5WrapperCustomEvent, ValueState } from '@fundamental-ngx/ui5-webcomponents-base';
import { FileUploader } from '@fundamental-ngx/ui5-webcomponents/file-uploader';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout.css';

@Component({
    selector: 'ui5-file-uploader-value-state-sample',
    templateUrl: './value-state-sample.html',
    standalone: true,
    imports: [FileUploader, Label]
})
export class ValueStateSample {
    defaultState = signal<ValueState>(ValueState.None);
    positiveState = signal<ValueState>(ValueState.None);
    criticalState = signal<ValueState>(ValueState.None);
    negativeState = signal<ValueState>(ValueState.None);
    informationState = signal<ValueState>(ValueState.None);

    onDefaultUpload(event: UI5WrapperCustomEvent<FileUploader, 'ui5Change'>): void {
        const files = event.detail.files;
        this.defaultState.set(files && files.length > 0 ? ValueState.None : ValueState.None);
    }

    onPositiveUpload(event: UI5WrapperCustomEvent<FileUploader, 'ui5Change'>): void {
        const files = event.detail.files;
        this.positiveState.set(files && files.length > 0 ? ValueState.Positive : ValueState.None);
    }

    onCriticalUpload(event: UI5WrapperCustomEvent<FileUploader, 'ui5Change'>): void {
        const files = event.detail.files;
        this.criticalState.set(files && files.length > 0 ? ValueState.Critical : ValueState.None);
    }

    onNegativeUpload(event: UI5WrapperCustomEvent<FileUploader, 'ui5Change'>): void {
        const files = event.detail.files;
        this.negativeState.set(files && files.length > 0 ? ValueState.Negative : ValueState.None);
    }

    onInformationUpload(event: UI5WrapperCustomEvent<FileUploader, 'ui5Change'>): void {
        const files = event.detail.files;
        this.informationState.set(files && files.length > 0 ? ValueState.Information : ValueState.None);
    }
}
