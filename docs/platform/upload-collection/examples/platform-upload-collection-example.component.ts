import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import {
    ItemPerPage,
    FilenameLengthExceedEvent,
    FileSizeExceedEvent,
    TypeMismatchEvent,
    UploadCollectionDataSource,
    UploadCollectionItem
} from '@fundamental-ngx/platform/upload-collection';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { PlatformUploadCollectionDataProviderExample } from './platform-upload-collection-base-data-provider';

@Component({
    selector: 'fdp-upload-collection-example',
    templateUrl: './platform-upload-collection-example.component.html'
})
export class PlatformUploadCollectionExampleComponent {
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
        this.dataSource = new UploadCollectionDataSource(new DelayedPlatformUploadCollectionDataProviderExample(_http));
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

// Simulating real http request by adding 300ms delay to the DataProvider's "fetch" method
// this is needed to demonstrate loading behavior
class DelayedPlatformUploadCollectionDataProviderExample extends PlatformUploadCollectionDataProviderExample {
    fetch(params: Map<string, any>): Observable<UploadCollectionItem[]> {
        return super.fetch(params).pipe(delay(300));
    }
}
