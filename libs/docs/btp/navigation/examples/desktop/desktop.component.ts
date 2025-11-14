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
    showNavigation = signal(true);

    isMobile = signal(false);

    private breakpointObserver = inject(BreakpointObserver);

    private mediaQuery = '(max-width: 600px)';

    private breakpointSubscription: any;

    ngOnInit(): void {
        const initialMatch = window.matchMedia(this.mediaQuery).matches;
        this.isMobile.set(initialMatch);

        // Set initial navigation visibility based on mobile mode
        if (initialMatch) {
            this.showNavigation.set(false); // Start hidden in mobile mode
        }

        this.breakpointSubscription = this.breakpointObserver.observe([this.mediaQuery]).subscribe((result) => {
            this.isMobile.set(result.matches);

            // Update navigation visibility when switching between mobile and desktop
            if (result.matches) {
                // Switching to mobile - hide navigation
                this.showNavigation.set(false);
                this.state = 'expanded'; // Always use expanded when shown in mobile
            } else {
                // Switching to desktop - show navigation
                this.showNavigation.set(true);
                this.state = 'expanded';
            }
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
        if (this.isMobile()) {
            // In mobile mode, toggle navigation visibility (always expanded when shown)
            this.showNavigation.set(!this.showNavigation());
            this.state = 'expanded'; // Always use expanded state in mobile mode
        } else {
            // In desktop mode, toggle between expanded and snapped
            this.state = this.state === 'expanded' ? 'snapped' : 'expanded';
        }
    }
}
