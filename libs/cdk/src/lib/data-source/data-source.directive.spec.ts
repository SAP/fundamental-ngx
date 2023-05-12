import { fakeAsync, tick } from '@angular/core/testing';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { isObservable, Observable, of } from 'rxjs';
import { AbstractDataProvider } from './base/abstract-data-provider.class';
import { BaseDataSource } from './base/base-data-source.class';
import { DataSourceDirective } from './data-source.directive';
import { isDataSource } from './helpers/is-datasource';
import { DataSource, DataSourceParser, DataSourceProvider } from './models';

export const dataProviderData = [1, 2, 3, 4, 5];
export const arrayData = [6, 7, 8, 9];

export class MockDataProvider extends AbstractDataProvider<any> {
    constructor(public items: any[]) {
        super();
    }
    fetch(): Observable<any[]> {
        return of(this.items);
    }
}

export class MockArrayDataSource extends BaseDataSource<number> {
    constructor() {
        super(new MockDataProvider(arrayData));
        this.match('*');
    }
}

export class MockObservableDataSource extends BaseDataSource<number> {
    constructor() {
        super(new MockDataProvider(dataProviderData));
        this.match('*');
    }
}

export class mockDataSourceParser implements DataSourceParser {
    parse(source: DataSource): DataSourceProvider | undefined {
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
}

describe('DataSourceDirective', () => {
    let directive: DataSourceDirective<any>;
    beforeEach(() => {
        directive = new DataSourceDirective(new DestroyedService(), new mockDataSourceParser());
    });
    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should emit new data', fakeAsync(() => {
        const emitSpy = jest.spyOn(directive.dataChanged, 'emit');

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
