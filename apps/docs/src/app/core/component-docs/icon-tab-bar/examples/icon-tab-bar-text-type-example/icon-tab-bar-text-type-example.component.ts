import { Component, OnInit } from '@angular/core';
import { IconTabBarExampleClass } from '../icon-tab-bar-example.class';

@Component({
    selector: 'fd-icon-tab-bar-text-type-example',
    templateUrl: './icon-tab-bar-text-type-example.component.html',
    styleUrls: ['./icon-tab-bar-text-type-example.component.scss']
})
export class IconTabBarTextTypeExampleComponent extends IconTabBarExampleClass implements OnInit {

    ngOnInit(): void {
        this.items = this.generateItems(true);
    }
}
