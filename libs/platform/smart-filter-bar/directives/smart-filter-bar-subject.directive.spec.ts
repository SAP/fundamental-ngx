import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { whenStable } from '@fundamental-ngx/core/tests';
import { PlatformSmartFilterBarModule } from '../smart-filter-bar.module';
import { ArrayTableDataProvider, PlatformTableModule, TableDataSource } from '@fundamental-ngx/platform/table';
import { SmartFilterBarSubjectDirective } from './smart-filter-bar-subject.directive';
import { firstValueFrom } from 'rxjs';

interface SourceItem {
    id: string;
    name: string;
    description: string;
    status: string;
    isVerified: boolean;
    price: {
        value: number;
        currency: string;
    };
}

const generateItems = (length = 50): SourceItem[] =>
    Array.from(Array(length)).map(
        (_, index): SourceItem => ({
            id: `${index}`,
            name: `Product ${index}`,
            description: `Description ${index}`,
            price: {
                value: index,
                currency: 'USD'
            },
            status: index < length / 2 ? 'valid' : 'invalid',
            isVerified: index < length / 2
        })
    );

class TableDataProviderMock extends ArrayTableDataProvider<SourceItem> {
    constructor() {
        super(generateItems(50));
    }
}

@Component({
    template: ` <fdp-table
        fdp-smart-filter-bar-subject
        #subject="fdp-smart-filter-bar-subject"
        [dataSource]="source"
        emptyTableMessage="No data found"
    >
        <fdp-column
            fdp-smart-filter-bar-field-definition
            smartFilterBarFilterable="true"
            name="name"
            key="name"
            label="Name"
            required="true"
            align="start"
            defaultSelected="true"
        >
        </fdp-column>

        <fdp-column
            fdp-smart-filter-bar-field-definition
            smartFilterBarFilterable="true"
            name="description"
            key="description"
            required="true"
            label="Description"
            defaultSelected="false"
        >
        </fdp-column>

        <fdp-column
            fdp-smart-filter-bar-field-definition
            smartFilterBarFilterable="true"
            dataType="number"
            name="price"
            key="price.value"
            label="Price"
            align="end"
            defaultSelected="true"
        >
        </fdp-column>

        <fdp-column
            fdp-smart-filter-bar-field-definition
            filterType="multi-select"
            smartFilterBarFilterable="true"
            name="status"
            key="status"
            label="Status"
            required="true"
            align="center"
            defaultSelected="true"
        >
        </fdp-column>
    </fdp-table>`
})
class TestComponent {
    @ViewChild(SmartFilterBarSubjectDirective)
    directive: SmartFilterBarSubjectDirective;

    source: TableDataSource<SourceItem>;

    constructor() {
        this.source = new TableDataSource(new TableDataProviderMock());
    }
}

describe('SmartFilterBarSubjectDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformTableModule, PlatformSmartFilterBarModule],
            declarations: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(waitForAsync(async () => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await whenStable(fixture);
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return subject', () => {
        const source = component.directive.getDataSource();
        expect(source).toBeInstanceOf(TableDataSource);
    });

    it('should return subject fields', () => {
        const spy = jest.spyOn(component.directive as any, '_transformSubjectField');

        const subjectFieldNames = component.directive.getSubjectFields().map((f) => f.name);

        expect(spy).toHaveBeenCalled();
        expect(subjectFieldNames).toEqual(['name', 'description', 'price', 'status']);
    });

    it('should return field variants', async () => {
        // With Jest runner value being transformed with LodashWrapper for some reason.
        const options = (await firstValueFrom(component.directive.getFieldVariants('status'))).map((o) => o.value);
        expect(options.filter((o: string, i: number) => options.indexOf(o) === i)).toEqual(['valid', 'invalid']);
    });

    it('should return default fields', () => {
        const defaultFields = component.directive.getDefaultFields();

        expect(defaultFields).toEqual(['name', 'price', 'status']);
    });

    it('should return subject state', () => {
        const state = component.directive.getState();
        expect(state.columns).toEqual(['name', 'description', 'price', 'status']);
    });

    it('should return subject', () => {
        const subject = component.directive.getSubject();
        expect(subject).toBeTruthy();
    });
});
