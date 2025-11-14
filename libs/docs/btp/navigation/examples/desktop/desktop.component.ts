import { BreakpointObserver } from '@angular/cdk/layout';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnDestroy,
    OnInit,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FDB_NAVIGATION, FdbNavigationState } from '@fundamental-ngx/btp/navigation';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import {
    ToolLayoutComponent,
    ToolLayoutContainerDirective,
    ToolLayoutContentContainerDirective,
    ToolLayoutHeaderContainerDirective,
    ToolLayoutNavigationContainerDirective
} from '@fundamental-ngx/btp/tool-layout';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';

import { ShellbarComponent, ShellbarModule } from '@fundamental-ngx/core/shellbar';

export interface ExampleNavigationItem {
    icon?: string;
    title: string;
    expanded?: boolean;
    group?: boolean;
}

@Component({
    selector: 'fdb-desktop',
    templateUrl: './desktop.component.html',
    imports: [
        RouterLink,
        FormsModule,
        ButtonComponent,
        SegmentedButtonComponent,
        ToolLayoutComponent,
        ToolLayoutContainerDirective,
        ToolLayoutContentContainerDirective,
        ToolLayoutHeaderContainerDirective,
        ToolLayoutNavigationContainerDirective,
        ShellbarComponent,
        ShellbarModule,
        FDB_NAVIGATION
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NavigationDesktopExampleComponent implements OnInit, OnDestroy {
    state: FdbNavigationState = 'expanded';
    mode: FdbViewMode = '';

    isMobile = signal(false);

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

    toggleSideNavState(): void {
        this.state = this.state === 'expanded' ? 'snapped' : 'expanded';
    }
}
