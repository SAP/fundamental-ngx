import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import {
    ItemPerPage,
    FilenameLengthExceedEvent,
    FileSizeExceedEvent,
    TypeMismatchEvent,
    UploadCollectionDataSource
} from '@fundamental-ngx/platform/upload-collection';
import { PlatformUploadCollectionDataProviderExample } from './platform-upload-collection-base-data-provider';

@Component({
    selector: 'fdp-upload-collection-turn-off-example',
    templateUrl: './platform-upload-collection-turn-off-example.component.html'
})
export class PlatformUploadCollectionTurnOffExampleComponent {
    dataSource: UploadCollectionDataSource;
    itemsPerPage: ItemPerPage[] = [
        {
            label: 5,
            default: false
        },
        {
            label: 10,
            default: true
        },
        {
            label: 15,
            default: false
        },
        {
            label: 20,
            default: false
        }
    ];

    mimeTypes: string[] = ['image/png', 'image/jpeg'];
    fileTypes: string[] = ['jpg', 'png', 'bmp'];

    constructor(private readonly _http: HttpClient) {
        this.dataSource = new UploadCollectionDataSource(new PlatformUploadCollectionDataProviderExample(_http));
    }

    typeMismatch({ source, payload }: TypeMismatchEvent): void {
        console.log('typeMismatch', source, payload);
    }

    filenameLengthExceed({ source, payload }: FilenameLengthExceedEvent): void {
        console.log('filenameLengthExceed', source, payload);
    }

    fileSizeExceed({ source, payload }: FileSizeExceedEvent): void {
        console.log('fileSizeExceed', source, payload);
    }
}
