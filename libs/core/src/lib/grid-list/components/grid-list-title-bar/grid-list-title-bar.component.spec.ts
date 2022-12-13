import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GridListModule } from '../../grid-list.module';
import { GridListTitleBarComponent } from './grid-list-title-bar.component';

describe('GridListTitleBarComponent', () => {
    let component: GridListTitleBarComponent;
    let fixture: ComponentFixture<GridListTitleBarComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [GridListModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GridListTitleBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
