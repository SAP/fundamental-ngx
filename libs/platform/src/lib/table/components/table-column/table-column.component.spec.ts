import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { RtlService } from '@fundamental-ngx/core/utils';
import { TableColumnComponent } from './table-column.component';
import { TableColumnResizeService } from '../../table-column-resize.service';
import { TableColumnResizeServiceMock } from './../../mocks/table-column-resize-mock.service';
import { ColumnAlign } from '../../enums/column-align.enum';

describe('TableColumnComponent', () => {
    let component: TableColumnComponent;
    let fixture: ComponentFixture<TableColumnComponent>;

    const dirProvider = {
        rtl: of(true)
    };

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TableColumnComponent],
                providers: [
                    {
                        provide: RtlService,
                        useFactory: () => dirProvider
                    },
                    {
                        provide: TableColumnResizeService,
                        useValue: TableColumnResizeServiceMock
                    }
                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TableColumnComponent);
        component = fixture.componentInstance;
        component.name = 'column-name';
        fixture.detectChanges();
    });

    it('should set align to center', () => {
        component.align = ColumnAlign.CENTER;
        fixture.detectChanges();

        expect((<any>component)._align).toEqual('center');
    });

    it('should set align to right', () => {
        component.align = ColumnAlign.START;
        fixture.detectChanges();

        expect((<any>component)._align).toEqual('right');
    });

    it('should set align to left', () => {
        component.align = ColumnAlign.END;
        fixture.detectChanges();

        expect((<any>component)._align).toEqual('left');
    });
});
