import {
    ChangeDetectionStrategy,
    Component,
    OnInit
} from '@angular/core';


/**
 * FDS stands for fundamental-shell
 */
@Component({
    selector: 'fds-app-footer',
    templateUrl: './app-footer.component.html',
    styleUrls: ['./app-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellFooterComponent implements OnInit {

    ngOnInit(): void {
    }
}
