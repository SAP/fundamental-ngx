import { Component, ContentChildren, QueryList } from '@angular/core';
import { UploadCollectionItemDirective } from '@fundamental-ngx/core/upload-collection';

@Component({
    selector: 'fd-upload-collection-example',
    templateUrl: './upload-collection-example.component.html'
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
