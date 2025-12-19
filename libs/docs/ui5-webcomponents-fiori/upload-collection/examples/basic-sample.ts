import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { UploadState } from '@fundamental-ngx/ui5-webcomponents-fiori/types';
import { UploadCollection } from '@fundamental-ngx/ui5-webcomponents-fiori/upload-collection';
import { UploadCollectionItem } from '@fundamental-ngx/ui5-webcomponents-fiori/upload-collection-item';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';

// Import icons
import '@ui5/webcomponents-icons/dist/document.js';
import '@ui5/webcomponents-icons/dist/excel-attachment.js';
import '@ui5/webcomponents-icons/dist/pdf-attachment.js';

@Component({
    selector: 'ui5-doc-upload-collection-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [UploadCollection, UploadCollectionItem, Icon]
})
export class BasicSample {
    files = signal([
        {
            id: '1',
            fileName: 'Project_Proposal.pdf',
            progress: 100,
            uploadState: UploadState.Complete,
            icon: 'pdf-attachment',
            details: 'Uploaded By: David Keane · Uploaded On: 2014-07-26'
        },
        {
            id: '2',
            fileName: 'Budget_2024.xlsx',
            progress: 100,
            uploadState: UploadState.Complete,
            icon: 'excel-attachment',
            details: 'Uploaded By: Sarah Connor · Uploaded On: 2024-01-15'
        },
        {
            id: '3',
            fileName: 'Meeting_Notes.docx',
            progress: 100,
            uploadState: UploadState.Complete,
            icon: 'document',
            details: 'Uploaded By: John Doe · Uploaded On: 2024-02-20'
        }
    ]);

    onItemDelete(event: UI5WrapperCustomEvent<UploadCollection, 'ui5ItemDelete'>): void {
        const fileName = event.detail.item.fileName;
        this.files.update((currentFiles) => currentFiles.filter((f) => f.fileName !== fileName));
        console.log(`File deleted: ${fileName}`);
    }

    onItemRename(event: UI5WrapperCustomEvent<UploadCollectionItem, 'ui5Rename'>, oldFileName: string): void {
        const newFileName = event.currentTarget.fileName;

        this.files.update((currentFiles) =>
            currentFiles.map((f) => (f.fileName === oldFileName ? { ...f, fileName: newFileName } : f))
        );
        console.log(`File renamed: ${oldFileName} to ${newFileName}`);
    }
}
