import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { UploadCollectionSelectionMode, UploadState } from '@fundamental-ngx/ui5-webcomponents-fiori/types';
import { UploadCollection } from '@fundamental-ngx/ui5-webcomponents-fiori/upload-collection';
import { UploadCollectionItem } from '@fundamental-ngx/ui5-webcomponents-fiori/upload-collection-item';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

// Import icons
import '@ui5/webcomponents-icons/dist/document.js';
import '@ui5/webcomponents-icons/dist/pdf-attachment.js';

interface File {
    id: string;
    fileName: string;
    progress: number;
    uploadState: UploadState;
    details: string;
    icon?: string;
    src?: string;
}

@Component({
    selector: 'ui5-doc-upload-collection-selection-sample',
    templateUrl: './selection-sample.html',
    standalone: true,
    imports: [UploadCollection, UploadCollectionItem, Icon, Title, Button]
})
export class SelectionSample {
    selectionMode = signal<UploadCollectionSelectionMode>(UploadCollectionSelectionMode.None);
    selectionModes = signal(Object.values(UploadCollectionSelectionMode));

    files = signal<File[]>([
        {
            id: '1',
            fileName: 'Annual_Report.pdf',
            progress: 100,
            uploadState: UploadState.Complete,
            details: 'Uploaded By: David Keane · Uploaded On: 2014-07-26',
            icon: 'pdf-attachment'
        },
        {
            id: '2',
            fileName: 'Company_Logo.png',
            progress: 100,
            uploadState: UploadState.Complete,
            details: 'Uploaded By: John Doe · Uploaded On: 2020-01-15',
            src: 'https://ui5.github.io/webcomponents/images/sap-logo-svg.svg'
        },
        {
            id: '3',
            fileName: 'Contract_Draft.docx',
            progress: 100,
            uploadState: UploadState.Complete,
            details: 'Uploaded By: Jane Smith · Uploaded On: 2021-05-10',
            icon: 'document'
        },
        {
            id: '4',
            fileName: 'Presentation.pdf',
            progress: 100,
            uploadState: UploadState.Complete,
            details: 'Uploaded By: John Doe · Uploaded On: 2020-01-15',
            icon: 'pdf-attachment'
        }
    ]);

    selectedFiles = signal<string[]>([]);

    setSelectionMode(mode: UploadCollectionSelectionMode): void {
        this.selectionMode.set(mode);
        // Clear selection when changing modes
        this.selectedFiles.set([]);
    }

    onSelectionChange(event: UI5WrapperCustomEvent<UploadCollection, 'ui5SelectionChange'>): void {
        const selectedItems = event.detail.selectedItems;
        const fileNames = selectedItems.map((item) => item.fileName);
        this.selectedFiles.set(fileNames);
        console.log('Selected files:', fileNames);
    }

    onItemDelete(event: UI5WrapperCustomEvent<UploadCollection, 'ui5ItemDelete'>): void {
        const fileName = event.detail.item.fileName;
        this.files.update((currentFiles) => currentFiles.filter((f) => f.fileName !== fileName));
        this.selectedFiles.update((selected) => selected.filter((name) => name !== fileName));
    }
}
