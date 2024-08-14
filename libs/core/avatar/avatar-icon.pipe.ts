import { Pipe, PipeTransform } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { AvatarValueStates } from './avatar-value-states.type';

@Pipe({
    name: 'fdAvatarIcon',
    pure: true,
    standalone: true
})
export class AvatarIconPipe implements PipeTransform {
    /**
     * Selects appropriate Avatar icon based on Avatar Value state and fallback icon.
     */
    transform(valueState: Nullable<AvatarValueStates>, fallbackIcon: Nullable<string>): string {
        let computedIcon = '';
        if (!valueState) {
            computedIcon = fallbackIcon || '';
        }
        switch (valueState) {
            case 'positive':
                computedIcon = 'sys-enter-2';
                break;
            case 'caution':
                computedIcon = 'warning';
                break;
            case 'negative':
                computedIcon = 'error';
                break;
            case 'information':
                computedIcon = 'information';
                break;
        }

        return `sap-icon--${computedIcon} ${valueState ? 'fd-avatar__zoom-icon--' + valueState : ''}`;
    }
}
