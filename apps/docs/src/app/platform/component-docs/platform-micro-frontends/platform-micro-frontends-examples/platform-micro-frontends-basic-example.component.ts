import { Component, ViewChildren, QueryList } from '@angular/core';

interface MicroFrontendsWrapper {
    setParameters(inputData: any[]);
}

@Component({
    selector: 'platform-micro-frontends-basic-example',
    styleUrls: ['./platform-micro-frontends-basic-example.component.scss'],
    templateUrl: './platform-micro-frontends-basic-example.component.html',
})
export class PlatformMicroFrontendsBasicExampleComponent {
    @ViewChildren('microfrontendswrapper') eleAnchors!: QueryList<MicroFrontendsWrapper>;
    
    exampleData: any[][] = [
        
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
    
    eventlogs: string = '';
    i: number = 0;
    elParameters: any[] = this.exampleData[this.i];

    onMicroAppEvent(event) {
       
        this.eventlogs += 'Main app receive event:' + JSON.stringify(event) + '\n';
        
        if (event.data === 'from HERO MicroApp') {
            this.i = this.i === 1 ? 0 : 1; 
            (this.eleAnchors || []).forEach((elementAnchor) => {
                elementAnchor.setParameters(this.exampleData[this.i]);
            });
        }
    }
}
