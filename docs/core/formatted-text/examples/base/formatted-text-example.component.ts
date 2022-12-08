import { Component } from '@angular/core';

@Component({
    selector: 'fd-formatted-text-example',
    templateUrl: './formatted-text-example.component.html'
})
export class FormattedTextExampleComponent {
    rawHtmlBase = `
        <h1>Title h1</h1>
        <p>Paragraph with link <a href='http://loripsum.net/' target='_blank'>Link to http://loripsum.net.</a> </p>
        <blockquote cite='http://loripsum.net'>
            Blockquote with cite
        </blockquote>
        <h3>ordered list of items</h3>
        <ol>
            <li>ordered list's item 1</li>
            <li style="color: red;">ordered list's item 2 with style="color: red;"</li>
            <li>ordered list's item 3</li>
        </ol>
        <h3>unordered list of items</h3>
        <ul>
            <li>unordered list's item 1</li>
            <li>unordered list's item 2</li>
            <li>unordered list's item 3</li>
        </ul>
        <h1>Wrong link href will skipped</h1>
        <a href="google.com" title="Redirect to google.com" style="color:#1a0dab;font-size:14px;">
            Link with wrong href google.com (instead http://www.google.com), title and style
        </a>
        <h1>Link with anchor</h1>
        <a href="#target1" title="Redirect to google.com">Anchor link to #target1</a>
    `;
}
