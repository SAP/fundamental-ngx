import { Component, ContentChildren, QueryList } from '@angular/core';
import { UploadCollectionItemDirective } from '@fundamental-ngx/core/upload-collection';
import { UploadCollectionButtonGroupComponent } from '@fundamental-ngx/core/upload-collection';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { ObjectMarkerModule } from '@fundamental-ngx/core/object-marker';
import { UploadCollectionFormItemComponent } from '@fundamental-ngx/core/upload-collection';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { IconModule } from '@fundamental-ngx/core/icon';
import {
    UploadCollectionThumbnailDirective,
    UploadCollectionTitleContainerDirective,
    UploadCollectionTitleDirective,
    UploadCollectionDescriptionDirective,
    UploadCollectionTextSeparatorDirective,
    UploadCollectionStatusGroupDirective,
    UploadCollectionStatusItemDirective
} from '@fundamental-ngx/core/upload-collection';
import { UploadCollectionItemDirective as UploadCollectionItemDirective_1 } from '@fundamental-ngx/core/upload-collection';
import { ListModule } from '@fundamental-ngx/core/list';
import { NgFor, NgIf } from '@angular/common';
import { UploadCollectionComponent } from '@fundamental-ngx/core/upload-collection';

@Component({
    selector: 'fd-upload-collection-custom-example',
    templateUrl: './upload-collection-custom-example.component.html',
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
export class UploadCollectionCustomExampleComponent {
    files = [
        {
            fileName: 'File_Name_1',
            extension: 'txt',
            icon: 'activate',
            allowEdit: false,
            allowDelete: false,
            marker1: 'flag',
            marker2: 'add-favorite'
        },
        {
            fileName: 'File_Name_2',
            extension: 'jpg',
            icon: 'calendar',
            allowEdit: true,
            allowDelete: true,
            disableEdit: true,
            disableDeletion: true
        },
        { fileName: 'File_Name_3', extension: 'pdf', icon: 'customer', allowEdit: true, allowDelete: false }
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
