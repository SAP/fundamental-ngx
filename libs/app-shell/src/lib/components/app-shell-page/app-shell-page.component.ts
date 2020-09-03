import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';
import { AppShellHeaderComponent } from './app-header/app-header.component';


/**
 * FDS stands for fundamental-shell
 */
@Component({
    selector: 'fds-app',
    templateUrl: './app-shell-page.component.html',
    styleUrls: ['./app-shell-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellPageComponent implements OnInit {
    @ContentChild(AppShellHeaderComponent, { static: true })
    header: AppShellHeaderComponent;

    /**
     * Hides shell header.
     */
    @Input()
    hideHeader: boolean;

    /**
     * Hides shell footer.
     */
    @Input()
    hideFooter: boolean;


    ngOnInit(): void {

    }
}
