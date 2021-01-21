import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { TableService } from './table.service';

describe('TableComponent', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;
    const tableSpy = jasmine.createSpyObj('TableService', ['changeKeys']);

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TableComponent],
            providers: [
                {provide: TableService, useValue: tableSpy}
            ]
        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
