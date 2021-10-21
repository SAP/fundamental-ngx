import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListItemFooterBarComponent } from './grid-list-item-footer-bar.component';

describe('GridListItemFooterBarComponent', () => {
    let component: GridListItemFooterBarComponent;
    let fixture: ComponentFixture<GridListItemFooterBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GridListItemFooterBarComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GridListItemFooterBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
