import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'fd-shellbar-actions',
    templateUrl: './shellbar-actions.component.html'
})
export class ShellbarActionsComponent implements OnInit {
    actionsCollapsed: boolean = false;

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.actionsCollapsed = window.innerWidth < 1024;
    }

    ngOnInit() {
        this.onResize();
    }

}
