import{Ie as E,Ke as C,ia as x,oe as d,qe as h}from"./chunk-E4QTDQUJ.js";import"./chunk-TBIXCCYB.js";import{ha as f}from"./chunk-4MOEUG6I.js";import{La as a,Vb as e,Xb as g,Yb as m,Yc as u,_a as l,jb as s,wb as n,xb as t,yb as r}from"./chunk-22TZQ2SX.js";var L=(()=>{class o{constructor(){this.basicUsageExample={language:"typescript",code:`import { FD_LANGUAGE, FdLanguage, FD_LANGUAGE_UKRAINIAN } from '@fundamental-ngx/i18n';

// app.module
@NgModule({
    // ...
    providers: [
        {
            provide: FD_LANGUAGE,
            useValue: of<FdLanguage>(FD_LANGUAGE_UKRAINIAN),
        },
    ],
})
export class AppModule {}`},this.jsonUsageExample={language:"typescript",code:`
import { NgModule, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, map } from 'rxjs';
import { FD_LANGUAGE, FdLanguage, loadJson } from '@fundamental-ngx/i18n';

/**
 * uk.json content
    {
        ...other properties
        "coreMultiComboBox.selectAllLabel": "Select all label custom"
    }
*/

@NgModule({
    // ...
    providers: [
        {
            provide: FD_LANGUAGE,
            useFactory: () => {
                return inject(HttpClient)
                    .get<Record<string, string>>('./assets/i18n/uk.json')
                    .pipe(map(loadJson))
            }
        },
    ],
})
export class AppModule {}
        `},this.propertiesUsageExample={language:"typescript",code:`
import { NgModule, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, map } from 'rxjs';
import { FD_LANGUAGE, FdLanguage, loadProperties } from '@fundamental-ngx/i18n';

/**
 * uk.properties content
...other properties
coreMultiComboBox.selectAllLabel = Select all label custom
*/

@NgModule({
    // ...
    providers: [
        {
            provide: FD_LANGUAGE,
            useFactory: () => {
                return inject(HttpClient) // Or any other way to get the file content
                    .get('./assets/i18n/uk.properties', { responseType: 'text' })
                    .pipe(map(loadProperties))
            }
        },
    ],
})
export class AppModule {}
        `},this.supportedLanguages=["Albanian","Bulgarian","Chinese","Czech","English","French","Georgian","Hindi","Italian","Polish","Russian","Ukrainian"].join(", ")}static{this.\u0275fac=function(i){return new(i||o)}}static{this.\u0275cmp=l({type:o,selectors:[["ng-component"]],decls:37,vars:6,consts:[["id","basic","componentName","i18n"],[3,"file"],["id","json","componentName","i18n"],["id","properties","componentName","i18n"],["href","https://en.wikipedia.org/wiki/.properties","target","_blank","fd-link",""]],template:function(i,p){i&1&&(n(0,"fd-docs-section-title",0),e(1," Basic Usage "),t(),n(2,"description")(3,"code"),e(4,"@fundamental-ngx/i18n"),t(),e(5),n(6,"code"),e(7),t(),e(8," and provide it to the DI context of your interest. "),r(9,"fd-code-snippet",1),t(),r(10,"separator"),n(11,"fd-docs-section-title",2),e(12," Loading JSON "),t(),n(13,"description"),e(14," You can also load the language from a JSON file. In order to do this, you will need to use the "),n(15,"code"),e(16,"loadJson"),t(),e(17," helper function to properly transform the JSON into the "),n(18,"code"),e(19,"FdLanguage"),t(),e(20," interface. "),r(21,"fd-code-snippet",1),t(),r(22,"separator"),n(23,"fd-docs-section-title",3),e(24," Loading Properties "),t(),n(25,"description"),e(26," You can also load the language from a "),n(27,"a",4),e(28,".properties file"),t(),e(29,". In order to do this, you will need to use the "),n(30,"code"),e(31,"loadProperties"),t(),e(32," helper function to properly transform the properties into the "),n(33,"code"),e(34,"FdLanguage"),t(),e(35," interface. "),r(36,"fd-code-snippet",1),t()),i&2&&(a(5),g(" exports already translated messages for the ",p.supportedLanguages,". To use them, you simply import "),a(2),m("FD_LANGUAGE_","{","upperCase(languageName)","}",""),a(2),s("file",p.basicUsageExample),a(12),s("file",p.jsonUsageExample),a(15),s("file",p.propertiesUsageExample))},dependencies:[h,d,x,E,f],encapsulation:2,changeDetection:0})}}return o})();var y=(()=>{class o{static{this.\u0275fac=function(i){return new(i||o)}}static{this.\u0275cmp=l({type:o,selectors:[["ng-component"]],decls:8,vars:2,template:function(i,p){i&1&&(n(0,"header"),e(1,"Loading translations"),t(),n(2,"description"),e(3," Components will load the English language by default. In order to use any other language, you will need to provide an object that implements the "),n(4,"code"),e(5),t(),e(6,` interface in the DI context of the application.
`),t(),r(7,"router-outlet")),i&2&&(a(5),m("Observable","<","FdLanguage",">",""))},dependencies:[C,d,u],encapsulation:2})}}return o})();var _="loading-translations",j=[{path:"",component:y,data:{primary:!0},children:[{path:"",component:L}]}];export{_ as LIBRARY_NAME,j as ROUTES};
