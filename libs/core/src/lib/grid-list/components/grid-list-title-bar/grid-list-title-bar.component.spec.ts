import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListTitleBarComponent } from './grid-list-title-bar.component';

describe('GridListTitleBarComponent', () => {
  let component: GridListTitleBarComponent;
  let fixture: ComponentFixture<GridListTitleBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridListTitleBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridListTitleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
