import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-platform-menu-x-position-example',
    templateUrl: './platform-menu-x-position-example.component.html',
    styleUrls: ['./platform-menu-basic-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformMenuXPositionExampleComponent implements OnInit {
    public item = '';

    ngOnInit() { }

    onItemSelect(item: string) {
        this.item = item;
    }
}
