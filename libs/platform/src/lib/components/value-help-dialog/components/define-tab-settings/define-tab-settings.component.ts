import { Component, Input } from '@angular/core';

import { ValueHelpDialogTabs } from '../../state.service';

@Component({
  selector: 'fdp-define-tab-settings',
  template: '',
  // templateUrl: './define-tab-settings.component.html',
  styleUrls: ['./define-tab-settings.component.scss']
})
export class DefineTabSettingsComponent {
  @Input()
  title: string;

  /** Multiple selection enabled */
  @Input()
  multi = false;

  /** Mobile view */
  @Input()
  mobile = false;

  get type(): ValueHelpDialogTabs {
    return ValueHelpDialogTabs.defineConditions
  }
}
