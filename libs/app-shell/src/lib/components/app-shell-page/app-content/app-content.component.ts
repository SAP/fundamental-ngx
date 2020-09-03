import {
    ChangeDetectionStrategy,
    Component,
    OnInit
} from '@angular/core';


@Component({
    selector: 'fds-app-content',
    templateUrl: './app-content.component.html',
    styleUrls: ['./app-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellContentComponent implements OnInit {

    ngOnInit(): void {
        // API here to subscribe to provider
    }
}
