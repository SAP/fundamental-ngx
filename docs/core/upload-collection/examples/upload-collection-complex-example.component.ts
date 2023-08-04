import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Input,
    QueryList,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { FileUploaderComponent } from '@fundamental-ngx/core/file-uploader';
import { UploadCollectionItemDirective } from '@fundamental-ngx/core/upload-collection';
import { RangeSelector } from '@fundamental-ngx/cdk/utils';

interface FileItem {
    fileName: string;
    extension: string;
    icon: string;
    selected: boolean;
    marker1?: string;
    marker2?: string;
}

@Component({
    selector: 'fd-upload-collection-complex-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './upload-collection-complex-example.component.html'
})
export class UploadCollectionComplexExampleComponent {
    @Input()
    uploaderFiles: File[];

    searchTerm: string;

    files: FileItem[] = [
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

    private readonly _rangeSelector = new RangeSelector();

    constructor(private _dialogService: DialogService, private _cdr: ChangeDetectorRef) {}

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

    onCheckboxClick(file: FileItem, index: number, event: MouseEvent): void {
        // additionally to ngModel tracking clicks on checkboxes in order to be able to select ranges
        // this function will be invoked after ngModel's value is updated, so we can use "file.selected" as current value
        this._rangeSelector.onRangeElementToggled(index, event);
        this._rangeSelector.applyValueToEachInRange((idx) => (this.files[idx].selected = file.selected));
    }

    openDeleteDialog(event: UploadCollectionItemDirective, file: any, dialog: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialog, {
            verticalPadding: false,
            responsivePadding: true
        });

        dialogRef.afterClosed.subscribe((result) => {
            if (result === 'Yes') {
                this.deleteClicked(event, file);
                this._cdr.detectChanges();
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
