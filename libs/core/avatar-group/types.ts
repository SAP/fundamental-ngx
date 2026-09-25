import { Signal } from '@angular/core';
import { Size } from '@fundamental-ngx/cdk/utils';

export type AvatarGroupType = 'individual' | 'group';
export type AvatarGroupOrientation = 'horizontal' | 'vertical';
export type AvatarGroupSize = Size;

export interface AvatarGroupHostConfig {
    type: AvatarGroupType;
    orientation: Signal<AvatarGroupOrientation>;
    size: AvatarGroupSize;
}
