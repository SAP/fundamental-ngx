import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventEmitter } from '@angular/core';
import { DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import {
    CollectionFilter,
    CollectionGroup,
    CollectionSort,
    SortDirection,
    Table,
    TableColumn,
    TableState
} from '@fundamental-ngx/platform/table-helpers';
import { BehaviorSubject, of } from 'rxjs';
import { FilterDialogResultData } from './filtering/filtering.model';
import { GroupDialogResultData } from './grouping/grouping.component';
import { SortDialogResultData } from './sorting/sorting.component';
import { TableP13DialogComponent } from './table-p13-dialog.component';

describe('TableP13DialogComponent', () => {
    let component: TableP13DialogComponent;
    let fixture: ComponentFixture<TableP13DialogComponent>;
    let dialogServiceStub: Partial<DialogService>;
    const dialogRef = new DialogRef();

    beforeEach(waitForAsync(() => {
        dialogServiceStub = {
            open: jest.fn(),
            dismissAll: jest.fn()
        };
        TestBed.configureTestingModule({
            imports: [TableP13DialogComponent],
            providers: [
                { provide: DialogService, useValue: dialogServiceStub },
                { provide: DialogRef, useValue: dialogRef }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        class TableComponentMock
            implements
                Pick<
                    Table,
                    | 'search'
                    | 'openTableSortSettings'
                    | 'openTableFilterSettings'
                    | 'openTableGroupSettings'
                    | 'openTableColumnSettings'
                    | 'emptyRowAdded'
                    | 'save'
                    | 'cancel'
                    | 'presetChanged'
                    | 'expandAll'
                    | 'collapseAll'
                    | 'getTableState'
                    | 'getTableColumns'
                    | 'showSortSettingsInToolbar'
                    | 'showGroupSettingsInToolbar'
                    | 'showColumnSettingsInToolbar'
                    | 'showFilterSettingsInToolbar'
                    | 'setHeaderColumnFilteringDisabled'
                    | 'sort'
                    | 'filter'
                >
        {
            openTableSortSettings = new EventEmitter();
            openTableFilterSettings = new EventEmitter();
            openTableGroupSettings = new EventEmitter();
            openTableColumnSettings = new EventEmitter();
            _tableColumnsSubject = new BehaviorSubject<TableColumn[]>([]);
            tableColumnsStream = this._tableColumnsSubject.asObservable();
            emptyRowAdded = new EventEmitter();
            save = new EventEmitter();
            cancel = new EventEmitter();
            presetChanged = new EventEmitter();

            search(): void {}
            expandAll(): void {}
            collapseAll(): void {}
            showSortSettingsInToolbar(): void {}
            showGroupSettingsInToolbar(): void {}
            showColumnSettingsInToolbar(): void {}
            showFilterSettingsInToolbar(): void {}
            setHeaderColumnFilteringDisabled(): void {}
            sort(): void {}
            filter(): void {}
            getTableState(): TableState {
                return {} as TableState;
            }
            getTableColumns(): TableColumn[] {
                return [];
            }
        }

        fixture = TestBed.createComponent(TableP13DialogComponent);
        component = fixture.componentInstance;
        component.table = new TableComponentMock() as any;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('showSortingSettings', () => {
        it('should show sorting settings dialog', () => {
            const mockCollectionSort: CollectionSort[] = [
                { field: 'status', direction: SortDirection.ASC },
                { field: 'name', direction: SortDirection.DESC },
                { field: 'grp', direction: SortDirection.ASC }
            ];
            const mockSortDialogResultData: SortDialogResultData = { collectionSort: mockCollectionSort };

            jest.spyOn(dialogServiceStub, 'open').mockReturnValue({
                afterClosed: of({ ...mockSortDialogResultData }),
                dismiss: jest.fn()
            } as any);

            jest.spyOn(dialogRef, 'dismiss');

            component.showSortingSettings();

            expect(dialogRef.dismiss).not.toHaveBeenCalled();
            expect(dialogServiceStub.open).toHaveBeenCalled();

            dialogRef.afterClosed.subscribe((result: SortDialogResultData) => {
                expect(result).toEqual(mockSortDialogResultData);
            });
        });

        it('should show sorting settings dialog by dimissing already initialized sortings dialog', () => {
            const mockCollectionSort: CollectionSort[] = [
                { field: 'status', direction: SortDirection.ASC },
                { field: 'name', direction: SortDirection.DESC },
                { field: 'grp', direction: SortDirection.ASC }
            ];
            const mockSortDialogResultData: SortDialogResultData = { collectionSort: mockCollectionSort };

            jest.spyOn(dialogServiceStub, 'open').mockReturnValue({
                afterClosed: of({ ...mockSortDialogResultData }),
                dismiss: jest.fn()
            } as any);
            jest.spyOn(dialogRef, 'dismiss');

            component._dialogRef = { dismiss: jest.fn() } as any;
            component.showSortingSettings();

            expect(dialogRef.dismiss).not.toHaveBeenCalled();
            expect(dialogServiceStub.open).toHaveBeenCalled();

            dialogRef.afterClosed.subscribe((result: SortDialogResultData) => {
                expect(result).toEqual(mockSortDialogResultData);
            });
        });
    });

    describe('showFilteringSettings', () => {
        it('should show filter settings dialog', () => {
            const mockCollectionFilter: CollectionFilter[] = [
                { field: 'status', value: 'valid', strategy: 'equalTo', exclude: false },
                { field: 'name', value: 'valid', strategy: 'equalTo', exclude: false }
            ];
            const mockFilterDialogResultData: FilterDialogResultData = { collectionFilter: mockCollectionFilter };

            jest.spyOn(dialogServiceStub, 'open').mockReturnValue({
                afterClosed: of({ ...mockFilterDialogResultData }),
                dismiss: jest.fn()
            } as any);
            jest.spyOn(dialogRef, 'dismiss');

            component.showFilteringSettings();

            expect(dialogRef.dismiss).not.toHaveBeenCalled();
            expect(dialogServiceStub.open).toHaveBeenCalled();

            dialogRef.afterClosed.subscribe((result: FilterDialogResultData) => {
                expect(result).toEqual(mockFilterDialogResultData);
            });
        });

        it('should show filter settings dialog by dimissing already initialized sortings dialog', () => {
            const mockCollectionFilter: CollectionFilter[] = [
                { field: 'status', value: 'valid', strategy: 'equalTo', exclude: false },
                { field: 'name', value: 'valid', strategy: 'equalTo', exclude: false }
            ];
            const mockFilterDialogResultData: FilterDialogResultData = { collectionFilter: mockCollectionFilter };

            jest.spyOn(dialogServiceStub, 'open').mockReturnValue({
                afterClosed: of({ ...mockFilterDialogResultData }),
                dismiss: jest.fn()
            } as any);
            jest.spyOn(dialogRef, 'dismiss');

            component._dialogRef = { dismiss: jest.fn() } as any;
            component.showFilteringSettings();

            expect(dialogServiceStub.open).toHaveBeenCalled();

            dialogRef.afterClosed.subscribe((result: FilterDialogResultData) => {
                expect(result).toEqual(mockFilterDialogResultData);
            });
        });
    });

    describe('showGroupingSettings', () => {
        it('should show group settings dialog', () => {
            const mockCollectionGroup: CollectionGroup[] = [
                { field: 'status', direction: SortDirection.ASC, showAsColumn: true },
                { field: 'name', direction: SortDirection.DESC, showAsColumn: true }
            ];
            const mockGroupDialogResultData: GroupDialogResultData = { collectionGroup: mockCollectionGroup };

            jest.spyOn(dialogServiceStub, 'open').mockReturnValue({
                afterClosed: of({ ...mockGroupDialogResultData }),
                dismiss: jest.fn()
            } as any);
            jest.spyOn(dialogRef, 'dismiss');

            component.showGroupingSettings();

            expect(dialogRef.dismiss).not.toHaveBeenCalled();
            expect(dialogServiceStub.open).toHaveBeenCalled();

            dialogRef.afterClosed.subscribe((result: GroupDialogResultData) => {
                expect(result).toEqual(mockGroupDialogResultData);
            });
        });
    });
});
