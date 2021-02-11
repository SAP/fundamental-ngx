import { Component } from '@angular/core';

@Component({
    selector: 'text-hyphenation',
    templateUrl: './text-hyphenation.component.html',
    styleUrls: ['./text-hyphenation.component.scss']
})
export class TextHyphenationComponent {
    text = `Lorem ipsum dolor sit amet, con\u00ADsectetur adip\u00ADiscing el\u00ADit, sed do eiusmod tempor incididunt ut labore et do\u00ADlore magna aliqua. Ut enim ad mi\u00ADnim veniam, quis nostrud exer\u00ADcitation ullamco laboris nisi ut aliquip ex ea commodo conse\u00ADquat. Duis aute irure dolor in repre\u00ADhenderit in vo\u00ADluptate velit esse cillum dolore eu fu\u00ADgiat nulla pari\u00ADatur. Excepteur sint occaecat cupidatat non pro\u00ADident, sunt in culpa qui officia deserunt mollit anim id est la\u00ADbo\u00ADrum.`;
}
