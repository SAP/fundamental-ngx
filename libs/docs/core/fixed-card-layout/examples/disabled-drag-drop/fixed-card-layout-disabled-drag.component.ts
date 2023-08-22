import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { TableModule } from '@fundamental-ngx/core/table';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { ListModule } from '@fundamental-ngx/core/list';
import { CardModule } from '@fundamental-ngx/core/card';
import { FixedCardLayoutModule } from '@fundamental-ngx/core/fixed-card-layout';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { CdkScrollable } from '@angular/cdk/overlay';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-fixed-card-layout-disabled-drag',
    templateUrl: './fixed-card-layout-disabled-drag.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ButtonModule,
        CdkScrollable,
        ScrollbarDirective,
        FixedCardLayoutModule,
        CardModule,
        ListModule,
        ObjectStatusModule,
        FocusableGridDirective,
        TableModule,
        AvatarModule,
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
