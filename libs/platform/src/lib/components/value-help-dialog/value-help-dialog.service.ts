import { Injectable } from '@angular/core';
import { BehaviorSubject, isObservable, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  ValueHelpDialogDataSource,
  ArrayValueHelpDialogDataSource,
  ObservableValueHelpDialogDataSource,
  ValueHelpDialogTabs,
  VhdFilter,
  VhdValueChangeEvent,
  VhdDefineIncludeEntityRule,
  VhdDefineExcludeEntityRule
} from './models';
import { isDataSource } from '../../domain/data-source';

export type FdpValueHelpDialogDataSource<T> = ValueHelpDialogDataSource<T>
  | ArrayValueHelpDialogDataSource<T>
  | ObservableValueHelpDialogDataSource<T>;

@Injectable()
export class ValueHelpDialogService<T> {
  selectedTab$: BehaviorSubject<ValueHelpDialogTabs> = new BehaviorSubject(null);
  displayedData$: BehaviorSubject<T[]> = new BehaviorSubject([]);
  displayedFilters$: BehaviorSubject<VhdFilter[]> = new BehaviorSubject([]);
  selectedItems$: BehaviorSubject<T[]> = new BehaviorSubject([]);
  includedItems$: BehaviorSubject<VhdDefineIncludeEntityRule[]> = new BehaviorSubject([]);
  excludedItems$: BehaviorSubject<VhdDefineExcludeEntityRule[]> = new BehaviorSubject([]);

  private _originalData: any;
  private _dataSource: FdpValueHelpDialogDataSource<any>;
  private _dsSubscription: Subscription;

  get dataSource(): FdpValueHelpDialogDataSource<any> {
    return this._dataSource;
  }
  get originalData(): any {
    return this._originalData;
  }

  refreshState(value?: VhdValueChangeEvent<T[]>): void {
    if (value) {
      if (value.selected) {
        this.selectedItems$.next(value.selected);
      }
      if (value.included) {
        this.includedItems$.next(value.included);
      }
      if (value.excluded) {
        this.excludedItems$.next(value.excluded);
      }
    }
  }

  initializeDS(ds: FdpValueHelpDialogDataSource<any>): Observable<any> {
    this._originalData = [];
    this._resetSourceStream();

    return this.openDataStream(ds);
  }

  private openDataStream(ds: FdpValueHelpDialogDataSource<any>): Observable<any> {
    const initDataSource = this.toDataStream(ds);
    if (initDataSource) {
      this._dataSource = initDataSource;
      initDataSource.match();

      return initDataSource.open().pipe(
        tap(data => {
          this._originalData = JSON.parse(JSON.stringify(data));
        })
      );
    }
    throw new Error(`[dataSource] source did not match an array, Observable, or DataSource`);
  }

  private toDataStream(ds: FdpValueHelpDialogDataSource<any>): ValueHelpDialogDataSource<any> {
    if (isDataSource(ds)) {
      return ds as ValueHelpDialogDataSource<any>;
    } else if (Array.isArray(ds)) {
      return new ArrayValueHelpDialogDataSource<any>(ds);
    } else if (isObservable(ds)) {
      return new ObservableValueHelpDialogDataSource<any>(ds);
    }

    return undefined;
  }

  private _resetSourceStream(): void {
    if (isDataSource(this.dataSource)) {
      this.dataSource.close();
    }
    if (this._dsSubscription) {
      this._dsSubscription.unsubscribe();
      this._dsSubscription = null;
    }
  }
}
