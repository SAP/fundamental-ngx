import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TableColumnResizeService } from '@fundamental-ngx/platform/table-helpers';

import { PlatformTableColumnResizerComponent } from './table-column-resizer.component';
import { TableColumnResizeServiceMock } from './../../mocks/table-column-resize-mock.service';

describe('PlatformTableColumnResizerComponent', () => {
    let component: PlatformTableColumnResizerComponent;
    let fixture: ComponentFixture<PlatformTableColumnResizerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PlatformTableColumnResizerComponent],
            providers: [{ provide: TableColumnResizeService, useClass: TableColumnResizeServiceMock }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlatformTableColumnResizerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
