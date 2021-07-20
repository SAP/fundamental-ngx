import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconTabBarPopoverClass } from '../icon-tab-bar-popover.class';
import { IconTabBarItem } from '../../../types';
import { DndContainerDirective } from '@fundamental-ngx/core';

@Component({
  selector: 'fd-text-type-popover',
  templateUrl: './text-type-popover.component.html',
  styleUrls: ['./text-type-popover.component.scss']
})
export class TextTypePopoverComponent extends IconTabBarPopoverClass implements AfterViewInit {

  @Input()
  isExtraItemsMode = false;

  @Input()
  parentTab: IconTabBarItem;

  @Input()
  selectedSubItemKey: string;

  @Output()
  selectedSubItem: EventEmitter<any> = new EventEmitter<any>();

  constructor(
      protected _cd: ChangeDetectorRef,
      private dnd: DndContainerDirective<any>,
  ) {
    super(_cd);
  }

  ngAfterViewInit(): void {
  }

  test(): void {
    setTimeout(() => {
      this.dnd.infoChanges();
    }, 200)
  }


  selectItem(selectedItem: IconTabBarItem): void {
    this.isExtraItemsMode
        ? this.selectedExtraItem.emit(selectedItem)
        : this.selectedSubItem.emit(selectedItem);
    this.popover.close();
    // this._cd.detectChanges();
  }
}
