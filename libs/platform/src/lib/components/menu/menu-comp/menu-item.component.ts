import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  MenuItem,
  MenuGroup
} from './menu.component';
import { Highlightable } from '@angular/cdk/a11y';

@Component({
  selector: 'fdp-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit, OnDestroy, Highlightable {

  @Input() public label: string;
  @Input() public index: string;
  @Input() public icon: string;
  @Input() public selectable: boolean;
  @Input() public selected: boolean;
  @Input() public secondaryIcon: string;

  @Input() public item: MenuItem;
  @Input() public group: MenuGroup;

  @Input() public separated: boolean;

  public _isActive = false;

  @Output() itemClick: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  setActiveStyles() {
    this._isActive = true;
  }

  setInactiveStyles() {
    this._isActive = false;
  }

  onItemClick() {
    this.itemClick.emit();
  }

}
