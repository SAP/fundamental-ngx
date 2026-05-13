import{$e as g,He as m,Ie as c,Je as u,af as x,gf as S}from"./chunk-JJMPQSJC.js";import"./chunk-67I4SABO.js";import"./chunk-JKMHZWOD.js";import{La as p,Wa as r,Yb as e,Zb as d,vb as n,wb as t,xb as i}from"./chunk-NXDTOZOP.js";import"./chunk-3DNKNTAQ.js";var h=(()=>{class o{constructor(){this.componentName="Scoping"}static{this.\u0275fac=function(a){return new(a||o)}}static{this.\u0275cmp=r({type:o,selectors:[["ui5-scoping-header"]],decls:6,vars:1,template:function(a,l){a&1&&(n(0,"fd-doc-page")(1,"header"),e(2),t(),n(3,"description"),e(4," Run multiple versions of UI5 Web Components on the same page without tag name collisions. "),t(),i(5,"fd-header-tabs"),t()),a&2&&(p(2),d(l.componentName))},dependencies:[c,x,m,g],encapsulation:2,changeDetection:0})}}return o})();var E=(()=>{class o{static{this.\u0275fac=function(a){return new(a||o)}}static{this.\u0275cmp=r({type:o,selectors:[["ui5-scoping-docs"]],decls:234,vars:0,consts:[["id","overview","componentName","scoping"],["href","https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry","target","_blank","rel","noopener"],["id","when","componentName","scoping"],["id","setup","componentName","scoping"],["role","alert",1,"fd-message-strip","fd-message-strip--warning",2,"margin-top","0.5rem"],[1,"fd-message-strip__text"],["id","angular-templates","componentName","scoping"],["id","schemas","componentName","scoping"],["id","scoping-rules","componentName","scoping"],["id","css-selectors","componentName","scoping"],["id","complete-example","componentName","scoping"],["id","troubleshooting","componentName","scoping"]],template:function(a,l){a&1&&(n(0,"fd-docs-section-title",0),e(1," Overview "),t(),n(2,"description")(3,"p"),e(4," UI5 Web Components are registered as "),n(5,"a",1),e(6,"custom elements"),t(),e(7," in the browser. The custom element registry is global and allows only "),n(8,"strong"),e(9,"one definition per tag name"),t(),e(10,". This becomes a problem when multiple micro-frontends or applications on the same page ship different versions of UI5 Web Components \u2014 they would try to register "),n(11,"code"),e(12,"<ui5-button>"),t(),e(13," twice. "),t(),n(14,"p")(15,"strong"),e(16,"Scoping"),t(),e(17," solves this by appending a suffix to every tag name. For example, with the suffix "),n(18,"code"),e(19,"myapp"),t(),e(20,", the tag "),n(21,"code"),e(22,"<ui5-button>"),t(),e(23," becomes "),n(24,"code"),e(25,"<ui5-button-myapp>"),t(),e(26,". Each application gets its own isolated set of custom element definitions. "),t()(),i(27,"separator"),n(28,"fd-docs-section-title",2),e(29," When do you need scoping? "),t(),n(30,"description")(31,"p"),e(32," You need scoping when "),n(33,"strong"),e(34,"different versions"),t(),e(35," of UI5 Web Components run on the same page. This typically happens in: "),t(),n(36,"ul")(37,"li"),e(38,"Micro-frontend architectures (Module Federation, single-spa, iframe-less shell apps)"),t(),n(39,"li"),e(40,"Multiple Angular apps composed into a single page"),t()(),n(41,"p"),e(42," If all apps on the page use the "),n(43,"strong"),e(44,"same version"),t(),e(45," of UI5 Web Components, they share the same custom element registration and scoping is not needed. "),t()(),i(46,"separator"),n(47,"fd-docs-section-title",3),e(48," Setup "),t(),n(49,"description")(50,"p"),e(51," Add this call at the very top of your "),n(52,"code"),e(53,"main.ts"),t(),e(54,", before any UI5 component import. The suffix must contain only alphanumeric characters, dashes, and underscores ("),n(55,"code"),e(56,"/^[a-zA-Z0-9_-]+$/"),t(),e(57,"). "),t(),n(58,"pre")(59,"code"),e(60,`import { setCustomElementsScopingSuffix } from '@ui5/webcomponents-base/dist/CustomElementsScope.js';

setCustomElementsScopingSuffix('myapp');`),t()(),n(61,"div",4)(62,"p",5)(63,"strong"),e(64,"Order matters."),t(),n(65,"code"),e(66,"setCustomElementsScopingSuffix"),t(),e(67," must be called before any UI5 Web Components are imported or registered. If called too late, a console warning will appear and some components may not be scoped. "),t()(),n(68,"p"),e(69,"That's it. No other configuration is needed \u2014 UI5 handles the rest internally."),t()(),i(70,"separator"),n(71,"fd-docs-section-title",6),e(72,` Using scoped components in Angular templates
`),t(),n(73,"description")(74,"p"),e(75," Once scoping is active, all UI5 custom element tags get the suffix appended (e.g. "),n(76,"code"),e(77,"<ui5-button>"),t(),e(78," becomes "),n(79,"code"),e(80,"<ui5-button-myapp>"),t(),e(81,"). The component behavior, properties, events, and slots remain identical \u2014 only the HTML tag name changes. "),t(),n(82,"p"),e(83," Use the scoped tag name as the HTML element and add the original name as an attribute to activate the Angular wrapper: "),t(),n(84,"pre")(85,"code"),e(86,`<!-- With suffix "myapp" -->
<ui5-button-myapp ui5-button [design]="'Emphasized'">Submit</ui5-button-myapp>
<ui5-input-myapp ui5-input [placeholder]="'Search...'"></ui5-input-myapp>
<ui5-dialog-myapp ui5-dialog [headerText]="'Confirm'">...</ui5-dialog-myapp>`),t()(),n(87,"div",4)(88,"p",5),e(89," Both parts are required: the "),n(90,"strong"),e(91,"scoped tag"),t(),e(92," ("),n(93,"code"),e(94,"ui5-button-myapp"),t(),e(95,") registers the custom element, and the "),n(96,"strong"),e(97,"attribute"),t(),e(98," ("),n(99,"code"),e(100,"ui5-button"),t(),e(101,") activates the Angular wrapper. "),t()()(),i(102,"separator"),n(103,"fd-docs-section-title",7),e(104,` Handling Angular's unknown element warnings
`),t(),n(105,"description")(106,"p"),e(107," When you use scoped tag names like "),n(108,"code"),e(109,"<ui5-button-myapp>"),t(),e(110,", Angular does not recognize them as known elements by default. To suppress the "),n(111,"code"),e(112,"NG8001"),t(),e(113," warnings, add "),n(114,"code"),e(115,"CUSTOM_ELEMENTS_SCHEMA"),t(),e(116," to your component: "),t(),n(117,"pre")(118,"code"),e(119,`import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
    selector: 'app-my-feature',
    template: \`<ui5-button-myapp ui5-button [design]="'Emphasized'">Submit</ui5-button-myapp>\`,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [Button]
})
export class MyFeatureComponent { }`),t()(),n(120,"p"),e(121,"This tells Angular to allow any unknown HTML element without throwing a compile error."),t()(),i(122,"separator"),n(123,"fd-docs-section-title",8),e(124," Advanced: Scoping rules "),t(),n(125,"description")(126,"p"),e(127," By default, all tags starting with "),n(128,"code"),e(129,"ui5-"),t(),e(130," are scoped. You can customize which tags get scoped using "),n(131,"code"),e(132,"setCustomElementsScopingRules"),t(),e(133,": "),t(),n(134,"pre")(135,"code"),e(136,`import {
    setCustomElementsScopingSuffix,
    setCustomElementsScopingRules
} from '@ui5/webcomponents-base/dist/CustomElementsScope.js';

// Set the suffix
setCustomElementsScopingSuffix('myapp');

// Only scope tags starting with "ui5-" but exclude "ui5-icon"
setCustomElementsScopingRules({
    include: [/^ui5-/],
    exclude: [/^ui5-icon$/]
});`),t()(),n(137,"p")(138,"strong"),e(139,"include"),t(),e(140," \u2014 array of regular expressions. A tag must match at least one to be scoped."),i(141,"br"),n(142,"strong"),e(143,"exclude"),t(),e(144," \u2014 array of regular expressions. A tag matching any exclude rule is not scoped, even if it matches an include rule. "),t()(),i(145,"separator"),n(146,"fd-docs-section-title",9),e(147," CSS considerations "),t(),n(148,"description")(149,"p"),e(150,"If you have global CSS rules targeting UI5 tag names, they need to be updated to match the scoped names:"),t(),n(151,"pre")(152,"code"),e(153,`/* Before scoping */
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
}`),t()(),n(154,"p"),e(155," Using the "),n(156,"strong"),e(157,"attribute selector"),t(),n(158,"code"),e(159,"[ui5-button]"),t(),e(160," in CSS is a good strategy because it works regardless of whether scoping is enabled and what suffix is used. "),t()(),i(161,"separator"),n(162,"fd-docs-section-title",10),e(163," Complete example "),t(),n(164,"description")(165,"p"),e(166,"Putting it all together for a micro-frontend called "),n(167,"code"),e(168,"orders"),t(),e(169,":"),t(),n(170,"h4"),e(171,"main.ts"),t(),n(172,"pre")(173,"code"),e(174,`// main.ts \u2014 scoping FIRST, before anything else
import { setCustomElementsScopingSuffix } from '@ui5/webcomponents-base/dist/CustomElementsScope.js';
setCustomElementsScopingSuffix('orders');

(async () => {
    const { bootstrapApplication } = await import('@angular/platform-browser');
    const { appConfig } = await import('./app/app.config');
    const { App } = await import('./app/app');

    await bootstrapApplication(App, appConfig);
})().catch((err) => console.error(err));`),t()(),n(175,"h4"),e(176,"order-list.ts"),t(),n(177,"pre")(178,"code"),e(179,`import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
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
}`),t()(),n(180,"h4"),e(181,"order-list.html"),t(),n(182,"pre")(183,"code"),e(184,`<!-- All tags use the scoped name + attribute selector -->
<ui5-input-orders ui5-input
    [placeholder]="'Search orders...'"
    (ui5Input)="onSearch($event)">
</ui5-input-orders>

<ui5-table-orders ui5-table>
    <!-- table content -->
</ui5-table-orders>

<ui5-button-orders ui5-button [design]="'Emphasized'">
    New Order
</ui5-button-orders>`),t()()(),i(185,"separator"),n(186,"fd-docs-section-title",11),e(187," Troubleshooting "),t(),n(188,"description")(189,"h4"),e(190,'Console warning: "Setting the scoping suffix must be done before importing any components"'),t(),n(191,"p")(192,"code"),e(193,"setCustomElementsScopingSuffix"),t(),e(194," was called after a UI5 component was already imported. Move the call to the very first lines of "),n(195,"code"),e(196,"main.ts"),t(),e(197,", before any other imports that might trigger component registration. "),t(),n(198,"h4"),e(199,"Component does not render (empty element)"),t(),n(200,"p"),e(201," Make sure the HTML tag uses the "),n(202,"strong"),e(203,"scoped name"),t(),e(204," (e.g. "),n(205,"code"),e(206,"<ui5-button-myapp>"),t(),e(207,"), not the original name ("),n(208,"code"),e(209,"<ui5-button>"),t(),e(210,"). With scoping active, the original tag name is not registered in the custom element registry. "),t(),n(211,"h4"),e(212,"Angular input/output bindings not working"),t(),n(213,"p"),e(214," Verify that the "),n(215,"code"),e(216,"ui5-button"),t(),e(217," (or equivalent) attribute is present on the element. The Angular wrapper needs the attribute to activate. Also check that the wrapper component is listed in the "),n(218,"code"),e(219,"imports"),t(),e(220," array of your component. "),t(),n(221,"h4"),e(222,"NG8001: Unknown element warning"),t(),n(223,"p"),e(224," Add "),n(225,"code"),e(226,"CUSTOM_ELEMENTS_SCHEMA"),t(),e(227," to the "),n(228,"code"),e(229,"schemas"),t(),e(230," array of your component decorator. See the "),n(231,"strong"),e(232,"Handling Angular's unknown element warnings"),t(),e(233," section above. "),t()())},dependencies:[u,m,S],encapsulation:2,changeDetection:0})}}return o})();var M=[{path:"",component:h,data:{primary:!0},children:[{path:"",component:E}]}],A="scoping";export{A as LIBRARY_NAME,M as ROUTES};
