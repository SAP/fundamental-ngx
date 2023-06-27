import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { isObservable, Observable, of } from 'rxjs';
import { AbstractDataProvider } from './base/abstract-data-provider.class';
import { BaseDataSource } from './base/base-data-source.class';
import { DataSourceDirective } from './data-source.directive';
import { isDataSource } from './helpers/is-datasource';
import { DataSource, DataSourceParser, DataSourceProvider } from './models';
import { Component, inject } from '@angular/core';
import { FD_DATA_SOURCE_TRANSFORMER } from './tokens';

export const dataProviderData = [1, 2, 3, 4, 5];
export const arrayData = [6, 7, 8, 9];

export class MockDataProvider extends AbstractDataProvider<any> {
    constructor(public items: any[]) {
        super();
    }
    fetch(): Observable<any[]> {
        return of(this.items);
    }

    getTotalItems(params?: Map<string, any>): Observable<number> {
        return of(this.items.length);
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

@Component({
    template: '',
    standalone: true,
    hostDirectives: [DataSourceDirective]
})
export class HostComponent {
    public directive = inject(DataSourceDirective);
}

describe('DataSourceDirective', () => {
    let directive: DataSourceDirective<any>;
    let fixture: ComponentFixture<HostComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent],
            providers: [
                {
                    provide: FD_DATA_SOURCE_TRANSFORMER,
                    useClass: mockDataSourceParser
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        directive = fixture.componentInstance.directive;
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
