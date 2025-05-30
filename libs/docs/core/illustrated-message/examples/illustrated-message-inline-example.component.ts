import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IllustratedMessageModule } from '@fundamental-ngx/core/illustrated-message';

@Component({
    selector: 'fd-illustrated-message-inline-example',
    templateUrl: './illustrated-message-inline-example.component.html',
    standalone: true,
    imports: [IllustratedMessageModule, ButtonComponent]
})
export class IllustratedMessageInlineExampleComponent {
    spotConfig = {
        spot: { file: sapIllusSpotRadar, id: 'sapIllus-Dialog-NoMail' },
        dot: { file: sapIllusSpotRadar, id: 'sapIllus-Dialog-NoMail' }
    };
}

export const sapIllusSpotRadar = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128" id="sapIllus-Dialog-NoMail">
    <path class="sapIllus_ObjectFillColor" style="fill:var(--sapIllus_ObjectFillColor)" d="M97.2067,60.8347v40.18a3,3,0,0,1-3,3H33.9947a3,3,0,0,1-3-3V60.8765a3,3,0,0,1,1.254-2.44L62.321,36.9154a3,3,0,0,1,3.487-.0035l30.14,21.48A3,3,0,0,1,97.2067,60.8347Z"/>
    <polygon class="sapIllus_Layering2" style="fill:var(--sapIllus_Layering2)" points="92.761 103.489 35.468 103.489 64.096 82.677 92.761 103.489"/>
    <path class="sapIllus_BrandColorSecondary" style="fill:var(--sapIllus_BrandColorSecondary)" d="M90.367,64.3134,65.917,82.8827a3.0257,3.0257,0,0,1-3.6308.0171L37.626,64.5377l24.716-17.487a3.0264,3.0264,0,0,1,3.4838-.0046Z"/>
    <path class="sapIllus_PatternShadow" style="fill:var(--sapIllus_PatternShadow)" d="M90.5326,64.1056,74.8393,53.3121l-26.5862,19.16L61.852,82.481a4,4,0,0,0,4.8068-.0486Z"/>
    <path class="sapIllus_Layering1" style="fill:var(--sapIllus_Layering1)" d="M63.7051,23.52a1.0169,1.0169,0,0,1-1-1.0334V9.5356a1.0005,1.0005,0,1,1,2,0V22.4867A1.0169,1.0169,0,0,1,63.7051,23.52Z"/>
    <path class="sapIllus_Layering1" style="fill:var(--sapIllus_Layering1)" d="M93.7146,41.4936a1.0127,1.0127,0,0,1-.7165-1.7286l8.9808-8.9742a1.0129,1.0129,0,1,1,1.433,1.4319l-8.9808,8.9742A1.0105,1.0105,0,0,1,93.7146,41.4936Z"/>
    <path class="sapIllus_Layering1" style="fill:var(--sapIllus_Layering1)" d="M33.6873,41.5044a1.01,1.01,0,0,1-.7162-.2968l-8.9771-8.98a1.013,1.013,0,1,1,1.4324-1.4329l8.9771,8.98a1.0132,1.0132,0,0,1-.7162,1.73Z"/>
    <path class="sapIllus_StrokeDetailColor" style="fill:var(--sapIllus_StrokeDetailColor)" d="M96.2422,57.7315,66.1948,36.142a3.4676,3.4676,0,0,0-4.0559.0039l-29.98,21.6317A3.5346,3.5346,0,0,0,30.7,60.6384v40.3442a3.5,3.5,0,0,0,3.2612,3.4947l-.0321.0232.2469-.0013.0133.0013H94.2172a3.5079,3.5079,0,0,0,3.4892-3.5179V60.5966A3.5329,3.5329,0,0,0,96.2422,57.7315Zm-63.506.866,29.98-21.6337a2.4774,2.4774,0,0,1,2.8973-.003L95.6608,58.5523a2.49,2.49,0,0,1,.6548.7262l-4.9722,3.6834q-.5681.38-1.1359.7607L65.6853,46.9533l23.918,17.1739L65.8584,80.0282a3.33,3.33,0,0,1-3.2087.13L38.61,64.0228,62.5492,46.9171,38.2518,63.7824l-1.96-1.3153-4.22-3.1264A2.4893,2.4893,0,0,1,32.7362,58.5975Zm63.97,42.3914a2.5054,2.5054,0,0,1-2.4923,2.513H92.8174l-27.74-20.09,26.6776,20.09H36.3728L63.0443,83.4555,35.3109,103.5019H34.1868a2.5054,2.5054,0,0,1-2.4923-2.513V60.6408a2.4906,2.4906,0,0,1,.0367-.3075L62.0678,82.8075a3.4809,3.4809,0,0,0,4.167,0L96.6663,60.2637a2.49,2.49,0,0,1,.04.3354Z"/>
</svg>`;
