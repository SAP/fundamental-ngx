import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { ToolbarComponent, ToolbarItemDirective } from '@fundamental-ngx/core/toolbar';
import { DynamicPageService } from '../../dynamic-page.service';

@Component({
    selector: 'fd-dynamic-page-title-content',
    template: `
        @if (_isSmall()) {
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
        } @else {
            <div class="fd-dynamic-page__title-content">
                <ng-template [ngTemplateOutlet]="templateContentRef"></ng-template>
            </div>
        }
        <ng-template #templateContentRef>
            <ng-content></ng-content>
        </ng-template>
    `,
    // TO BE REMOVED WITH THE LATEST VERSION OF FUNDAMENTAL STYLES
    styles: [
        `
            .fd-dynamic-page__title-content {
                padding-inline: 1rem 0.2rem;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [contentDensityObserverProviders()],
    imports: [ToolbarComponent, ToolbarItemDirective, NgTemplateOutlet]
})
export class DynamicPageTitleContentComponent {
    /** @hidden */
    protected readonly _contentDensityObserver = inject(ContentDensityObserver);

    /** Whether the current size is small. */
    protected readonly _isSmall = computed(() => this._dynamicPageService?.responsiveSize() === 'small');

    /** @hidden */
    private readonly _dynamicPageService = inject(DynamicPageService, { optional: true });
}
