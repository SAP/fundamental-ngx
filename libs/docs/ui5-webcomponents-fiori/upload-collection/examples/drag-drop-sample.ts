import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { UploadState } from '@fundamental-ngx/ui5-webcomponents-fiori/types';
import { UploadCollection } from '@fundamental-ngx/ui5-webcomponents-fiori/upload-collection';
import { UploadCollectionItem } from '@fundamental-ngx/ui5-webcomponents-fiori/upload-collection-item';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

// Import icons
import '@ui5/webcomponents-icons/dist/document.js';

interface UploadFile {
    id: string;
    fileName: string;
    progress: number;
    uploadState: UploadState;
    icon: string;
}

@Component({
    selector: 'ui5-doc-upload-collection-drag-drop-sample',
    templateUrl: './drag-drop-sample.html',
    standalone: true,
    imports: [UploadCollection, UploadCollectionItem, Icon, Label]
})
export class DragDropSample {
    files = signal<UploadFile[]>([
        {
            id: '1',
            fileName: 'Existing_Document.pdf',
            progress: 100,
            uploadState: UploadState.Complete,
            icon: 'document'
        }
    ]);

    onDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();

        const droppedFiles = event.dataTransfer?.files;
        if (!droppedFiles || !droppedFiles.length) {
            return;
        }

        const fileNames: string[] = [];
        const newFiles: UploadFile[] = [];

        for (let i = 0; i < droppedFiles.length; i++) {
            const file = droppedFiles[i];
            fileNames.push(file.name);

            newFiles.push({
                id: Date.now().toString() + i,
                fileName: file.name,
                progress: 0,
                uploadState: UploadState.Uploading,
                icon: 'document'
            });
        }

        this.files.update((current) => [...current, ...newFiles]);
        console.log('Files dropped:', fileNames);
    }

    onItemDelete(event: UI5WrapperCustomEvent<UploadCollection, 'ui5ItemDelete'>): void {
        const fileName = event.detail.item.fileName;
        this.files.update((currentFiles) => currentFiles.filter((f) => f.fileName !== fileName));
    }
}
