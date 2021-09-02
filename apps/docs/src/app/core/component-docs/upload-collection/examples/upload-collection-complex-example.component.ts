import { Component, ContentChildren, Input, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, FileUploaderComponent, UploadCollectionItemDirective } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-upload-collection-complex-example',
    templateUrl: './upload-collection-complex-example.component.html'
})
export class UploadCollectionComplexExampleComponent {
    @Input()
    uploaderFiles: File[];

    searchTerm: string;

    files = [
        { fileName: 'File_Name_1', extension: 'txt', icon: 'activate', selected: false },
        {
            fileName: 'File_Name_2',
            extension: 'jpg',
            icon: 'calendar',
            selected: false,
            marker1: 'flag',
            marker2: 'add-favorite'
        },
        { fileName: 'File_Name_3', extension: 'pdf', icon: 'customer', selected: false }
    ];

    @ContentChildren(UploadCollectionItemDirective, { descendants: true })
    uploadCollectionItems: QueryList<UploadCollectionItemDirective>;

    @ViewChild('fileUploader')
    fileUploader: FileUploaderComponent;

    constructor(private _dialogService: DialogService) {}

    alert(message: string): void {
        window.alert(message);
    }

    selectedFilesChanged(newFiles: File[]): void {
        if (newFiles && newFiles.length) {
            newFiles.forEach((file) => {
                this.files.push({
                    fileName: file.name.split('.')[0],
                    extension: file.name.split('.')[1],
                    icon: 'attachment',
                    selected: false
                });
            });
            this.uploaderFiles = [];
            this.fileUploader.selectHandler([]);
        }
    }

    openDeleteDialog(event: UploadCollectionItemDirective, file: any, dialog: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialog, {
            verticalPadding: false,
            responsivePadding: true
        });

        dialogRef.afterClosed.subscribe((result) => {
            if (result === 'Yes') {
                this.deleteClicked(event, file);
            }
        });
    }

    fileNameChanged(event: UploadCollectionItemDirective): void {
        window.alert('User has updated the file name to ' + event.fileName);
    }

    deleteClicked(event: UploadCollectionItemDirective, file: any): void {
        window.alert('User has deleted the file ' + event.fileName + '.' + event.extension);
        this.files.splice(this.files.indexOf(file), 1);
    }

    deleteMultiple(): void {
        this.files = this.files.filter((file) => file.selected === false);
    }

    getFilesSelected(): number {
        let foundSelected = 0;
        this.files.forEach((file) => {
            if (file.selected) {
                foundSelected++;
            }
        });
        return foundSelected;
    }
}
