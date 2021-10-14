import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListGroupHeaderComponent } from './grid-list-group-header.component';

describe('GridListGroupHeaderComponent', () => {
    let component: GridListGroupHeaderComponent;
    let fixture: ComponentFixture<GridListGroupHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GridListGroupHeaderComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GridListGroupHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
