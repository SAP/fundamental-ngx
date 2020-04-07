import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DialogRef } from '@fundamental-ngx/core';
import { DialogService } from '../..';

interface DialogContent { title: string, template: TemplateRef<any> }

/**
 * The component that represents a menu.
 */
@Component({
    selector: 'fd-menu',
    templateUrl: './menu.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements AfterViewInit {

    /** Display menu in compact mode */
    @Input()
    compact: boolean = false;

    /** Display menu in mobile mode */
    @Input()
    mobile: boolean = false;

    /** Dialog title used for menu in mobile mode */
    @Input()
    mobileMenuTitle: string;

    // TODO REMOVE INPUT
    @Input()
    separator: boolean = false;

    /** @hidden */
    @ViewChild('dialog')
    dialogTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('menuTemplate')
    menuTemplate: TemplateRef<any>;

    /** Reference to Dialog used in mobile mode */
    dialogRef: DialogRef;

    /** @hidden */
    private _menuTemplates: DialogContent[] = [];

    constructor(private _dialogService: DialogService) {}

    /** @hidden */
    ngAfterViewInit() {
        this._menuTemplates.push({title: this.mobileMenuTitle, template: this.menuTemplate});
        this.openDialog();
    }

    /** @hidden */
    get dialogContent(): DialogContent {
        return this._menuTemplates[this._menuTemplates.length - 1];
    }

    /** @hidden */
    get isOnNestedLevel(): boolean {
        return this._menuTemplates.length > 1;
    }

    /** Open the Dialog to display Menu in mobile mode */
    openDialog(): void {
        if (this.mobile) {
            this._dialogService.open(
                this.dialogTemplate,
                {
                    mobile: true,
                    verticalPadding: false
                }
            )
        }
    }

    /** @hidden */
    goToPreviousMenuLevel(): void {
        this._menuTemplates.pop();
    }

    /** @hidden */
    loadView(view: DialogContent): void {
        this._menuTemplates.push(view);
    }
}
