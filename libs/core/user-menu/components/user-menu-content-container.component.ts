import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    TemplateRef,
    ViewContainerRef,
    ViewEncapsulation,
    contentChild
} from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-user-menu-content-container]',
    template: `<ng-content></ng-content>`,
    host: {
        class: 'fd-user-menu__content-container'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class UserMenuContentContainerComponent implements AfterViewInit {
    /** @hidden */
    readonly viewContainer = contentChild('menu', { read: ViewContainerRef });

    /** @hidden */
    readonly template = contentChild('menu', { read: TemplateRef<any> });

    /** @hidden */
    ngAfterViewInit(): void {
        console.log('template', this.template());
        if (this.viewContainer) {
            const template = this.template();
            this.viewContainer()?.clear();

            // console.log("viewContainer", this.viewContainer());
            console.log('template', template);
            if (template) {
                this.viewContainer()?.createEmbeddedView(template);
            }
        }
    }
}
