import {
  Component, OnInit, Input, QueryList, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';




export interface ActionItem {

  label: string;
  type: string;
  priority: number;
  callback(): void;
}

@Component({
  selector: 'fdp-action-bar-actions',
  templateUrl: './action-bar-actions.component.html',
  styleUrls: ['./action-bar-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBarActionsComponent implements OnInit {




  constructor(
    public cd: ChangeDetectorRef) {
  }


  buttonItems: ActionItem[] = [];
  menuItems: ActionItem[] = [];
  MAX_BUTTONS = 3;
  @Input() placement: string;

  @Input() actionItems: [any];

  @Input() displayOnlyMenu: boolean;

  orderedActionItems: [any];

  @Output() itemClick: EventEmitter<ActionItem> = new EventEmitter<ActionItem>();

  @Output() editMode: EventEmitter<boolean> = new EventEmitter();

  isEditTitle: boolean;
  isEditModeOn: boolean;

  ngOnInit() {
    this.orderActionItem();
    this.splitActionItems();
  }

  orderActionItem() {
    this.orderedActionItems = this.actionItems.sort(function (a, b) {
      return a.priority > b.priority ? 1 : a.priority < b.priority ? -1 : 0
    });
  }

  splitActionItems() {
    let j = 0;
    for (let i = 0; i < this.orderedActionItems.length; i++) {
      if (i < this.MAX_BUTTONS && !this.displayOnlyMenu) {
        this.buttonItems[i] = this.orderedActionItems[i];
      }
      else {

        this.menuItems[j++] = this.orderedActionItems[i];

      }
    }
  }

  onItemClick(item: ActionItem): void {

    this.itemClick.emit(item);
    this.cd.detectChanges();
    item.callback();

  }
  onRenameClick() {
    this.editMode.emit(true);
    this.cd.detectChanges();
  }

}
