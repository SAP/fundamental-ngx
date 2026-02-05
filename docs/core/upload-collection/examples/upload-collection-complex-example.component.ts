import { CdkScrollable } from '@angular/cdk/overlay';

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
import { FormsModule } from '@angular/forms';
import { RangeSelector } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import { FileUploaderComponent, FileUploaderModule } from '@fundamental-ngx/core/file-uploader';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ListModule } from '@fundamental-ngx/core/list';
import { MessagePageModule } from '@fundamental-ngx/core/message-page';
import { ObjectMarkerComponent } from '@fundamental-ngx/core/object-marker';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { ToolbarComponent, ToolbarLabelDirective, ToolbarSpacerDirective } from '@fundamental-ngx/core/toolbar';
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
    templateUrl: './upload-collection-complex-example.component.html',
    imports: [
        ToolbarComponent,
        ToolbarLabelDirective,
        ToolbarSpacerDirective,
        FileUploaderModule,
        ContentDensityDirective,
        FormsModule,
        ButtonComponent,
        UploadCollectionComponent,
        ListModule,
        UploadCollectionItemDirective,
        CheckboxComponent,
        UploadCollectionThumbnailDirective,
        IconComponent,
        UploadCollectionTitleContainerDirective,
        LinkComponent,
        UploadCollectionTitleDirective,
        UploadCollectionFormItemComponent,
        ObjectMarkerComponent,
        UploadCollectionDescriptionDirective,
        UploadCollectionTextSeparatorDirective,
        UploadCollectionStatusGroupDirective,
        ObjectStatusComponent,
        UploadCollectionStatusItemDirective,
        UploadCollectionButtonGroupComponent,
        MessagePageModule,
        DialogModule,
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        BarModule
    ]
})
export class UploadCollectionComplexExampleComponent {
    @Input()
    uploaderFiles: File[];

    @ContentChildren(UploadCollectionItemDirective, { descendants: true })
    uploadCollectionItems: QueryList<UploadCollectionItemDirective>;

    @ViewChild('fileUploader')
    fileUploader: FileUploaderComponent;

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

    private readonly _rangeSelector = new RangeSelector();

    constructor(
        private _dialogService: DialogService,
        private _cdr: ChangeDetectorRef
    ) {}

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
