import {
    ChangeDetectionStrategy,
    Component,
    Inject
} from '@angular/core';
import { IS_APPSHELL_STANDALONE } from '../../../tokens';


@Component({
    selector: 'fds-app-content',
    templateUrl: './app-content.component.html',
    styleUrls: ['./app-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellContentComponent {


    constructor(@Inject(IS_APPSHELL_STANDALONE) public _isStandalone: boolean) {
    }

}
