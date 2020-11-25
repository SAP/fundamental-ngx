import { Component, Input } from '@angular/core';

export interface VhdFilter {
  key: string;
  label: string;
  value: string;
  advanced: boolean;
  include: boolean;
  exclude: boolean;
}

@Component({
  selector: 'fdp-value-help-dialog-filter',
  template: ''
})
export class PlatformVhdFilterComponent implements VhdFilter {
  @Input()
  key: string;
  @Input()
  mobileTableHeader: boolean;
  @Input()
  label: string;
  @Input()
  advanced = true;
  @Input()
  value = '';

  @Input()
  include = true;
  @Input()
  exclude = true;
}
