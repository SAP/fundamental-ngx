import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';

import { applyCssClass, CssClassBuilder, getRandomColorAccent, Size } from '../../utils/public_api';
import { AvatarGroupOverflowButtonColor } from '../avatar-group.component';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-avatar-group-overflow-button-text]',
    host: { class: 'fd-button__text fd-avatar-group__button-text' }
})
export class AvatarGroupOverflowButtonTextDirective {}
