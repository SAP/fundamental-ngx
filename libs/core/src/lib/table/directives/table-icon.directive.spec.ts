import { TableIconDirective } from './table-icon.directive';
import { ElementRef } from '@angular/core';

describe('TableIconDirective', () => {
  it('should create an instance', () => {
    const elRef: ElementRef = new ElementRef<any>(`<div></div>`);
    const directive = new TableIconDirective(elRef);
    expect(directive).toBeTruthy();
  });
});
