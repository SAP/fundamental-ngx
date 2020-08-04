import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-platform-menu-basic-example',
    templateUrl: './platform-menu-basic-example.component.html',
    styleUrls: ['./platform-menu-basic-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformMenuBasicExampleComponent implements OnInit {
    public item = '';

    ngOnInit(): void {}

    onItemSelect(item: string): void {
        this.item = item;
    }
}
