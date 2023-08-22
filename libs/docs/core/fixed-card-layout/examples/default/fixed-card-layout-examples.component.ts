import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { TableModule } from '@fundamental-ngx/core/table';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { ListModule } from '@fundamental-ngx/core/list';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { FormItemModule } from '@fundamental-ngx/core/form';
import { CardModule } from '@fundamental-ngx/core/card';
import { NgIf } from '@angular/common';
import { FixedCardLayoutModule } from '@fundamental-ngx/core/fixed-card-layout';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { CdkScrollable } from '@angular/cdk/overlay';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormsModule } from '@angular/forms';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';

@Component({
    selector: 'fd-fixed-card-layout-examples',
    templateUrl: './fixed-card-layout-examples.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        SegmentedButtonModule,
        FormsModule,
        ButtonModule,
        CdkScrollable,
        ScrollbarDirective,
        FixedCardLayoutModule,
        NgIf,
        CardModule,
        FormItemModule,
        ObjectStatusModule,
        ListModule,
        FocusableGridDirective,
        TableModule,
        AvatarModule,
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
