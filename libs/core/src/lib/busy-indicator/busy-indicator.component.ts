import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

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
  loading: boolean = false;

  /** Aria label for the 'loading' spinner. */
  @Input()
  loadingLabel: string = 'Loading';

  constructor() { }

}
