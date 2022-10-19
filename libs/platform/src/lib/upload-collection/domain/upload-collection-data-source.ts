import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { DataSource } from '@fundamental-ngx/platform/shared';
import {
    CancelUploadNewFileEvent,
    DeleteEvent,
    DownloadEvent,
    FileRenamedEvent,
    MoveToEvent,
    NewFolderEvent,
    UpdateVersionEvent,
    UploadEvent
} from '../models/upload-collection-events.models';
import { UploadCollectionItem } from '../models/upload-collection.models';
import { UploadCollectionDataProvider } from './upload-collection-data-provider';

export class UploadCollectionDataSource implements DataSource<UploadCollectionItem> {
    /** Max items for response */
    static readonly MaxLimit = Number.MAX_SAFE_INTEGER;

    /** @hidden */
    protected _dataChanges = new BehaviorSubject<UploadCollectionItem[]>([]);
    /** @hidden */
    protected _onDataRequested$ = new Subject<void>();
    /** @hidden */
    protected _onDataReceived$ = new Subject<void>();
    /** @hidden */
    protected _dataLoading = false;

    /** @hidden */
    get isDataLoading(): boolean {
        return this._dataLoading;
    }

    /** @hidden */
    constructor(public readonly dataProvider: UploadCollectionDataProvider) {}

    /** Filtering data */
    match(searchParam: Map<string, string | number>): void {
        this._onDataRequested$.next();
        this._dataLoading = true;
        if (!(searchParam instanceof Map)) {
            throw new Error('DataSource.match() predicate can only accepts string and Map');
        }

        if (!searchParam.has('limit')) {
            searchParam.set('limit', UploadCollectionDataSource.MaxLimit);
        }

        this.dataProvider
            .fetch(searchParam)
            .pipe(take(1))
            .subscribe(
                (result: UploadCollectionItem[]) => {
                    this._onDataReceived$.next();
                    this._dataLoading = false;
                    this._dataChanges.next(result);
                },
                () => {
                    this._onDataReceived$.next();
                    this._dataLoading = false;
                }
            );
    }

    /** The method is triggered when valid files are selected in the file uploader dialog. */
    upload(data: UploadEvent): Observable<UploadCollectionItem[]> {
        return this.dataProvider.upload(data).pipe(take(1));
    }

    /** The method is triggered when an uploaded attachment is selected and the Download button is pressed. */
    download(data: DownloadEvent): Observable<void> {
        return this.dataProvider.download(data);
    }

    /** The method is triggered when Move to button is pressed and folder to move is selected in the dialog modal. */
    moveTo(data: MoveToEvent): Observable<UploadCollectionItem[]> {
        return this.dataProvider.moveTo(data).pipe(take(1));
    }

    /** The method is triggered when an uploaded attachment is selected and the Delete button is pressed. */
    delete(data: DeleteEvent): Observable<UploadCollectionItem[]> {
        return this.dataProvider.delete(data).pipe(take(1));
    }

    /** The method is triggered when the file name is changed. */
    fileRenamed(data: FileRenamedEvent): Observable<UploadCollectionItem[]> {
        return this.dataProvider.fileRenamed(data).pipe(take(1));
    }

    /** The method is triggered when the new folder added. */
    newFolder(data: NewFolderEvent): Observable<UploadCollectionItem[]> {
        return this.dataProvider.newFolder(data).pipe(take(1));
    }

    /** The method is triggered when Update Version button is pressed and valid file are selected in the file uploader dialog. */
    updateVersion(data: UpdateVersionEvent): Observable<UploadCollectionItem[]> {
        return this.dataProvider.updateVersion(data).pipe(take(1));
    }

    /** The method is triggered when Run button is pressed */
    runAfterFail(data: UploadEvent): Observable<UploadCollectionItem[]> {
        return this.dataProvider.runAfterFail(data).pipe(take(1));
    }

    /** The method is triggered when Cancel button is pressed */
    cancelUploadNewFile(data: CancelUploadNewFileEvent): Observable<UploadCollectionItem[]> {
        return this.dataProvider.cancelUploadNewFile(data).pipe(take(1));
    }

    /** @hidden */
    open(): Observable<UploadCollectionItem[]> {
        return this._dataChanges.asObservable();
    }

    /** @hidden */
    close(): void {}

    /** @hidden */
    onDataRequested(): Observable<void> {
        return this._onDataRequested$.asObservable();
    }

    /** @hidden */
    onDataReceived(): Observable<void> {
        return this._onDataReceived$.asObservable();
    }
}
