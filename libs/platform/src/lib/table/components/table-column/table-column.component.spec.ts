import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RtlService } from '@fundamental-ngx/core/utils';
import { TableColumnComponent } from './table-column.component';

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
