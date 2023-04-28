import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableColumn } from './components';
import { FdpColumnResponsiveState } from './interfaces/column-responsive-state.interface';
import { Table } from './table';

import { FdpTableBreakpoint, TableResponsiveService } from './table-responsive.service';
import { TableService } from './table.service';

@Component({
    selector: 'fdp-test',
    template: '<div></div>',
    providers: [TableResponsiveService]
})
export class TestComponent {
    constructor(public tableResponsiveService: TableResponsiveService) {}
}

export class TableMock {
    getVisibleTableColumns(): TableColumn[] {
        return [];
    }
}

export class TableColumnMock {
    responsiveState: FdpColumnResponsiveState;
}

const column = new TableColumnMock() as TableColumn;

const plainBreakpoints: Record<string, FdpColumnResponsiveState> = {
    '0': 'visible',
    '200': 'hidden',
    '300': 'popping',
    '100': 'popping',
    '500': 'visible'
};

const formattedBreakpoints: FdpTableBreakpoint[] = [
    {
        min: 0,
        max: 99,
        visibility: 'visible'
    },
    {
        min: 100,
        max: 199,
        visibility: 'popping'
    },
    {
        min: 200,
        max: 299,
        visibility: 'hidden'
    },
    {
        min: 300,
        max: 499,
        visibility: 'popping'
    },
    {
        min: 500,
        max: Infinity,
        visibility: 'visible'
    }
];

describe('TableResponsiveService', () => {
    let service: TableResponsiveService;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestComponent],
            providers: [
                TableService,
                {
                    provide: Table,
                    useClass: TableMock
                }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(TestComponent);
        service = fixture.componentInstance.tableResponsiveService;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should transform plain breakpoints to a correct model', () => {
        const breakpointTransformerSpy = spyOn(service as any, '_normalizeBreakpoints').and.callThrough();

        service.registerResponsiveColumn(column, plainBreakpoints);

        expect(breakpointTransformerSpy).toHaveBeenCalledTimes(1);

        const storedBreakpoints = (
            (service as any)._responsiveBreakpoints as Map<TableColumnMock, FdpTableBreakpoint[]>
        ).get(column)!;

        expect(storedBreakpoints).toEqual(formattedBreakpoints);
    });
});
