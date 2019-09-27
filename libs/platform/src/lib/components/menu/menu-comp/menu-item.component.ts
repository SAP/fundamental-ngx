import {
    Component,
    Input,
    OnDestroy,
    OnInit,
    Output,
    EventEmitter,
    AfterViewInit,
    ViewEncapsulation
} from '@angular/core';
import { MenuItem, MenuGroup } from './menu.component';
import { Highlightable } from '@angular/cdk/a11y';

@Component({
    selector: 'fdp-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    encapsulation: ViewEncapsulation.None
    // providers: [MenuKeyboardService]
})
export class MenuItemComponent implements OnInit, OnDestroy, /*DefaultMenuItem, */ AfterViewInit, Highlightable {
    @Input() public label: string;
    @Input() public index: string;
    @Input() public icon: string;
    @Input() public selectable: boolean;
    @Input() public selected: boolean;
    @Input() public secondaryIcon: string;

    @Input() public item: MenuItem;
    @Input() public group: MenuGroup;

    @Input() public separated: boolean;
    @Input() public disabled: boolean;
    @Input() public customLabel: string;

    public _isActive = false;

    @Output() itemClick: EventEmitter<void> = new EventEmitter();

    constructor() {}

    ngOnInit() {
        // this._isActive = this.selected ? true : false;
    }

    ngOnDestroy() {}

    ngAfterViewInit() {
        // this.menuKeyboardService.focusEscapeAfterList = () => {};
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
