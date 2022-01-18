import { Component, ContentChildren, QueryList } from '@angular/core';
import { UploadCollectionItemDirective } from '@fundamental-ngx/core/upload-collection';

@Component({
    selector: 'fd-upload-collection-small-example',
    templateUrl: './upload-collection-small-example.component.html'
})
export class UploadCollectionSmallExampleComponent {
    files = [
        { fileName: 'File_Name_1', extension: 'txt', icon: 'activate' },
        { fileName: 'File_Name_2', extension: 'jpg', icon: 'calendar' },
        { fileName: 'File_Name_3', extension: 'pdf', icon: 'customer', marker1: 'flag', marker2: 'add-favorite' }
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
