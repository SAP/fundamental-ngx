import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    contentChild,
    ContentChildren,
    contentChildren,
    effect,
    EventEmitter,
    inject,
    input,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { FocusEscapeDirection, KeyboardSupportService, RtlService } from '@fundamental-ngx/cdk/utils';
import { ContentDensityMode } from '@fundamental-ngx/core';
import { contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogService
} from '@fundamental-ngx/core/dialog';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { UserMenuBodyComponent, UserMenuListItemComponent } from '@fundamental-ngx/core/user-menu';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'fd-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrl: './user-menu.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    host: {
        class: 'fd-user-menu'
    },
    imports: [
        PopoverComponent,
        PopoverBodyComponent,
        PopoverControlComponent,
        DialogBodyComponent,
        DialogComponent,
        DialogFooterComponent,
        CommonModule
    ],
    providers: [KeyboardSupportService, contentDensityObserverProviders()]
})
export class UserMenuComponent implements OnInit, AfterViewInit {
    @ContentChildren(UserMenuListItemComponent)
    _focusItems: QueryList<UserMenuListItemComponent>;

    /** Event thrown, when focus escapes the list */
    @Output()
    focusEscapeList = new EventEmitter<FocusEscapeDirection>();

    mobile = input(false, { transform: booleanAttribute });

    listItems = contentChildren(UserMenuListItemComponent, { descendants: true });

    userMenuBody = contentChild(UserMenuBodyComponent, { descendants: true });

    navigationArrow$: Observable<string>;

    _rtlService = inject(RtlService);

    _dialogService = inject(DialogService);

    constructor() {
        effect(() => {
            const isMobile = this.mobile();
            this.listItems()?.forEach((item) => item.mobile.set(isMobile));
        });
    }

    ngOnInit(): void {
        this.navigationArrow$ = this._rtlService.rtl.pipe(
            map((isRtl) => (isRtl ? 'navigation-right-arrow' : 'navigation-left-arrow'))
        );
    }

    ngAfterViewInit(): void {
        const isMobile = this.mobile();
        this.listItems()?.forEach((item) => item.mobile.set(isMobile));
    }

    openDialog(dialogTemplate: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialogTemplate, {
            mobile: true,
            verticalPadding: false,
            horizontalPadding: false,
            ariaLabelledBy: 'fd-dialog-header-5',
            ariaDescribedBy: 'fd-dialog-body-5',
            contentDensity: ContentDensityMode.COZY
        });

        const refSub = dialogRef.afterClosed.subscribe({
            error: (type) => {
                if (type === 'escape') {
                    const userMenuBody = this.userMenuBody();
                    if (userMenuBody) {
                        userMenuBody.clearSubmenu();
                    }

                    refSub.unsubscribe();
                }
            }
        });
    }
}
