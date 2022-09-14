import { Component } from '@angular/core';
import { MessageToastService } from '@fundamental-ngx/core/message-toast';

@Component({
    selector: 'fd-dynamic-page-tabs-example',
    templateUrl: './dynamic-page-tabs-example.component.html',
    styles: [
        `
            .overlay {
                height: 100%;
                width: 100%;
                position: fixed;
                z-index: 10;
                top: 0;
                left: 0;
                background-color: rgb(255, 255, 255);
            }
            .fd-dynamic-page-section-example {
                min-height: 20vh;
            }
        `
    ]
})
export class DynamicPageTabsExampleComponent {
    visible = false;

    stackedTabs = false;

    pageTitle = 'Balenciaga Tripple S Trainers';

    constructor(private _messageToastService: MessageToastService) {}

    onCollapseChange(): void {
        console.log('collapse changed');
    }

    openPage(stacked: boolean): void {
        this.stackedTabs = stacked;
        this.visible = true;
        this._openToast('Dynamic Page has been opened');
    }

    closePage(): void {
        this.visible = false;
    }

    handleAction(action: string): void {
        this.closePage();
        this._openToast(action);
    }

    private _openToast(content: string): void {
        this._messageToastService.open(content, { duration: 3000 });
    }
}
