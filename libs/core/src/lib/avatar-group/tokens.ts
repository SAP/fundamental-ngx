import { InjectionToken } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';
import { HasElementRef } from '@fundamental-ngx/core/utils';
import { AvatarGroupInterface } from './avatar-group.interface';

export type FocusableWithElementRef = FocusableOption & HasElementRef;

export const AVATAR_GROUP_FOCUSABLE_AVATAR_DIRECTIVE = new InjectionToken<FocusableWithElementRef>(
    'AvatarGroupFocusableAvatarDirective'
);

export const AVATAR_GROUP_COMPONENT = new InjectionToken<AvatarGroupInterface>('AvatarGroupComponent');
