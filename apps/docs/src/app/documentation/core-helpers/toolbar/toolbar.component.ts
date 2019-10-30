import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Libraries } from '../../utilities/libraries';

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
        private routerService: Router,
        @Inject('CURRENT_LIB') private currentLib: Libraries
    ) {
        this.isOnCore = this.currentLib === 'core'
    }

    changeLibChange(): void {
        if (this.isOnCore) {
            this.routerService.navigate(['platform/home']);
        } else {
            this.routerService.navigate(['core/home']);
        }
    }
}
