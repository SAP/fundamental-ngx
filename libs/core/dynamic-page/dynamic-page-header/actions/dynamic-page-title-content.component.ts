import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { ToolbarComponent, ToolbarItemDirective } from '@fundamental-ngx/core/toolbar';
import { DynamicPageResponsiveSize } from '../../constants';

@Component({
    selector: 'fd-dynamic-page-title-content',
    template: `
        @if (_size === 'small') {
            <fd-toolbar
                fdType="transparent"
                (click)="$event.stopPropagation()"
                class="dynamicPageLayoutContentToolbar"
                [clearBorder]="true"
                [forceOverflow]="true"
                [shouldOverflow]="true"
            >
                <div fd-toolbar-item>
                    <ng-template [ngTemplateOutlet]="templateContentRef"></ng-template>
                </div>
            </fd-toolbar>
        }
        @if (_size !== 'small') {
            <div class="fd-dynamic-page__title-content">
                <ng-template [ngTemplateOutlet]="templateContentRef"></ng-template>
            </div>
        }
        <ng-template #templateContentRef>
            <ng-content></ng-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [contentDensityObserverProviders()],
    imports: [ToolbarComponent, ToolbarItemDirective, NgTemplateOutlet]
})
export class DynamicPageTitleContentComponent {
    /** @hidden */
    _size: DynamicPageResponsiveSize;

    /** @hidden */
    constructor(
        private _changeDetRef: ChangeDetectorRef,
        readonly _contentDensityObserver: ContentDensityObserver
    ) {}

    /** @hidden */
    _setSize(size: DynamicPageResponsiveSize): void {
        this._size = size;
        this._changeDetRef.detectChanges();
    }
}
