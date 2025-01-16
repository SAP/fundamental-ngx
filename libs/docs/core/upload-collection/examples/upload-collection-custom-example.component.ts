import { Component, ContentChildren, QueryList } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ListModule } from '@fundamental-ngx/core/list';
import { ObjectMarkerModule } from '@fundamental-ngx/core/object-marker';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import {
    UploadCollectionButtonGroupComponent,
    UploadCollectionComponent,
    UploadCollectionDescriptionDirective,
    UploadCollectionFormItemComponent,
    UploadCollectionItemDirective,
    UploadCollectionStatusGroupDirective,
    UploadCollectionStatusItemDirective,
    UploadCollectionTextSeparatorDirective,
    UploadCollectionThumbnailDirective,
    UploadCollectionTitleContainerDirective,
    UploadCollectionTitleDirective
} from '@fundamental-ngx/core/upload-collection';

@Component({
    selector: 'fd-upload-collection-custom-example',
    templateUrl: './upload-collection-custom-example.component.html',
    imports: [
        UploadCollectionComponent,
        ListModule,
        UploadCollectionItemDirective,
        UploadCollectionThumbnailDirective,
        IconComponent,
        UploadCollectionTitleContainerDirective,
        LinkComponent,
        UploadCollectionTitleDirective,
        UploadCollectionFormItemComponent,
        ObjectMarkerModule,
        UploadCollectionDescriptionDirective,
        UploadCollectionTextSeparatorDirective,
        UploadCollectionStatusGroupDirective,
        ObjectStatusComponent,
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
