import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { MessagePageModule } from '@fundamental-ngx/core/message-page';

@Component({
    selector: 'fd-message-page-error-example',
    templateUrl: './message-page-error-example.component.html',
    imports: [MessagePageModule, LinkComponent]
})
export class MessagePageErrorExampleComponent {}

@Component({
    selector: 'fd-message-page-filter-example',
    templateUrl: './message-page-filter-example.component.html',
    imports: [MessagePageModule]
})
export class MessagePageFilterExampleComponent {}

@Component({
    selector: 'fd-message-page-no-items-example',
    templateUrl: './message-page-no-items-example.component.html',
    imports: [MessagePageModule]
})
export class MessagePageNoItemsExampleComponent {}

@Component({
    selector: 'fd-message-page-search-example',
    templateUrl: './message-page-search-example.component.html',
    imports: [MessagePageModule]
})
export class MessagePageSearchExampleComponent {}

@Component({
    selector: 'fd-message-page-actions-example',
    templateUrl: './message-page-actions-example.component.html',
    imports: [MessagePageModule, ButtonComponent, ContentDensityDirective]
})
export class MessagePageActionsExampleComponent {}

@Component({
    selector: 'fd-message-page-custom-icon-example',
    templateUrl: './message-page-custom-icon-example.component.html',
    imports: [MessagePageModule, ButtonComponent, ContentDensityDirective]
})
export class MessagePageCustomIconExampleComponent {}

@Component({
    selector: 'fd-message-page-no-icon-example',
    templateUrl: './message-page-no-icon-example.component.html',
    imports: [MessagePageModule, ButtonComponent, ContentDensityDirective]
})
export class MessagePageNoIconExampleComponent {}
