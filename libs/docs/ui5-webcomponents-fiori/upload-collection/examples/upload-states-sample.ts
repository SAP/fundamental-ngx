import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { UploadState } from '@fundamental-ngx/ui5-webcomponents-fiori/types';
import { UploadCollection } from '@fundamental-ngx/ui5-webcomponents-fiori/upload-collection';
import { UploadCollectionItem } from '@fundamental-ngx/ui5-webcomponents-fiori/upload-collection-item';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';

// Import icons
import '@ui5/webcomponents-icons/dist/document.js';
import '@ui5/webcomponents-icons/dist/picture.js';
import '@ui5/webcomponents-icons/dist/video.js';

interface UploadFile {
    id: string;
    fileName: string;
    progress: number;
    uploadState: UploadState;
    icon: string;
    details: string;
}

@Component({
    selector: 'ui5-doc-upload-collection-upload-states-sample',
    templateUrl: './upload-states-sample.html',
    standalone: true,
    imports: [UploadCollection, UploadCollectionItem, Icon]
})
export class UploadStatesSample {
    files = signal<UploadFile[]>([
        {
            id: '1',
            fileName: 'Tutorial_Video.mp4',
            progress: 45,
            uploadState: UploadState.Uploading,
            icon: 'video',
            details: 'Uploaded By: David Keane · Uploaded On: 2014-07-26'
        },
        {
            id: '2',
            fileName: 'Failed_Upload.docx',
            progress: 30,
            uploadState: UploadState.Error,
            icon: 'document',
            details: 'Uploaded By: David Keane · Uploaded On: 2014-07-26'
        },
        {
            id: '3',
            fileName: 'Ready_To_Upload.png',
            progress: 0,
            uploadState: UploadState.Ready,
            icon: 'picture',
            details: 'Uploaded By: David Keane · Uploaded On: 2014-07-26'
        },
        {
            id: '4',
            fileName: 'Completed_Upload.pdf',
            progress: 100,
            uploadState: UploadState.Complete,
            icon: 'document',
            details: 'Uploaded By: David Keane · Uploaded On: 2014-07-26'
        }
    ]);

    onRetry(event: UI5WrapperCustomEvent<UploadCollectionItem, 'ui5Retry'>): void {
        const item = event.target as any;
        const fileName = item.fileName;
        console.log(`Retrying upload for: ${fileName}`);

        // Update the file state to Uploading
        this.files.update((currentFiles) =>
            currentFiles.map((f) =>
                f.fileName === fileName ? { ...f, uploadState: UploadState.Uploading, progress: 0 } : f
            )
        );

        // Simulate upload progress
        this.simulateUpload(fileName);
    }

    onTerminate(event: UI5WrapperCustomEvent<UploadCollectionItem, 'ui5Terminate'>): void {
        const item = event.target as any;
        const fileName = item.fileName;
        console.log(`Terminating upload for: ${fileName}`);

        // Update the file state to Ready
        this.files.update((currentFiles) =>
            currentFiles.map((f) =>
                f.fileName === fileName ? { ...f, uploadState: UploadState.Ready, progress: 0 } : f
            )
        );
    }

    onItemDelete(event: UI5WrapperCustomEvent<UploadCollection, 'ui5ItemDelete'>): void {
        const fileName = event.detail.item.fileName;
        this.files.update((currentFiles) => currentFiles.filter((f) => f.fileName !== fileName));
    }

    private simulateUpload(fileName: string): void {
        const interval = setInterval(() => {
            this.files.update((currentFiles) => {
                const file = currentFiles.find((f) => f.fileName === fileName);
                if (!file || file.uploadState !== UploadState.Uploading) {
                    clearInterval(interval);
                    return currentFiles;
                }

                const newProgress = Math.min(file.progress + 10, 100);
                const newState = newProgress === 100 ? UploadState.Complete : UploadState.Uploading;

                if (newProgress === 100) {
                    clearInterval(interval);
                }

                return currentFiles.map((f) =>
                    f.fileName === fileName ? { ...f, progress: newProgress, uploadState: newState } : f
                );
            });
        }, 500);
    }
}
