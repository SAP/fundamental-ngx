import { fakeAsync, tick } from '@angular/core/testing';
import { DestroyedService } from '@fundamental-ngx/core/utils';
import { isObservable, Observable, of } from 'rxjs';
import { BaseDataProvider } from './base/base-data-provider.class';
import { BaseDataSource } from './base/base-data-source.class';
import { DataSourceDirective } from './data-source.directive';
import { isDataSource } from './helpers/is-datasource';
import { DataSource, DataSourceProvider } from './models/data-source';

export const dataProviderData = [1, 2, 3, 4, 5];
export const arrayData = [6, 7, 8, 9];

export class MockDataProvider extends BaseDataProvider<any> {
    constructor(public items) {
        super();
    }
    fetch(): Observable<any[]> {
        return of(this.items);
    }
}

export class MockArrayDataSource extends BaseDataSource<number> {
    constructor() {
        super(new MockDataProvider(arrayData));
    }
}

export class MockObservableDataSource extends BaseDataSource<number> {
    constructor() {
        super(new MockDataProvider(dataProviderData));
    }
}

export function mockDataSourceParser(source: DataSource): DataSourceProvider | undefined {
    if (isDataSource(source)) {
        return source;
    }

    if (Array.isArray(source)) {
        return new MockArrayDataSource();
    }

    if (isObservable(source)) {
        return new MockObservableDataSource();
    }

    return undefined;
}

describe('DataSourceDirective', () => {
    let directive: DataSourceDirective<any>;
    beforeEach(() => {
        directive = new DataSourceDirective(new DestroyedService(), mockDataSourceParser);
    });
    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should emit new data', fakeAsync(() => {
        const emitSpy = spyOn(directive.dataChanged, 'emit').and.callThrough();

        directive.dataSource = arrayData;

        tick(2000);

        expect(emitSpy).toHaveBeenCalled();
        expect(emitSpy).toHaveBeenCalledWith(arrayData);

        directive.dataSource = new MockObservableDataSource();

        tick(2000);

        expect(emitSpy).toHaveBeenCalled();
        expect(emitSpy).toHaveBeenCalledWith(dataProviderData);
    }));
});
