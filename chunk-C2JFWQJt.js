import {I as It,bb as ngt,bc as Umt,bf as ybt,l as ls,g as lv,h as Za,s as sr,bg as Pbt,bh as ugt,bj as Yvt,t as ti,aj as wS}from'./main-5LNHRSED.js';var h=(()=>{class o{constructor(){this.componentName="Scoping";}static{this.\u0275fac=function(a){return new(a||o)};}static{this.\u0275cmp=It({type:o,selectors:[["ui5-scoping-header"]],decls:6,vars:1,template:function(a,l){a&1&&(ls(0,"fd-doc-page")(1,"header"),lv(2),Za(),ls(3,"description"),lv(4," Run multiple versions of UI5 Web Components on the same page without tag name collisions. "),Za(),sr(5,"fd-header-tabs"),Za()),a&2&&(ti(2),wS(l.componentName));},dependencies:[Pbt,ugt,Umt,Yvt],encapsulation:2});}}return o})();var E=(()=>{class o{static{this.\u0275fac=function(a){return new(a||o)};}static{this.\u0275cmp=It({type:o,selectors:[["ui5-scoping-docs"]],decls:234,vars:0,consts:[["id","overview","componentName","scoping"],["href","https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry","target","_blank","rel","noopener"],["id","when","componentName","scoping"],["id","setup","componentName","scoping"],["role","alert",1,"fd-message-strip","fd-message-strip--warning",2,"margin-top","0.5rem"],[1,"fd-message-strip__text"],["id","angular-templates","componentName","scoping"],["id","schemas","componentName","scoping"],["id","scoping-rules","componentName","scoping"],["id","css-selectors","componentName","scoping"],["id","complete-example","componentName","scoping"],["id","troubleshooting","componentName","scoping"]],template:function(a,l){a&1&&(ls(0,"fd-docs-section-title",0),lv(1," Overview "),Za(),ls(2,"description")(3,"p"),lv(4," UI5 Web Components are registered as "),ls(5,"a",1),lv(6,"custom elements"),Za(),lv(7," in the browser. The custom element registry is global and allows only "),ls(8,"strong"),lv(9,"one definition per tag name"),Za(),lv(10,". This becomes a problem when multiple micro-frontends or applications on the same page ship different versions of UI5 Web Components \u2014 they would try to register "),ls(11,"code"),lv(12,"<ui5-button>"),Za(),lv(13," twice. "),Za(),ls(14,"p")(15,"strong"),lv(16,"Scoping"),Za(),lv(17," solves this by appending a suffix to every tag name. For example, with the suffix "),ls(18,"code"),lv(19,"myapp"),Za(),lv(20,", the tag "),ls(21,"code"),lv(22,"<ui5-button>"),Za(),lv(23," becomes "),ls(24,"code"),lv(25,"<ui5-button-myapp>"),Za(),lv(26,". Each application gets its own isolated set of custom element definitions. "),Za()(),sr(27,"separator"),ls(28,"fd-docs-section-title",2),lv(29," When do you need scoping? "),Za(),ls(30,"description")(31,"p"),lv(32," You need scoping when "),ls(33,"strong"),lv(34,"different versions"),Za(),lv(35," of UI5 Web Components run on the same page. This typically happens in: "),Za(),ls(36,"ul")(37,"li"),lv(38,"Micro-frontend architectures (Module Federation, single-spa, iframe-less shell apps)"),Za(),ls(39,"li"),lv(40,"Multiple Angular apps composed into a single page"),Za()(),ls(41,"p"),lv(42," If all apps on the page use the "),ls(43,"strong"),lv(44,"same version"),Za(),lv(45," of UI5 Web Components, they share the same custom element registration and scoping is not needed. "),Za()(),sr(46,"separator"),ls(47,"fd-docs-section-title",3),lv(48," Setup "),Za(),ls(49,"description")(50,"p"),lv(51," Add this call at the very top of your "),ls(52,"code"),lv(53,"main.ts"),Za(),lv(54,", before any UI5 component import. The suffix must contain only alphanumeric characters, dashes, and underscores ("),ls(55,"code"),lv(56,"/^[a-zA-Z0-9_-]+$/"),Za(),lv(57,"). "),Za(),ls(58,"pre")(59,"code"),lv(60,`import { setCustomElementsScopingSuffix } from '@ui5/webcomponents-base/dist/CustomElementsScope.js';

setCustomElementsScopingSuffix('myapp');`),Za()(),ls(61,"div",4)(62,"p",5)(63,"strong"),lv(64,"Order matters."),Za(),ls(65,"code"),lv(66,"setCustomElementsScopingSuffix"),Za(),lv(67," must be called before any UI5 Web Components are imported or registered. If called too late, a console warning will appear and some components may not be scoped. "),Za()(),ls(68,"p"),lv(69,"That's it. No other configuration is needed \u2014 UI5 handles the rest internally."),Za()(),sr(70,"separator"),ls(71,"fd-docs-section-title",6),lv(72,` Using scoped components in Angular templates
`),Za(),ls(73,"description")(74,"p"),lv(75," Once scoping is active, all UI5 custom element tags get the suffix appended (e.g. "),ls(76,"code"),lv(77,"<ui5-button>"),Za(),lv(78," becomes "),ls(79,"code"),lv(80,"<ui5-button-myapp>"),Za(),lv(81,"). The component behavior, properties, events, and slots remain identical \u2014 only the HTML tag name changes. "),Za(),ls(82,"p"),lv(83," Use the scoped tag name as the HTML element and add the original name as an attribute to activate the Angular wrapper: "),Za(),ls(84,"pre")(85,"code"),lv(86,`<!-- With suffix "myapp" -->
<ui5-button-myapp ui5-button [design]="'Emphasized'">Submit</ui5-button-myapp>
<ui5-input-myapp ui5-input [placeholder]="'Search...'"></ui5-input-myapp>
<ui5-dialog-myapp ui5-dialog [headerText]="'Confirm'">...</ui5-dialog-myapp>`),Za()(),ls(87,"div",4)(88,"p",5),lv(89," Both parts are required: the "),ls(90,"strong"),lv(91,"scoped tag"),Za(),lv(92," ("),ls(93,"code"),lv(94,"ui5-button-myapp"),Za(),lv(95,") registers the custom element, and the "),ls(96,"strong"),lv(97,"attribute"),Za(),lv(98," ("),ls(99,"code"),lv(100,"ui5-button"),Za(),lv(101,") activates the Angular wrapper. "),Za()()(),sr(102,"separator"),ls(103,"fd-docs-section-title",7),lv(104,` Handling Angular's unknown element warnings
`),Za(),ls(105,"description")(106,"p"),lv(107," When you use scoped tag names like "),ls(108,"code"),lv(109,"<ui5-button-myapp>"),Za(),lv(110,", Angular does not recognize them as known elements by default. To suppress the "),ls(111,"code"),lv(112,"NG8001"),Za(),lv(113," warnings, add "),ls(114,"code"),lv(115,"CUSTOM_ELEMENTS_SCHEMA"),Za(),lv(116," to your component: "),Za(),ls(117,"pre")(118,"code"),lv(119,`import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
    selector: 'app-my-feature',
    template: \`<ui5-button-myapp ui5-button [design]="'Emphasized'">Submit</ui5-button-myapp>\`,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [Button]
})
export class MyFeatureComponent { }`),Za()(),ls(120,"p"),lv(121,"This tells Angular to allow any unknown HTML element without throwing a compile error."),Za()(),sr(122,"separator"),ls(123,"fd-docs-section-title",8),lv(124," Advanced: Scoping rules "),Za(),ls(125,"description")(126,"p"),lv(127," By default, all tags starting with "),ls(128,"code"),lv(129,"ui5-"),Za(),lv(130," are scoped. You can customize which tags get scoped using "),ls(131,"code"),lv(132,"setCustomElementsScopingRules"),Za(),lv(133,": "),Za(),ls(134,"pre")(135,"code"),lv(136,`import {
    setCustomElementsScopingSuffix,
    setCustomElementsScopingRules
} from '@ui5/webcomponents-base/dist/CustomElementsScope.js';

// Set the suffix
setCustomElementsScopingSuffix('myapp');

// Only scope tags starting with "ui5-" but exclude "ui5-icon"
setCustomElementsScopingRules({
    include: [/^ui5-/],
    exclude: [/^ui5-icon$/]
});`),Za()(),ls(137,"p")(138,"strong"),lv(139,"include"),Za(),lv(140," \u2014 array of regular expressions. A tag must match at least one to be scoped."),sr(141,"br"),ls(142,"strong"),lv(143,"exclude"),Za(),lv(144," \u2014 array of regular expressions. A tag matching any exclude rule is not scoped, even if it matches an include rule. "),Za()(),sr(145,"separator"),ls(146,"fd-docs-section-title",9),lv(147," CSS considerations "),Za(),ls(148,"description")(149,"p"),lv(150,"If you have global CSS rules targeting UI5 tag names, they need to be updated to match the scoped names:"),Za(),ls(151,"pre")(152,"code"),lv(153,`/* Before scoping */
ui5-button {
    margin-right: 8px;
}

/* After scoping (suffix: "myapp") */
ui5-button-myapp {
    margin-right: 8px;
}

/* Or use attribute selectors to work with any suffix */
[ui5-button] {
    margin-right: 8px;
}`),Za()(),ls(154,"p"),lv(155," Using the "),ls(156,"strong"),lv(157,"attribute selector"),Za(),ls(158,"code"),lv(159,"[ui5-button]"),Za(),lv(160," in CSS is a good strategy because it works regardless of whether scoping is enabled and what suffix is used. "),Za()(),sr(161,"separator"),ls(162,"fd-docs-section-title",10),lv(163," Complete example "),Za(),ls(164,"description")(165,"p"),lv(166,"Putting it all together for a micro-frontend called "),ls(167,"code"),lv(168,"orders"),Za(),lv(169,":"),Za(),ls(170,"h4"),lv(171,"main.ts"),Za(),ls(172,"pre")(173,"code"),lv(174,`// main.ts \u2014 scoping FIRST, before anything else
import { setCustomElementsScopingSuffix } from '@ui5/webcomponents-base/dist/CustomElementsScope.js';
setCustomElementsScopingSuffix('orders');

(async () => {
    const { bootstrapApplication } = await import('@angular/platform-browser');
    const { appConfig } = await import('./app/app.config');
    const { App } = await import('./app/app');

    await bootstrapApplication(App, appConfig);
})().catch((err) => console.error(err));`),Za()(),ls(175,"h4"),lv(176,"order-list.ts"),Za(),ls(177,"pre")(178,"code"),lv(179,`import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Table } from '@fundamental-ngx/ui5-webcomponents/table';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.html',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [Button, Input, Table]
})
export class OrderList {
    onSearch(event: Event): void {
        // handle search
    }
}`),Za()(),ls(180,"h4"),lv(181,"order-list.html"),Za(),ls(182,"pre")(183,"code"),lv(184,`<!-- All tags use the scoped name + attribute selector -->
<ui5-input-orders ui5-input
    [placeholder]="'Search orders...'"
    (ui5Input)="onSearch($event)">
</ui5-input-orders>

<ui5-table-orders ui5-table>
    <!-- table content -->
</ui5-table-orders>

<ui5-button-orders ui5-button [design]="'Emphasized'">
    New Order
</ui5-button-orders>`),Za()()(),sr(185,"separator"),ls(186,"fd-docs-section-title",11),lv(187," Troubleshooting "),Za(),ls(188,"description")(189,"h4"),lv(190,'Console warning: "Setting the scoping suffix must be done before importing any components"'),Za(),ls(191,"p")(192,"code"),lv(193,"setCustomElementsScopingSuffix"),Za(),lv(194," was called after a UI5 component was already imported. Move the call to the very first lines of "),ls(195,"code"),lv(196,"main.ts"),Za(),lv(197,", before any other imports that might trigger component registration. "),Za(),ls(198,"h4"),lv(199,"Component does not render (empty element)"),Za(),ls(200,"p"),lv(201," Make sure the HTML tag uses the "),ls(202,"strong"),lv(203,"scoped name"),Za(),lv(204," (e.g. "),ls(205,"code"),lv(206,"<ui5-button-myapp>"),Za(),lv(207,"), not the original name ("),ls(208,"code"),lv(209,"<ui5-button>"),Za(),lv(210,"). With scoping active, the original tag name is not registered in the custom element registry. "),Za(),ls(211,"h4"),lv(212,"Angular input/output bindings not working"),Za(),ls(213,"p"),lv(214," Verify that the "),ls(215,"code"),lv(216,"ui5-button"),Za(),lv(217," (or equivalent) attribute is present on the element. The Angular wrapper needs the attribute to activate. Also check that the wrapper component is listed in the "),ls(218,"code"),lv(219,"imports"),Za(),lv(220," array of your component. "),Za(),ls(221,"h4"),lv(222,"NG8001: Unknown element warning"),Za(),ls(223,"p"),lv(224," Add "),ls(225,"code"),lv(226,"CUSTOM_ELEMENTS_SCHEMA"),Za(),lv(227," to the "),ls(228,"code"),lv(229,"schemas"),Za(),lv(230," array of your component decorator. See the "),ls(231,"strong"),lv(232,"Handling Angular's unknown element warnings"),Za(),lv(233," section above. "),Za()());},dependencies:[ngt,Umt,ybt],encapsulation:2});}}return o})();var M=[{path:"",component:h,data:{primary:true},children:[{path:"",component:E}]}],A="scoping";export{A as LIBRARY_NAME,M as ROUTES};