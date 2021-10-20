import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListMoreBtnComponent } from './grid-list-more-btn.component';

describe('GridListMoreBtnComponent', () => {
    let component: GridListMoreBtnComponent;
    let fixture: ComponentFixture<GridListMoreBtnComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GridListMoreBtnComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GridListMoreBtnComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
