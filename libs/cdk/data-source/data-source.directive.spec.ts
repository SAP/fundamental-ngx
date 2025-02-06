import { Component, inject } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Observable, isObservable, of } from 'rxjs';
import { AbstractDataProvider } from './base/abstract-data-provider.class';
import { BaseDataSource } from './base/base-data-source.class';
import { DataSourceDirective } from './data-source.directive';
import { isDataSource } from './helpers/is-datasource';
import { DataSource, DataSourceParser, DataSourceProvider } from './models';
import { FD_DATA_SOURCE_TRANSFORMER } from './tokens';

const dataProviderData = [1, 2, 3, 4, 5];
const arrayData = [6, 7, 8, 9];

class MockDataProvider extends AbstractDataProvider<any> {
    constructor(public items: any[]) {
        super();
    }

    fetch(): Observable<any[]> {
        return of(this.items);
    }

    getTotalItems(): Observable<number> {
        return of(this.items.length);
    }
}

class MockArrayDataSource extends BaseDataSource<number> {
    constructor() {
        super(new MockDataProvider(arrayData));
        this.match('*');
    }
}

class MockObservableDataSource extends BaseDataSource<number> {
    constructor() {
        super(new MockDataProvider(dataProviderData));
        this.match('*');
    }
}

class MockDataSourceParser implements DataSourceParser {
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
                    useClass: MockDataSourceParser
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

        expect(emitSpy).toHaveBeenCalledTimes(1);
        expect(emitSpy).toHaveBeenCalledWith(arrayData);

        directive.dataSource = new MockObservableDataSource();
        tick(2000);

        expect(emitSpy).toHaveBeenCalledTimes(2);
        expect(emitSpy).toHaveBeenCalledWith(dataProviderData);
    }));
});
