import { Injectable } from '@angular/core';
import { isObservable, Observable, Subject, Subscription } from 'rxjs';

import {
  ValueHelpDialogDataSource,
  ArrayValueHelpDialogDataSource,
  ObservableValueHelpDialogDataSource
} from './models';
import { isDataSource } from '../../domain/data-source';
import { takeUntil, tap } from 'rxjs/operators';

export interface VhdFilterChangeEvent {
  filters?: {
    key: string;
    value: string;
  }[];
  tokens?: any
}

export enum ValueHelpDialogTabs {
  selectFromList,
  advancedSearch,
  defineConditions
}

export interface VhdValueChangeEvent {
  selected: any;
  excluded: any;
}
export type FdpValueHelpDialogDataSource<T> = ValueHelpDialogDataSource<T>;

@Injectable()
export class ValueHelpDialogService {
  selected: any = [];
  excluded: any = [];

  isAdvancedOpen = false;

  selectedTab: ValueHelpDialogTabs;
  selectedTab$ = new Subject();

  private _originalData: any;
  private _dataSource: FdpValueHelpDialogDataSource<any>;
  private _dsSubscription: Subscription

  get dataSource(): FdpValueHelpDialogDataSource<any> {
    return this._dataSource;
  }
  get originalData(): any {
    return this._originalData;
  }


  updateSelection(selected: any): void {
    this.selected = selected;
  }

  updateExcluded(excluded: any): void {
    this.excluded = excluded;
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