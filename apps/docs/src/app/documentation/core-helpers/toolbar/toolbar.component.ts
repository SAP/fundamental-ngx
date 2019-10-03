import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'fd-docs-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

    @Output()
    btnClicked: EventEmitter<undefined> = new EventEmitter<undefined>();

    version: string = environment.version;

    public isOnCore: boolean = false;

    constructor (
        private routerService: Router
    ) {
        this.isOnCore = this.routerService.url && this.routerService.url.includes('core/');
    }

    changeLibChange(): void {
        if (this.isOnCore) {
            this.routerService.navigate(['platform/home']);
        } else {
            this.routerService.navigate(['core/home']);
        }
    }
}
