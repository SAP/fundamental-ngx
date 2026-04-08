import { NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
    ViewEncapsulation
} from '@angular/core';
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
            <div
                class="fd-dynamic-page__title-content"
                [class.fd-dynamic-page__title-content--wrap]="titleContentWrap()"
            >
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
    /**
     * Whether the title content text should wrap to multiple lines instead of truncating with ellipsis.
     * @default false
     */
    readonly titleContentWrap = input(false, { transform: booleanAttribute });

    /** @hidden */
    protected readonly _contentDensityObserver = inject(ContentDensityObserver);

    /** Whether the current size is small. */
    protected readonly _isSmall = computed(() => this._dynamicPageService?.responsiveSize() === 'small');

    /** @hidden */
    private readonly _dynamicPageService = inject(DynamicPageService, { optional: true });
}
