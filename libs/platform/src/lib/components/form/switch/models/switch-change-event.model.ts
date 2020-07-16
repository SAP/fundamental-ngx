import { SwitchComponent } from '../switch/switch.component';

export class SwitchChangeEvent {
  /** The source Checkbox of the event. */
  source: SwitchComponent;
  /** The new `payload` value of the switch. */
  payload: boolean;
}
