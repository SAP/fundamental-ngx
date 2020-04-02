import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

export type BusyIndicatorSize = 's' | 'm' | 'l';

@Component({
  selector: 'fd-busy-indicator',
  templateUrl: './busy-indicator.component.html',
  styleUrls: ['./busy-indicator.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusyIndicatorComponent {

  /** Whether to display the loading indicator animation. */
  @Input()
  loading: boolean;

  /** The size of the loading indicator, default will be medium */
  @Input()
  size: BusyIndicatorSize = 'm';

  /** Aria label for the 'loading' indicator. */
  @Input()
  loadingLabel: string = 'Loading';

}
