import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-platform-menu-cascade-example',
    templateUrl: './platform-menu-cascade-example.component.html',
    styleUrls: ['./platform-menu-cascade-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformMenuCascadeExampleComponent implements OnInit {
    public item = '';

    ngOnInit(): void { }

    onItemSelect(item: string): void {
        this.item = item;
    }
}
