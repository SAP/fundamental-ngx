import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenizerComponent } from './tokenizer.component';

describe('TokenizerComponent', () => {
  let component: TokenizerComponent;
  let fixture: ComponentFixture<TokenizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.tokenizerHasFocus).toBeFalsy();
    expect(component.compact).toBeFalsy();
  });
});
