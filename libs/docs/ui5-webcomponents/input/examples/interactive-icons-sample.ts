import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { InputIcon } from '@fundamental-ngx/ui5-webcomponents/input-icon';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

import '@ui5/webcomponents-icons/dist/decline.js';
import '@ui5/webcomponents-icons/dist/microphone.js';
import '@ui5/webcomponents-icons/dist/search.js';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-input-interactive-icons-sample',
    templateUrl: './interactive-icons-sample.html',
    imports: [Input, InputIcon, Label]
})
export class InputInteractiveIconsSample {
    searchValue = signal('');
    multiValue = signal('');
    lastAction = signal('none');

    onSearchInput(event: UI5WrapperCustomEvent<Input, 'ui5Input'>): void {
        this.searchValue.set(event.currentTarget.value || '');
    }

    clearSearch(): void {
        this.searchValue.set('');
        this.lastAction.set('search cleared');
    }

    onSearchClick(): void {
        this.lastAction.set('search clicked');
    }

    onVoiceClick(): void {
        this.lastAction.set('voice input clicked');
    }

    onMultiInput(event: UI5WrapperCustomEvent<Input, 'ui5Input'>): void {
        this.multiValue.set(event.currentTarget.value || '');
    }

    clearMulti(): void {
        this.multiValue.set('');
        this.lastAction.set('multi input cleared');
    }
}
