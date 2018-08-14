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
    Primary Button
    </button>
    <button fd-button
            [fdType]="'main'">
        Main Button
    </button>
    <button fd-button
            [fdType]="'secondary'">
        Secondary Button
    </button>
    <button fd-button
            [fdType]="'toolbar'">
        Toolbar Button
    </button>
    <button fd-button
            [fdType]="'positive'">
        Positive Button
    </button>
    <button fd-button
            [fdType]="'negative'">
        Negative Button
    </button>
  `;

    buttonHtmlTypeRTL = `
<div dir="rtl">
    <button fd-button>
    לחצן ראשי
    </button>
    <button fd-button
        [fdType]="'main'">
    לחצן ראשי
    </button>
    <button fd-button
        [fdType]="'secondary'">
    לחצן משני
    </button>
    <button fd-button
        [fdType]="'toolbar'">
    לחצן סרגל הכלים
    </button>
    <button fd-button
        [fdType]="'positive'">
    לחצן חיובי
    </button>
    <button fd-button
        [fdType]="'negative'">
    לחצן שלילי
    </button>
</div>`;
}
