/**
 * Default implementation for Observable Arrays and Arrays.
 */
import { Observable, of } from 'rxjs';

import { DataProvider } from '@fundamental-ngx/platform/shared';
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
import {
    GroupByType,
    UploadCollectionFile,
    UploadCollectionFolder,
    UploadCollectionItem
} from '../models/upload-collection.models';

/**
 * In Memory implementation of DataProvider that supports fulltext search
 */
export abstract class UploadCollectionDataProvider extends DataProvider<UploadCollectionItem> {
    totalItems = 0;
    list: UploadCollectionItem[] = [];

    abstract items: UploadCollectionItem[];

    /** The method is triggered when valid files are selected in the file uploader dialog. */
    abstract upload(data: UploadEvent): Observable<UploadCollectionItem[]>;

    /** The method is triggered when an uploaded attachment is selected and the Download button is pressed. */
    abstract download(data: DownloadEvent): Observable<void>;

    /** The method is triggered when Move to button is pressed and folder to move is selected in the dialog modal. */
    abstract moveTo(data: MoveToEvent): Observable<UploadCollectionItem[]>;

    /** The method is triggered when an uploaded attachment is selected and the Delete button is pressed. */
    abstract delete(data: DeleteEvent): Observable<UploadCollectionItem[]>;

    /** The method is triggered when the file name is changed. */
    abstract fileRenamed(data: FileRenamedEvent): Observable<UploadCollectionItem[]>;

    /** The method is triggered when the new folder added. */
    abstract newFolder(data: NewFolderEvent): Observable<UploadCollectionItem[]>;

    /** The method is triggered when Update Version button is pressed and valid file are selected in the file uploader dialog. */
    abstract updateVersion(data: UpdateVersionEvent): Observable<UploadCollectionItem[]>;

    /** The method is triggered when Run button is pressed */
    abstract runAfterFail(data: UploadEvent): Observable<UploadCollectionItem[]>;

    /** The method is triggered when Cancel button is pressed */
    abstract cancelUploadNewFile(data: CancelUploadNewFileEvent): Observable<UploadCollectionItem[]>;

    fetch(params: Map<string, string | number>): Observable<UploadCollectionItem[]> {
        let currentItems: UploadCollectionItem[] = this.items;

        const folderId = params.get('folderId');
        if (folderId) {
            const folder = this._findFolderById(folderId);
            currentItems = folder ? folder.files : [];
        }

        let _list = this._defaultSorting(currentItems);
        const searchText = (params.get('searchText') as string) ?? '';
        const limit = +(params.get('limit') ?? (100 as number));
        const page = +(params.get('page') ?? 1);

        if (!searchText || searchText === '*') {
            this.list = _list;
            this.totalItems = _list.length;

            return of(this._getItemsByPage(_list, page, limit));
        }

        const keyword = searchText.toLowerCase();
        _list = _list.filter((item) => item.name.toLowerCase().indexOf(keyword) > -1);
        this.list = _list;
        this.totalItems = _list.length;

        _list = this._getItemsByPage(_list, page, limit);

        return of(_list);
    }

    private _getItemsByPage(items: UploadCollectionItem[], page: number, limit: number): UploadCollectionItem[] {
        const firstDisplayedRow = (page - 1) * limit;
        const _visibleList = items.slice(firstDisplayedRow, firstDisplayedRow + limit);

        if (_visibleList.length === 0 && items.length > 0) {
            this._getItemsByPage(items, page > 1 ? page - 1 : 1, limit);
        }

        return _visibleList;
    }

    private _defaultSorting(list: UploadCollectionItem[]): UploadCollectionItem[] {
        let _list: UploadCollectionItem[] = [];
        const groupByType: GroupByType = list.reduce((res: GroupByType, item: UploadCollectionItem) => {
            const type = `${item.type}s`;

            if (!res[type]) {
                res[type] = [];
            }

            if (item.type === 'folder') {
                item.fileSize = +this._getFileSize(item).toFixed(2);
            }

            res[type].push(item);

            return res;
        }, {} as GroupByType);

        groupByType.folders = this._sortBy(groupByType.folders, 'name') as UploadCollectionFolder[];
        groupByType.files = this._sortBy(groupByType.files, 'name') as UploadCollectionFile[];

        if (groupByType.folders) {
            _list = groupByType.folders;
        } else {
            _list = [];
        }

        if (groupByType.files) {
            _list.push(...groupByType.files);
        }

        return _list;
    }

    /** @hidden */
    private _getFileSize(item: UploadCollectionItem): number {
        if (item.type === 'file') {
            return item.fileSize;
        }

        if (item.type === 'folder') {
            return item.files.reduce((res, folderItem) => {
                res += this._getFileSize(folderItem);

                return res;
            }, 0);
        }
        return 0;
    }

    /** @hidden */
    private _sortBy(items: UploadCollectionItem[] = [], key: string): UploadCollectionItem[] {
        return items.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    }

    /** @hidden */
    private _findFolderById(folderId: number | string): UploadCollectionFolder | undefined {
        let foundObj: UploadCollectionFolder | undefined;

        JSON.stringify(this.items, (_, nestedValue) => {
            if (nestedValue && nestedValue.documentId === folderId) {
                foundObj = nestedValue;
            }

            return nestedValue;
        });

        return foundObj;
    }
}
