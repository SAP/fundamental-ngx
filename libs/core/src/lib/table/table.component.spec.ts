import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { TableService } from './table.service';
import { ContentDensityService, DEFAULT_CONTENT_DENSITY } from '../utils/public_api';

describe('TableComponent', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;
    const tableSpy = jasmine.createSpyObj('TableService', ['changeKeys']);

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TableComponent],
            providers: [{ provide: TableService, useValue: tableSpy }, ContentDensityService]
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

    it('should handle content density when compact input is not provided', () => {
        component.ngOnInit();
        expect(component.compact).toBe(DEFAULT_CONTENT_DENSITY !== 'cozy');
    });
});
