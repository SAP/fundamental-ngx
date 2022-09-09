import { Injectable } from '@angular/core';

@Injectable()
export class CopyService {
    copyText(text: string): boolean {
        const textarea = document.createElement('textarea');
        textarea.style.fontSize = '12pt';
        textarea.style.display = 'hidden';

        const yPosition = window.pageYOffset || document.documentElement.scrollTop;
        textarea.style.top = yPosition + 'px';

        textarea.setAttribute('readonly', '');
        textarea.value = text;

        document.body.appendChild(textarea);

        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);

        const copySuccessful = document.execCommand('copy');
        document.body.removeChild(textarea);

        return copySuccessful;
    }
}
