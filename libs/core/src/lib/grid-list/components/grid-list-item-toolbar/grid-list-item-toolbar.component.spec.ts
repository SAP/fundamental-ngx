import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListItemToolbarComponent } from './grid-list-item-toolbar.component';

describe('GridListItemToolbarComponent', () => {
    let component: GridListItemToolbarComponent;
    let fixture: ComponentFixture<GridListItemToolbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GridListItemToolbarComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GridListItemToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
