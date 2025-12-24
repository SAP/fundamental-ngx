import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { UploadCollection } from '@fundamental-ngx/ui5-webcomponents-fiori/upload-collection';
import { UploadCollectionItem } from '@fundamental-ngx/ui5-webcomponents-fiori/upload-collection-item';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { FileUploader } from '@fundamental-ngx/ui5-webcomponents/file-uploader';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';
import { Toolbar } from '@fundamental-ngx/ui5-webcomponents/toolbar';

// Import icons
import '@ui5/webcomponents-icons/dist/document.js';
import '@ui5/webcomponents-icons/dist/upload-to-cloud.js';

interface UploadFile {
    id: string;
    fileName: string;
    progress: number;
    uploadState: 'Ready' | 'Uploading' | 'Error' | 'Complete';
    icon: string;
}

@Component({
    selector: 'ui5-doc-upload-collection-custom-header-sample',
    templateUrl: './custom-header-sample.html',
    standalone: true,
    imports: [UploadCollection, UploadCollectionItem, Icon, Title, Toolbar, Button, FileUploader]
})
export class CustomHeaderSample {
    files = signal<UploadFile[]>([]);

    totalFiles = signal(0);

    onUpload(event: UI5WrapperCustomEvent<FileUploader, 'ui5Change'>): void {
        const files = event.detail.files;

        if (!files?.length) {
            return;
        }

        const newFiles: UploadFile[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            newFiles.push({
                id: Date.now().toString() + i,
                fileName: file.name,
                progress: 0,
                uploadState: 'Ready',
                icon: 'document'
            });
        }

        this.files.update((current) => [...current, ...newFiles]);
        this.totalFiles.update((count) => count + newFiles.length);
        console.log(`Added ${this.totalFiles()} new files.`);
    }

    onItemDelete(event: UI5WrapperCustomEvent<UploadCollection, 'ui5ItemDelete'>): void {
        const fileName = event.detail.item.fileName;
        this.files.update((currentFiles) => currentFiles.filter((f) => f.fileName !== fileName));
        console.log(`File deleted: ${fileName}`);
    }
}
