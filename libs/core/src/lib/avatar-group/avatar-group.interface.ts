import { AvatarGroupItemDirective } from './directives/avatar-group-item.directive';
import { AvatarGroupFocusableAvatarDirective } from './directives/avatar-group-focusable-avatar.directive';

export interface AvatarGroupInterface {
    _setActiveItem(item: AvatarGroupFocusableAvatarDirective | AvatarGroupItemDirective): void;
}
