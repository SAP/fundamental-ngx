import { Component, ViewChildren, QueryList } from '@angular/core';

interface MicroFrontendsWrapper {
    setParameters(inputData: Array<{key: string, value: string}>): void;
}

@Component({
    selector: 'platform-micro-frontends-basic-example',
    styleUrls: ['./platform-micro-frontends-basic-example.component.scss'],
    templateUrl: './platform-micro-frontends-basic-example.component.html',
})
export class PlatformMicroFrontendsBasicExampleComponent {
    @ViewChildren('microfrontendswrapper') eleAnchors!: QueryList<MicroFrontendsWrapper>;
    
    private exampleData: {key: string, value: string}[][] = [
        
        [{   
            key: 'sessionId', 
            value: '001' 
         }, 
         {  key: 'modules', 
            value: '["AppModule", "formModule","BasicModule","BrowserModule","MenuModule"]' 
         }],

        [{   
            key: 'sessionId', 
            value: '002' 
        }, 
        {   key: 'modules', 
            value: '["RouterModule", "HttpModule", "CoreModule","SharedModule","ExampleModule"]' 
        }]
    ];
    /**
     * event message, will show on page's textarea
     */
    public eventlogs: string = '';
    private i: number = 0;
    private elParameters: any[] = this.exampleData[this.i];
    /**
     * custom event handler
     * @param event 
     */
    public onMicroAppEvent(event: {event: string, data: any}) {
       
        this.eventlogs += 'Main app receive event:' + JSON.stringify(event) + '\n';
        
        if (event.data === 'from HERO MicroApp') {
            this.i = this.i === 1 ? 0 : 1; 
            (this.eleAnchors || []).forEach((elementAnchor) => {
                elementAnchor.setParameters(this.exampleData[this.i]);
            });
        }
    }
}
