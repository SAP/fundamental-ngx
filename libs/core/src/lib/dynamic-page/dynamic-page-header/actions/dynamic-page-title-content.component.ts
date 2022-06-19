import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { DynamicPageResponsiveSize } from '../../constants';
import { ContentDensityConsumer, contentDensityConsumerProviders } from '@fundamental-ngx/core/content-density';

@Component({
    selector: 'fd-dynamic-page-title-content',
    template: `
        <ng-container *ngIf="_size === 'small'">
            <fd-toolbar
                fdType="transparent"
                (click)="$event.stopPropagation()"
                class="dynamicPageLayoutContentToolbar"
                [clearBorder]="true"
                [forceOverflow]="true"
                [shouldOverflow]="true"
                [size]="!_contentDensityConsumer.isCompact ? 'cozy' : 'compact'"
            >
                <div fd-toolbar-item>
                    <ng-container *ngTemplateOutlet="templateContentRef"></ng-container>
                </div>
            </fd-toolbar>
        </ng-container>

        <div class="fd-dynamic-page__title-content" *ngIf="_size !== 'small'">
            <ng-container *ngTemplateOutlet="templateContentRef"></ng-container>
        </div>

        <ng-template #templateContentRef>
            <ng-content></ng-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [contentDensityConsumerProviders()]
})
export class DynamicPageTitleContentComponent {
    /** @hidden */
    _size: DynamicPageResponsiveSize;

    /** @hidden */
    constructor(private _changeDetRef: ChangeDetectorRef, readonly _contentDensityConsumer: ContentDensityConsumer) {}

    /** @hidden */
    _setSize(size: DynamicPageResponsiveSize): void {
        this._size = size;
        this._changeDetRef.detectChanges();
    }
}
