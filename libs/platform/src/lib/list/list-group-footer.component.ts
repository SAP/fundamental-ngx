import { Component } from '@angular/core';
import { BaseComponent } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-list-footer',
    template: `<li #listFooter class="fd-list__footer" [attr.id]="id" role="option"><ng-content></ng-content></li>`
})
export class ListFooterComponent extends BaseComponent {}
