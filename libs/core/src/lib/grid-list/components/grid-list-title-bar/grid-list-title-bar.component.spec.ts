import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GridListModule, GridListTitleBarComponent } from '@fundamental-ngx/core/grid-list';

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
