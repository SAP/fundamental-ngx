import { InjectionToken } from '@angular/core';
import { AvatarGroupHostConfig } from './types';

export const AVATAR_GROUP_HOST_CONFIG = new InjectionToken<AvatarGroupHostConfig>(
    'AvatarGroup host configuration. Is provided by AvatarGroupComponent.'
);
