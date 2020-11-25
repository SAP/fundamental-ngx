import { Component, Input } from '@angular/core';

import { ValueHelpDialogTabs } from '../../state.service';

@Component({
  selector: 'fdp-select-tab-settings',
  template: '',
  // templateUrl: './select-tab-settings.component.html',
  styleUrls: ['./select-tab-settings.component.scss']
})
export class SelectTabSettingsComponent {
  @Input()
  title: string;

  /** Multiple selection enabled */
  @Input()
  multi = false;

  /** Close dialog after select
   *  It's skipped if multi option is true
  * */
  @Input()
  once = false;

  /** If `select from list` tab has advanced search */
  @Input()
  advanced = true;

  /** Mobile view */
  @Input()
  mobile = false;

  /** Text value displayed in title for open state for advanced search. Only mobile state */
  @Input()
  advancedSearchLabel = 'Advanced Search';

  /** Text value displayed in toggle button control */
  @Input()
  showAdvancedSearchLabel = 'Show advanced search';

  /** Text value displayed in toggle button control */
  @Input()
  hideAdvancedSearchLabel = 'Hide advanced search';

  /** Field name for default render in footer from data */
  @Input()
  tokenViewField = 'name';

  /** Uniq field from data source for track in table view */
  @Input()
  uniqField = 'id';

  /** Items per page */
  @Input()
  itemPerPage: number;

  get type(): ValueHelpDialogTabs {
    return ValueHelpDialogTabs.selectFromList
  }
}
