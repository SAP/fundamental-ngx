import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridListModule } from '../../grid-list.module';
import { GridListFilterBarComponent } from './grid-list-filter-bar.component';

describe('GridListFilterBarComponent', () => {
    let component: GridListFilterBarComponent;
    let fixture: ComponentFixture<GridListFilterBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GridListModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GridListFilterBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
