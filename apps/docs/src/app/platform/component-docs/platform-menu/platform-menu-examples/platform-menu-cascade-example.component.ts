import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-platform-menu-cascade-example',
    templateUrl: './platform-menu-cascade-example.component.html',
    styleUrls: ['./platform-menu-basic-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformMenuCascadeExampleComponent implements OnInit {
    public item = '';

    ngOnInit() { }

    onItemSelect(item: string) {
        this.item = item;
    }
}
