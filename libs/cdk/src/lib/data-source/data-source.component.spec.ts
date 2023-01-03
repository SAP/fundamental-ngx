import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceComponent } from './data-source.component';

describe('DataSourceComponent', () => {
    let component: DataSourceComponent;
    let fixture: ComponentFixture<DataSourceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DataSourceComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(DataSourceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
