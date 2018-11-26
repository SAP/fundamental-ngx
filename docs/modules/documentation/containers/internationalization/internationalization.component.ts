import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-internationalization',
    templateUrl: './internationalization.component.html'
})
export class InternationalizationDocsComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    alertHtml = ``;
    showAlert(event) {}

    buttonHtmlType = `
    <button fd-button>
        Action Button
    </button>
    <button fd-button
            [fdType]="'standard'">
        Standard Button
    </button>
    <button fd-button
            [fdType]="'positive'">
        Positive Button
    </button>
    <button fd-button
            [fdType]="'medium'">
        Medium Button
    </button>
    <button fd-button
            [fdType]="'negative'">
        Negative Button
    </button>
    <button fd-button
            [options]="'emphasized'">
        Emphasized Button
    </button>
  `;

    buttonHtmlTypeRTL = `
    <button fd-button>
        לחצן ראשי
    </button>
    <button fd-button
            [fdType]="'standard'">
        לחצן ראשי
    </button>
    <button fd-button
            [fdType]="'positive'">
        לחצן משני
    </button>
    <button fd-button
            [fdType]="'medium'">
        לחצן סרגל הכלים
    </button>
    <button fd-button
            [fdType]="'negative'">
        לחצן חיובי
    </button>
    <button fd-button
            [options]="'emphasized'">
        לחצן שלילי
    </button>
`;
}
