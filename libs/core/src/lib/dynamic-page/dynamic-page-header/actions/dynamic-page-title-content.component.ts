import {
    Component,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    ContentChild,
    ChangeDetectorRef,
    Input
} from '@angular/core';
import { DynamicPageResponsiveSize } from '../../constants';
import { ToolbarComponent } from '../../../toolbar/toolbar.component';

@Component({
    selector: 'fd-dynamic-page-title-content',
    template: `
        <ng-container *ngIf="_size === 'small'">
            <fd-toolbar fdType="transparent" 
                        [clearBorder]="true" 
                        [forceOverflow]="true" 
                        [shouldOverflow]="true" 
                        [size]="compact ? 'compact' : 'cozy'">
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
})
export class DynamicPageTitleContentComponent {

    @Input()
    compact = false;


    /** @hidden */
    @ContentChild(ToolbarComponent)
    _toolbarComponent: ToolbarComponent;

    /** @hidden */
    _size: DynamicPageResponsiveSize;

    constructor(
        private _changeDetRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    setSize(size: DynamicPageResponsiveSize): void {
        this._size = size;
        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    stopPropagation(event: MouseEvent): void {
        event.stopPropagation();
    }
}
