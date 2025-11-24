import { BreakpointObserver } from '@angular/cdk/layout';
import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnDestroy,
    OnInit,
    signal,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FDB_NAVIGATION, FdbNavigationState } from '@fundamental-ngx/btp/navigation';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import {
    ToolLayoutComponent,
    ToolLayoutContainerDirective,
    ToolLayoutContentContainerDirective,
    ToolLayoutHeaderContainerDirective
} from '@fundamental-ngx/btp/tool-layout';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { PopoverBodyComponent, PopoverComponent, PopoverTriggerDirective } from '@fundamental-ngx/core/popover';
import { ShellbarComponent, ShellbarModule } from '@fundamental-ngx/core/shellbar';

export interface ExampleNavigationItem {
    icon?: string;
    title: string;
    expanded?: boolean;
    group?: boolean;
}

@Component({
    selector: 'fdb-overlay',
    templateUrl: './overlay.component.html',
    imports: [
        FormsModule,
        ButtonComponent,
        ToolLayoutComponent,
        ToolLayoutContainerDirective,
        ToolLayoutContentContainerDirective,
        ToolLayoutHeaderContainerDirective,
        ShellbarComponent,
        ShellbarModule,
        PopoverComponent,
        PopoverBodyComponent,
        PopoverTriggerDirective,
        NgTemplateOutlet,
        FDB_NAVIGATION
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NavigationOverlayExampleComponent implements OnInit, OnDestroy {
    @ViewChild('desktopPopover') desktopPopover: any;

    @ViewChild('mobilePopover') mobilePopover: any;

    confirmationReason: string;

    state: FdbNavigationState = 'expanded';

    mode: FdbViewMode = '';

    isMobile = signal(false);

    get currentPopover(): any {
        return this.desktopPopover || this.mobilePopover;
    }

    private breakpointObserver = inject(BreakpointObserver);

    private mediaQuery = '(max-width: 600px)';

    private breakpointSubscription: any;

    ngOnInit(): void {
        const initialMatch = window.matchMedia(this.mediaQuery).matches;
        this.isMobile.set(initialMatch);

        this.breakpointSubscription = this.breakpointObserver.observe([this.mediaQuery]).subscribe((result) => {
            this.isMobile.set(result.matches);
        });
    }

    ngOnDestroy(): void {
        if (this.breakpointSubscription) {
            this.breakpointSubscription.unsubscribe();
        }
    }

    onQuickCreateClick(): void {
        alert('Quick create!');
    }

    getCurrentWidth(): number {
        return window.innerWidth;
    }
}
