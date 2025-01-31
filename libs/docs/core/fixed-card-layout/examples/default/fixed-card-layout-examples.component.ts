import { CdkScrollable } from '@angular/cdk/overlay';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CardModule } from '@fundamental-ngx/core/card';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FixedCardLayoutModule } from '@fundamental-ngx/core/fixed-card-layout';
import { FormItemComponent } from '@fundamental-ngx/core/form';
import { ListModule } from '@fundamental-ngx/core/list';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { TableModule } from '@fundamental-ngx/core/table';

@Component({
    selector: 'fd-fixed-card-layout-examples',
    templateUrl: './fixed-card-layout-examples.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        SegmentedButtonModule,
        FormsModule,
        ButtonComponent,
        CdkScrollable,
        ScrollbarDirective,
        FixedCardLayoutModule,
        CardModule,
        FormItemComponent,
        ObjectStatusComponent,
        ListModule,
        FocusableGridDirective,
        TableModule,
        AvatarComponent,
        ContentDensityDirective
    ]
})
export class FixedCardLayoutExampleComponent {
    cardsHidden = [];

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    isHidden(card: string): boolean {
        return this.cardsHidden.some((_card) => _card === card);
    }

    update(): void {
        this._changeDetectorRef.markForCheck();
    }

    cardDraggedDropped(dropEvent: any): void {
        console.log('Items after drag abd drop: ', dropEvent.items);
    }
}
