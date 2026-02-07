import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarComponent, BarElementDirective, BarLeftDirective, BarMiddleDirective } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { InfoLabelComponent } from '@fundamental-ngx/core/info-label';
import { ListModule, ListSecondaryDirective } from '@fundamental-ngx/core/list';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { TextComponent } from '@fundamental-ngx/core/text';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-list-example',
    templateUrl: './list-example.component.html',
    imports: [ListModule]
})
export class ListExampleComponent {}

@Component({
    selector: 'fd-list-secondary-example',
    templateUrl: './list-secondary-example.component.html',
    imports: [ListModule, NgClass, ListSecondaryDirective]
})
export class ListSecondaryExampleComponent {}

@Component({
    selector: 'fd-list-icon-example',
    templateUrl: './list-icon-example.component.html',
    imports: [ListModule]
})
export class ListIconExampleComponent {}

@Component({
    selector: 'fd-list-complex-example',
    templateUrl: './list-complex-example.component.html',
    imports: [ListModule]
})
export class ListComplexExampleComponent {}

@Component({
    selector: 'fd-list-search-results-example',
    templateUrl: './list-search-results-example.component.html',
    imports: [
        ListModule,
        ButtonComponent,
        PopoverModule,
        BarComponent,
        BarLeftDirective,
        BarMiddleDirective,
        BarElementDirective,
        TitleComponent,
        TextComponent,
        IconComponent,
        InfoLabelComponent,
        AvatarComponent
    ]
})
export class ListSearchResultsExampleComponent {}
