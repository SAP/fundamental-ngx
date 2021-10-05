import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

export type TagColorType = 'grey' | 'blue' | 'teal' | 'green' | 'mango' | 'red' | 'pink' | 'indigo';

@Component({
  selector: 'fn-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperimentalTagComponent implements OnInit {

  /** 
  * The color of the tag. 
  * Options include grey, blue, teal, green, mango, red, pink, indigo 
  */
  @Input()
  color: TagColorType = 'grey';

  /** Whether the Tag is disabled. */
  @Input()
  disabled: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
