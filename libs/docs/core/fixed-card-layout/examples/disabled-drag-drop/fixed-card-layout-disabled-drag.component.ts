import { CdkScrollable } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CardModule } from '@fundamental-ngx/core/card';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FixedCardLayoutModule } from '@fundamental-ngx/core/fixed-card-layout';
import { ListModule } from '@fundamental-ngx/core/list';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TableModule } from '@fundamental-ngx/core/table';

@Component({
    selector: 'fd-fixed-card-layout-disabled-drag',
    templateUrl: './fixed-card-layout-disabled-drag.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ButtonComponent,
        CdkScrollable,
        ScrollbarDirective,
        FixedCardLayoutModule,
        CardModule,
        ListModule,
        ObjectStatusComponent,
        FocusableGridDirective,
        TableModule,
        AvatarComponent,
        ContentDensityDirective
    ]
})
export class FixedCardLayoutDisabledDragExampleComponent {
    dragDisabled = false;

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    public changeDragBehaviour(): void {
        this.dragDisabled = !this.dragDisabled;
    }

    public onResized(): void {
        this._changeDetectorRef.markForCheck();
    }
}
