import { Component, ElementRef, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';


@Component({
    selector: 'fdp-platform-carosuel-with-loading-indicator-example',
    templateUrl: './platform-carosuel-with-loading-indicator-example.component.html',
    styleUrls: ['./platform-carosuel-examples.component.scss']
})
export class PlatformCarosuelWithLoadingIndicatorExampleComponent implements OnInit, OnDestroy {
    public showloader = false;
    private subscription: Subscription;
    private timer: Observable<any>;

    public ngOnInit() {
        this.setTimer();
    }
    public ngOnDestroy() {
        if (this.subscription && this.subscription instanceof Subscription) {
            this.subscription.unsubscribe();
        }
    }
    public setTimer() {
        this.showloader = true;
        this.timer = timer(15000);
        this.subscription = this.timer.subscribe(() => {
            this.showloader = false;
        });
    }
}
@Component({
    selector: 'fdp-platform-carosuel-with-error-example',
    templateUrl: './platform-carosuel-with-error-example.component.html',
    styleUrls: ['./platform-carosuel-examples.component.scss']
})
export class PlatformCarosuelWithErrorExampleComponent {

    public errorValue: boolean;
    public errorMessage = ' We could not load the content please check the connection and or refresh the page';

    path: string;
    constructor(private el: ElementRef, private changeDetRef: ChangeDetectorRef) { this.checkPath(); }

    checkPath(): void {
        this.path = this.el.nativeElement.querySelector('firstImg');
        if (this.path != null) {
            this.errorValue = false;
        }
        else { this.errorValue = true; }
        this.changeDetRef.markForCheck();
    }


}

@Component({
    selector: 'fdp-platform-carosuel-number-indicator-example',
    templateUrl: './platform-carosuel-number-indicator-example.component.html',
    styleUrls: ['./platform-carosuel-examples.component.scss']
})
export class PlatformCarosuelNumberIndicatorExampleComponent { }
@Component({
    selector: 'fdp-platform-carosuel-video-example',
    templateUrl: './platform-carosuel-video-example.component.html',
    styleUrls: ['./platform-carosuel-examples.component.scss']
})
export class PlatformCarosuelVideoExampleComponent { }
@Component({
    selector: 'fdp-platform-carosuel-caption-example',
    templateUrl: './platform-carosuel-caption-example.component.html',
    styleUrls: ['./platform-carosuel-examples.component.scss']
})
export class PlatformCarosuelCaptionExampleComponent { }
@Component({
    selector: 'fdp-platform-carosuel-navigation-example',
    templateUrl: './platform-carosuel-navigation-example.component.html',
    styleUrls: ['./platform-carosuel-examples.component.scss']
})
export class PlatformCarosuelNavigationExampleComponent { }
@Component({
    selector: 'fdp-platform-carosuel-indicator-on-top-example',
    templateUrl: './platform-carosuel-indicator-on-top-example.component.html',
    styleUrls: ['./platform-carosuel-examples.component.scss']
})
export class PlatformCarosuelIndicatorOnTopExampleComponent { }
@Component({
    selector: 'fdp-platform-no-control-carosuel-example',
    templateUrl: './platform-carosuel-no-control-example.component.html',
    styleUrls: ['./platform-carosuel-examples.component.scss']
})
export class PlatformCarosuelNoControlExampleComponent { }

@Component({
    selector: 'fdp-platform-carosuel-interval-example',
    templateUrl: './platform-carosuel-interval-example.component.html',
    styleUrls: ['./platform-carosuel-examples.component.scss']
})
export class PlatformCarosuelIntervalExampleComponent { }
@Component({
    selector: 'fdp-platform-carosuel-with-control-example',
    templateUrl: './platform-carosuel-with-control-example.component.html',
    styleUrls: ['./platform-carosuel-examples.component.scss']
})
export class PlatformCarosuelWithControlExampleComponent { }
