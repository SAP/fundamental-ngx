import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListFooterComponent } from './grid-list-footer.component';

describe('GridListFooterComponent', () => {
    let component: GridListFooterComponent;
    let fixture: ComponentFixture<GridListFooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GridListFooterComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GridListFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
