import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ValueHelpDialogTabs } from '../../models';

@Component({
  selector: 'fdp-define-tab-settings',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
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
