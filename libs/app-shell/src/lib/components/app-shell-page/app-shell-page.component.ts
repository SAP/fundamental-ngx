import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    Inject,
    OnInit
} from '@angular/core';
import { AppShellHeaderComponent } from './app-header/app-header.component';
import { IS_APPSHELL_STANDALONE } from '../../tokens';


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


    constructor(@Inject(IS_APPSHELL_STANDALONE) public _isStandalone: boolean) {
    }

    ngOnInit(): void {

    }
}
