import { InjectionToken } from '@angular/core';
import { SearchComponent } from '@fundamental-ngx/core/shared';
import { Shellbar } from './model/shellbar';

export const FD_SHELLBAR_SEARCH_CONFIG = new InjectionToken('FdShellbarSearchConfig');

export const FD_SHELLBAR_SEARCH_COMPONENT = new InjectionToken<SearchComponent>('FdShellbarSearchComponent');

export const FD_SHELLBAR_ACTION_COMPONENT = new InjectionToken('FdShellbarActionComponent');

export const FD_SHELLBAR_ACTIONS_COMPONENT = new InjectionToken('FdShellbarActionSComponent');

export const FD_SHELLBAR_COMPONENT = new InjectionToken<Shellbar>('FdShellbarComponent');

export const FD_SHELLBAR_TITLE_COMPONENT = new InjectionToken<Shellbar>('FdShellbarTitleComponent');

export const FD_SHELLBAR_SUBTITLE_COMPONENT = new InjectionToken<Shellbar>('FdShellbarSubtitleComponent');

export const FD_SHELLBAR_USER_MENU_COMPONENT = new InjectionToken<Shellbar>('FdShellbarUserMenuComponent');
