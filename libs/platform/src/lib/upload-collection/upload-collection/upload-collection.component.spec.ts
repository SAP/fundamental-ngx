import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DialogService } from '@fundamental-ngx/core/dialog';
import { RtlService, uuidv4 } from '@fundamental-ngx/core/utils';
import { FileSizeExceedEvent } from '../models/upload-collection-events.models';
import { UploadCollectionFile, UploadCollectionItem, UploadCollectionItemStatus } from '../models/upload-collection.models';
import { UploadCollectionComponent } from './upload-collection.component';
import { PlatformUploadCollectionModule } from '../upload-collection.module';
import { UploadCollectionDataSource } from '../domain/upload-collection-data-source';
import { FilesValidatorService } from '../services/files-validator.service';
import { UploadCollectionDataProviderTest } from './upload-collection-data-provider-test';

interface MockFile extends File {
    size: number;
    type: string;
}

describe('UploadCollectionComponent', () => {
    let component: UploadCollectionComponent;
    let fixture: ComponentFixture<UploadCollectionComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [PlatformUploadCollectionModule, RouterModule, RouterTestingModule],
                providers: [RtlService, DialogService, FilesValidatorService]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadCollectionComponent);
        component = fixture.componentInstance;
        component.dataSource = new UploadCollectionDataSource(new UploadCollectionDataProviderTest());
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // toolbar

    it('toolbar: should show total number items of current folder', () => {
        expect(component._totalItems).toEqual(2);
        expect(component._getList().length).toEqual(2);
        expect(component._visibleList.length).toEqual(2);
    });

    it('toolbar: should filter when search', () => {
        component._searchText = 'Folder';
        component._searchInputChanged();

        expect(component._totalItems).toEqual(1);
        expect(component._getList().length).toEqual(1);
        expect(component._visibleList.length).toEqual(1);
        expect(component._visibleList[0].name).toEqual('Folder-1');
    });

    it('toolbar: selectHandler with no maxFileSize', () => {
        spyOn(<any>component, '_uploadNewFiles').and.callThrough();
        const file1: MockFile = new File([''], 'file1');
        spyOnProperty(file1, 'size').and.returnValue(1024);
        const event: File[] = [file1];
        component._selectHandler(event);
        expect((<any>component)._uploadNewFiles).toHaveBeenCalledWith(event);
    });

    it('toolbar: should selectHandler with maxFileSize', () => {
        spyOn(<any>component, '_uploadNewFiles').and.callThrough();
        spyOn(component.fileSizeExceed, 'emit').and.callThrough();
        const file1: MockFile = new File([''], 'file1');
        spyOnProperty(file1, 'size').and.returnValue(1024);
        const file2: MockFile = new File([''], 'file2');
        spyOnProperty(file2, 'size').and.returnValue(1048580);
        const event: File[] = [file1, file2];
        component.maxFileSize = '1MB';
        component._selectHandler(event);
        expect((<any>component)._uploadNewFiles).toHaveBeenCalledWith([file1]);

        const fileSizeExceedEvent = new FileSizeExceedEvent(component, {
            items: [file2]
        });

        expect(component.fileSizeExceed.emit).toHaveBeenCalledWith(fileSizeExceedEvent);
    });

    it(
        'toolbar: should create new folder',
        waitForAsync(() => {
            const newFolderName = 'New Folder 2';
            const newTemporaryFiles = (<any>component)._generateTemporaryNewFolder(newFolderName);
            const newFolderData = {
                ...newTemporaryFiles,
                status: UploadCollectionItemStatus.SUCCESSFUL
            };

            const items = [...component.dataSource.dataProvider.items, newFolderData];

            spyOn((<any>component)._dialogService, 'open').and.returnValue({ afterClosed: of(newTemporaryFiles.name) });
            spyOn(<any>component, '_generateTemporaryNewFolder').and.returnValue(newTemporaryFiles);

            spyOn(component.dataSource, 'newFolder').and.returnValue(of(items));

            component._openNewFolderDialog();

            fixture.detectChanges();

            expect(component._totalItems).toEqual(3);
            expect(component._getList().length).toEqual(3);
            expect(component._visibleList.length).toEqual(3);

            const newFolder = component._getList().find((item) => item.documentId === newTemporaryFiles.documentId) as UploadCollectionItem;
            expect(newFolder.name).toEqual(newFolderName);
        })
    );

    it(
        'toolbar: should remove item',
        waitForAsync(() => {
            const item = component.dataSource.dataProvider.items.pop() as UploadCollectionItem;
            component._activeItem = item;

            spyOn(component.dataSource, 'delete').and.returnValue(of([]));
            spyOn(component.dataSource, 'open').and.returnValue(of(component.dataSource.dataProvider.items));

            component._remove();

            fixture.detectChanges();

            expect(component._totalItems).toEqual(1);
            expect(component._getList().length).toEqual(1);
            expect(component._visibleList.length).toEqual(1);

            const removedItemNotFound = component._getList().find((i) => i.documentId === item.documentId);
            expect(removedItemNotFound).toBeFalsy();
        })
    );

    // list

    it(
        'list: should update file version',
        waitForAsync(() => {
            const item = component.dataSource.dataProvider.items[1];
            component._currentUpdateFileVersion = item as UploadCollectionFile;

            const file: MockFile = new File([''], 'file1');
            spyOnProperty(file, 'size').and.returnValue(1024);
            spyOnProperty(file, 'type').and.returnValue('image/png');
            const newFile = (<any>component)._generateTemporaryNewFiles([file]);

            spyOn(component.dataSource, 'updateVersion').and.returnValue(of(newFile));

            component._selectHandler([file]);

            fixture.detectChanges();

            const updatedFileVersion = component._getList().find((i) => i.documentId === file.name);
            expect(updatedFileVersion).toBeFalsy();
        })
    );

    it(
        'list: should upload files',
        waitForAsync(() => {
            const file1: MockFile = new File([''], 'file1');
            spyOnProperty(file1, 'size').and.returnValue(1024);
            const file2: MockFile = new File([''], 'file2');
            spyOnProperty(file2, 'size').and.returnValue(1048580);
            const event: File[] = [file1, file2];

            const newTemporaryFiles = (<any>component)._generateTemporaryNewFiles(event);
            const newFiles = newTemporaryFiles.map((item) => {
                delete item.file;
                item.status = UploadCollectionItemStatus.SUCCESSFUL;

                return item;
            });

            const items = [...component.dataSource.dataProvider.items, ...newFiles];

            spyOn(<any>component, '_generateTemporaryNewFiles').and.returnValue(newTemporaryFiles);

            spyOn(component.dataSource, 'upload').and.returnValue(of(newFiles));
            spyOn(component.dataSource, 'open').and.returnValue(of(items));

            component._selectHandler(event);

            fixture.detectChanges();

            expect(component._totalItems).toEqual(4);
            expect(component._getList().length).toEqual(4);
            expect(component._visibleList.length).toEqual(4);
        })
    );

    // footer

    it(
        'list: should show items of page 2',
        waitForAsync(() => {
            const newDataProvider = new UploadCollectionDataProviderTest();
            newDataProvider.items.push(
                {
                    documentId: uuidv4(),
                    type: 'file',
                    name: `File-3`,
                    uploadedBy: {
                        id: uuidv4(),
                        name: 'Tod G.'
                    },
                    url: '',
                    uploadedOn: new Date(2010, 9, 4),
                    fileSize: 2048,
                    version: 1
                },
                {
                    documentId: uuidv4(),
                    type: 'file',
                    name: `File-4`,
                    uploadedBy: {
                        id: uuidv4(),
                        name: 'Alex G.'
                    },
                    url: '',
                    uploadedOn: new Date(2010, 9, 4),
                    fileSize: 2048,
                    version: 1
                }
            );

            component.itemsPerPage = 3;
            component.dataSource = new UploadCollectionDataSource(newDataProvider);

            fixture.detectChanges();

            component._pageChanged(2);

            fixture.detectChanges();

            expect(component._totalItems).toEqual(4);
            expect(component._getList().length).toEqual(4);
            expect(component._visibleList.length).toEqual(1);
        })
    );
});
