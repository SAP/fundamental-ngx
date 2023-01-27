import { InjectionToken } from '@angular/core';
import { SearchComponent } from '@fundamental-ngx/core/shared';

export const FD_SHELLBAR_SEARCH_CONFIG = new InjectionToken('FdShellbarSearchConfig');

export const FD_SHELLBAR_SEARCH_COMPONENT = new InjectionToken<SearchComponent>('FdShellbarSearchComponent');

export const FD_SHELLBAR_ACTION_COMPONENT = new InjectionToken('FdShellbarActionComponent');
