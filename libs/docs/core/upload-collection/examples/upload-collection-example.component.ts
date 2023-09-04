import { NgFor, NgIf } from '@angular/common';
import { Component, ContentChildren, QueryList } from '@angular/core';
import { IconModule } from '@fundamental-ngx/core/icon';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ListModule } from '@fundamental-ngx/core/list';
import { ObjectMarkerModule } from '@fundamental-ngx/core/object-marker';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import {
    UploadCollectionButtonGroupComponent,
    UploadCollectionComponent,
    UploadCollectionDescriptionDirective,
    UploadCollectionFormItemComponent,
    UploadCollectionItemDirective,
    UploadCollectionItemDirective as UploadCollectionItemDirective_1,
    UploadCollectionStatusGroupDirective,
    UploadCollectionStatusItemDirective,
    UploadCollectionTextSeparatorDirective,
    UploadCollectionThumbnailDirective,
    UploadCollectionTitleContainerDirective,
    UploadCollectionTitleDirective
} from '@fundamental-ngx/core/upload-collection';

@Component({
    selector: 'fd-upload-collection-example',
    templateUrl: './upload-collection-example.component.html',
    standalone: true,
    imports: [
        UploadCollectionComponent,
        NgFor,
        ListModule,
        UploadCollectionItemDirective_1,
        UploadCollectionThumbnailDirective,
        IconModule,
        UploadCollectionTitleContainerDirective,
        LinkComponent,
        UploadCollectionTitleDirective,
        UploadCollectionFormItemComponent,
        NgIf,
        ObjectMarkerModule,
        UploadCollectionDescriptionDirective,
        UploadCollectionTextSeparatorDirective,
        UploadCollectionStatusGroupDirective,
        ObjectStatusModule,
        UploadCollectionStatusItemDirective,
        UploadCollectionButtonGroupComponent
    ]
})
export class UploadCollectionExampleComponent {
    files = [
        { fileName: 'File_Name_1', extension: 'txt', icon: 'activate' },
        { fileName: 'File_Name_2', extension: 'jpg', icon: 'calendar', marker1: 'flag', marker2: 'add-favorite' },
        { fileName: 'File_Name_3', extension: 'pdf', icon: 'customer' }
    ];

    @ContentChildren(UploadCollectionItemDirective, { descendants: true })
    uploadCollectionItems: QueryList<UploadCollectionItemDirective>;

    fileNameChanged(event: UploadCollectionItemDirective): void {
        window.alert('User has updated the file name to ' + event.fileName);
    }

    deleteClicked(event: UploadCollectionItemDirective, file: any): void {
        window.alert('User has deleted the file ' + event.fileName + '.' + event.extension);
        this.files.splice(this.files.indexOf(file), 1);
    }
}
