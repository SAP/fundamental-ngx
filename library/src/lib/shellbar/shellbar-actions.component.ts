import { Component, ContentChildren, HostListener, Inject, Input, OnInit, QueryList } from '@angular/core';
import { ShellbarActionComponent } from './shellbar-action.component';

@Component({
    selector: 'fd-shellbar-actions',
    templateUrl: './shellbar-actions.component.html'
})
export class ShellbarActionsComponent implements OnInit {
    actionsCollapsed: boolean = false;

    showCollapsedProducts: boolean = false;

    @Input()
    productSwitcher: any[];

    @Input()
    user: {};

    @Input()
    userMenu: any[];

    @ContentChildren(ShellbarActionComponent)
    shellbarActions: QueryList<ShellbarActionComponent>;

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.actionsCollapsed = window.innerWidth < 1024;
    }

    ngOnInit() {
        this.onResize();
    }

    toggleCollapsedProducts(event) {
        event.preventDefault();
        event.stopPropagation();
        this.showCollapsedProducts = !this.showCollapsedProducts;
    }

    constructor( @Inject('Window') private window: Window) { }

}
