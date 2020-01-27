import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkExampleComponent } from './link-example.component';

describe('LinkExampleComponent', () => {
  let component: LinkExampleComponent;
  let fixture: ComponentFixture<LinkExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
