import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RtlService } from '@fundamental-ngx/core';
import { TableColumnComponent } from './table-column.component';

describe('TableColumnComponent - non RTL', () => {
    let component: TableColumnComponent;
    let fixture: ComponentFixture<TableColumnComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TableColumnComponent],
            providers: [RtlService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableColumnComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set align to center', () => {
        component.align = 'center';
        fixture.detectChanges();

        expect((<any>component)._align).toEqual('center');
    });

    it('should set align to left', () => {
        component.align = 'start';
        fixture.detectChanges();

        expect((<any>component)._align).toEqual('left');
    });

    it('should set align to right', () => {
        component.align = 'end';
        fixture.detectChanges();

        expect((<any>component)._align).toEqual('right');
    });
});

describe('TableColumnComponent - RTL', () => {
    let component: TableColumnComponent;
    let fixture: ComponentFixture<TableColumnComponent>;

    const dirProvider = {
        rtl: of(true)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TableColumnComponent],
            providers: [
                {
                    provide: RtlService,
                    useFactory: () => dirProvider
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableColumnComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should set align to center', () => {
        component.align = 'center';
        fixture.detectChanges();

        expect((<any>component)._align).toEqual('center');
    });

    it('should set align to right', () => {
        component.align = 'start';
        fixture.detectChanges();

        expect((<any>component)._align).toEqual('right');
    });

    it('should set align to left', () => {
        component.align = 'end';
        fixture.detectChanges();

        expect((<any>component)._align).toEqual('left');
    });
});
