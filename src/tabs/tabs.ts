import {
  Component,
  ViewEncapsulation,
  OnInit,
  AfterContentInit,
  Input,
  QueryList,
  ContentChildren
} from '@angular/core';

@Component({
  selector: 'fd-tab',
  host: {
    role: 'tabpanel',
    class: 'fd-tabs__panel',
    '[attr.aria-expanded]': 'expanded ? true : null',
    '[class.is-expanded]': 'expanded',
    '[id]': 'id'
  },
  template: `
      <ng-container *ngIf="expanded">
        <ng-content></ng-content>
      </ng-container>
    `
})
export class TabPanelComponent implements OnInit {
  @Input() title;

  @Input() disabled;

  id: string;
  expanded = false;

  ngOnInit() {}
}

@Component({
  selector: 'fd-tab-list',
  encapsulation: ViewEncapsulation.None,
  template: `
      <ul class="fd-tabs" role="tablist">
        <li class="fd-tabs__item" *ngFor="let tab of tabs">
          <a role="tab"
            class="fd-tabs__link" 
            [attr.aria-controls]="tab.id"
            [attr.aria-disabled]="tab.disabled"
            [attr.aria-selected]="tab.expanded ? true : null"
            [class.is-selected]="tab.expanded" 
            [href]="'#' + tab.id" 
            (click)="select($event, tab)">{{ tab.title }}</a>
        </li>
      </ul>
      <ng-content select="fd-tab"></ng-content>
    `,
  styles: [
    `
      :host,
      fd-tab {
        display: block;
      }
    `
  ]
})
export class TabListComponent implements AfterContentInit {
  @ContentChildren(TabPanelComponent) tabs: QueryList<TabPanelComponent>;

  selected: TabPanelComponent;

  ngAfterContentInit() {
    this.selected = this.tabs.first;
    this.tabs.forEach(tab => {
      tab === this.selected ? (tab.expanded = true) : (tab.expanded = false);
    });
  }

  select($event: MouseEvent, tab: TabPanelComponent) {
    $event.preventDefault();

    if (this.selected) {
      this.selected.expanded = false;
      this.selected = tab;
      this.selected.expanded = true;
      this.selected.disabled === 'true' ? (this.selected.expanded = false) : (this.selected.expanded = true);
    }
  }
}
