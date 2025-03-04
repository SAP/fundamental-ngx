import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    TemplateRef,
    ViewEncapsulation,
    inject,
    signal,
    viewChild
} from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'fd-user-menu-body',
    templateUrl: './user-menu-body.component.html',
    host: {
        class: 'fd-user-menu__body'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, BarModule, TitleComponent]
})
export class UserMenuBodyComponent implements OnInit {
    readonly bodyHeader = viewChild<TemplateRef<any>>('bodyHeader');

    protected navigationArrow$: Observable<string>;
    protected submenu = signal<TemplateRef<any> | null>(null);
    protected selectedItemTitle = signal<string | null>(null);

    private _rtlService = inject(RtlService);

    selectItem(submenuTpl: TemplateRef<any> | null): void {
        this.submenu.set(submenuTpl);
    }

    updateTitle(title: string | null): void {
        this.selectedItemTitle.set(title);
    }

    clearSubmenu(): void {
        this.submenu.set(null);
        this.selectedItemTitle.set(null);
    }

    closeDialog(dialogRef): void {
        dialogRef.dismiss('Close');
        this.clearSubmenu();
    }

    ngOnInit(): void {
        this.navigationArrow$ = this._rtlService.rtl.pipe(
            map((isRtl) => (isRtl ? 'navigation-right-arrow' : 'navigation-left-arrow'))
        );
    }
}
