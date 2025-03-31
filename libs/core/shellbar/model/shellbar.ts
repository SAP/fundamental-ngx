import { Nullable } from '@fundamental-ngx/cdk/utils';
import { ShellbarGroupFlexOptions } from './shellbar-sizes';

export interface Shellbar {
    groupFlex: Nullable<ShellbarGroupFlexOptions>;
    _searchToggledFromActions: () => void;
    _actionsExceedShellbarWidth: () => boolean;
}
