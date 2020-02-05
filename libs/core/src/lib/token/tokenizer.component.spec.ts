import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenizerComponent } from './tokenizer.component';
import { QueryList } from '@angular/core';

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

  it('should handle inputKeyDown', () => {
    spyOn(component, 'handleTokenFocus');
    const event = {key: 'ArrowLeft'};
    component.inputKeyDown(event);
    expect(component.handleTokenFocus).toHaveBeenCalledWith(event, 0);
  });
});
