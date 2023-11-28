import { PortalModule } from '@angular/cdk/portal';
import { AsyncPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    effect
} from '@angular/core';
import { PopoverService } from '@fundamental-ngx/core/popover';
import { FdbNavigationListItemComponent } from '../navigation-list-item-component.token';
import { NavigationListItemComponent } from './navigation-list-item.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'li[fdb-navigation-list-overflow-item]',
    standalone: true,
    imports: [PortalModule, AsyncPipe],
    providers: [
        PopoverService,
        {
            provide: FdbNavigationListItemComponent,
            useExisting: NavigationListOverflowItemComponent
        }
    ],
    templateUrl: './navigation-list-overflow-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationListOverflowItemComponent extends NavigationListItemComponent {
    /** @hidden */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('hiddenItems')
    set _hiddenItems(items: FdbNavigationListItemComponent[]) {
        this.hiddenItems().forEach((item) => item.destroyPortal());
        items.forEach((item) => item.createPortal());
        this.hiddenItems.set(items);
    }

    /** @hidden */
    @ViewChild('childrenTemplate', { read: TemplateRef })
    _portal: TemplateRef<any>;

    /** @hidden */
    override additionalBodyClass = 'fd-navigation__list-container fd-navigation__list-container--menu';

    /** @hidden */
    constructor() {
        super();
        effect(
            () => {
                const items = this.hiddenItems();
                this.hasPortalChildren.set(items.length > 0);
                if (items.length === 0) {
                    return;
                }
            },
            {
                allowSignalWrites: true
            }
        );
    }
}
