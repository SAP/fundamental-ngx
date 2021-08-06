import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListFilterBarComponent, GridListModule } from '@fundamental-ngx/core/grid-list';

describe('GridListFilterBarComponent', () => {
  let component: GridListFilterBarComponent;
  let fixture: ComponentFixture<GridListFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridListModule]
    })
    .compileComponents();
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
