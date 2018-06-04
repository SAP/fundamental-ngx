import { Component, Directive, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { DropdownModule } from '../dropdown/dropdown.module';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

@Component({
    selector: 'fd-action-bar',
    templateUrl: './action-bar.component.html'
})
export class ActionBarComponent {
    @Input() actionBarTitle: string;

    @Input() isNavigation: boolean;
}

@Component({
    selector: 'fd-action-bar-title',
    templateUrl: './action-bar-title.component.html'
})
export class ActionBarTitleComponent {}
