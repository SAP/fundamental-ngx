import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
    ShellbarMenuItem,
    ShellbarUser,
    ShellbarUserMenu
} from '@fundamental-ngx/core';

/**
 * Service is used by application layer in order to communicate  with the shell bar. The goal is
 * to have a Shell-bar reactive so we can easily push new items.
 */
@Injectable()
export class ShellBarService {
    readonly _productMenu$: BehaviorSubject<ShellbarMenuItem[]>;
    readonly _themeMenu$: BehaviorSubject<ThemeMenu[]>;
    readonly _userMenu$: BehaviorSubject<ShellbarUserMenu[]>;
    readonly _user$: BehaviorSubject<ShellbarUser>;
    readonly _title$: BehaviorSubject<string>;
    readonly _subTitle$: BehaviorSubject<string>;


    constructor() {
        this._productMenu$ = new BehaviorSubject(null);
        this._userMenu$ = new BehaviorSubject(null);
        this._themeMenu$ = new BehaviorSubject(null);
        this._user$ = new BehaviorSubject(null);
        this._title$ = new BehaviorSubject(null);
        this._subTitle$ = new BehaviorSubject(null);

    }

    addProductMenu(cnxMenu: ShellbarMenuItem[]): void {
        this._productMenu$.next(cnxMenu);
    }

    addUserMenu(menu: ShellbarUserMenu[]): void {
        this._userMenu$.next(menu);
    }

    addThemeMenu(menu: ThemeMenu[]): void {
        this._themeMenu$.next(menu);
    }

    setUser(user: ShellbarUser): void {
        this._user$.next(user);
    }

    setTitle(text: string): void {
        this._title$.next(text);
    }

    setSubTitle(text: string): void {
        this._subTitle$.next(text);
    }
}


export interface ThemeMenu {
    id: string;
    name: string;
}
