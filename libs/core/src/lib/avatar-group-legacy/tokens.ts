import { FocusableOption } from '@angular/cdk/a11y';
import { InjectionToken } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { AvatarGroupLegacyInterface } from './avatar-group-legacy.interface';

export type FocusableWithElementRef = FocusableOption & HasElementRef;

export const AVATAR_GROUP_LEGACY_FOCUSABLE_AVATAR_DIRECTIVE = new InjectionToken<FocusableWithElementRef>(
    'AvatarGroupLegacyFocusableAvatarDirective'
);

export const AVATAR_GROUP_LEGACY_COMPONENT = new InjectionToken<AvatarGroupLegacyInterface>(
    'AvatarGroupLegacyComponent'
);
