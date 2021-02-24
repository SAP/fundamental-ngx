import { Component } from '@angular/core';

@Component({
    selector: 'fd-illustrated-message-example',
    templateUrl: './illustrated-message-example.component.html'
})
export class IllustratedMessageExampleComponent {
    sceneConfig = {
        scene: {url: 'assets/images/sapIllus-Scene-NoMail.svg', id: 'sapIllus-Scene-NoMail-1'}, 
        dialog: {url: 'assets/images/sapIllus-Dialog-NoMail.svg', id: 'sapIllus-Dialog-NoMail'}
    }

}
