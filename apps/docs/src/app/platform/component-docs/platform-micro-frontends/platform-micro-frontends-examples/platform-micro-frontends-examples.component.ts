import { Component, ViewChildren, QueryList } from '@angular/core';
import { MicroFrontendsWrapperComponent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-micro-frontends-example',
    templateUrl: './platform-micro-frontends-example.component.html',
    styles: [`
    .main-app {
      border-width: 2px;
      border-style: dashed;
      border-color: blue;
      padding: 20px;
    }
  `]
})
export class PlatformMicroFrontendsExampleComponent {
    @ViewChildren(MicroFrontendsWrapperComponent) eleAnchors!: QueryList<MicroFrontendsWrapperComponent>;

    datastore: any[][] = [
        [{ key: 'sessionId', value: '001' }, { key: 'modules', value: '["AppModule", "formModule"]' }],
        [{ key: 'sessionId', value: '002' }, { key: 'modules', value: '["RouterModule", "HttpModule"]' }],
        [{ key: 'sessionId', value: '800' }],
        [{ key: 'sessionId', value: '900' }]
    ];

    index: number = 0;
    i: number = 2;
    elParameters: any[] = this.datastore[this.index];
    eventlogs: string =
        `click on tab button to switch microapp
click inside simple microapp , it will emit click event to main app
click inside hero/crisis/vue/reacjs micoapp, it will emit click event to main app
main app will change input data[sessionid] and pass to microapp`;

    routeElementAnchor;

    onMicroAppEvent(event) {
        this.i = this.i === 2 ? 3 : 2;
        this.eventlogs += 'Main app receive event:' + JSON.stringify(event) + '\n';

        (this.eleAnchors || []).forEach((elementAnchor) => {
            elementAnchor.setParameters(this.datastore[this.i]);
        });
        if (this.routeElementAnchor) {
            this.routeElementAnchor.setParameters(this.datastore[this.i]);
        }
    }

    onRouteMicroAppEvent(elementRef) {
        this.routeElementAnchor = elementRef;
        elementRef.oncustomevent.subscribe(event => {
            this.eventlogs += 'Main app receive event:' + JSON.stringify(event) + '\n';
            this.index = this.index === 0 ? 1 : 0;
            this.elParameters = this.datastore[this.index];
        });

    }
}
