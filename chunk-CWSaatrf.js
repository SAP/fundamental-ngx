import {I as It,bb as pht,bc as Zbt,bf as Bvt,h as br,k as fl,n as bi,S as Sr,bg as Yvt,bh as yht,bj as eyt,q as jn,aj as hl}from'./main-Y7LNJZTJ.js';var h=(()=>{class o{constructor(){this.componentName="Scoping";}static{this.\u0275fac=function(a){return new(a||o)};}static{this.\u0275cmp=It({type:o,selectors:[["ui5-scoping-header"]],decls:6,vars:1,template:function(a,l){a&1&&(br(0,"fd-doc-page")(1,"header"),fl(2),bi(),br(3,"description"),fl(4," Run multiple versions of UI5 Web Components on the same page without tag name collisions. "),bi(),Sr(5,"fd-header-tabs"),bi()),a&2&&(jn(2),hl(l.componentName));},dependencies:[Yvt,yht,Zbt,eyt],encapsulation:2});}}return o})();var E=(()=>{class o{static{this.\u0275fac=function(a){return new(a||o)};}static{this.\u0275cmp=It({type:o,selectors:[["ui5-scoping-docs"]],decls:234,vars:0,consts:[["id","overview","componentName","scoping"],["href","https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry","target","_blank","rel","noopener"],["id","when","componentName","scoping"],["id","setup","componentName","scoping"],["role","alert",1,"fd-message-strip","fd-message-strip--warning",2,"margin-top","0.5rem"],[1,"fd-message-strip__text"],["id","angular-templates","componentName","scoping"],["id","schemas","componentName","scoping"],["id","scoping-rules","componentName","scoping"],["id","css-selectors","componentName","scoping"],["id","complete-example","componentName","scoping"],["id","troubleshooting","componentName","scoping"]],template:function(a,l){a&1&&(br(0,"fd-docs-section-title",0),fl(1," Overview "),bi(),br(2,"description")(3,"p"),fl(4," UI5 Web Components are registered as "),br(5,"a",1),fl(6,"custom elements"),bi(),fl(7," in the browser. The custom element registry is global and allows only "),br(8,"strong"),fl(9,"one definition per tag name"),bi(),fl(10,". This becomes a problem when multiple micro-frontends or applications on the same page ship different versions of UI5 Web Components \u2014 they would try to register "),br(11,"code"),fl(12,"<ui5-button>"),bi(),fl(13," twice. "),bi(),br(14,"p")(15,"strong"),fl(16,"Scoping"),bi(),fl(17," solves this by appending a suffix to every tag name. For example, with the suffix "),br(18,"code"),fl(19,"myapp"),bi(),fl(20,", the tag "),br(21,"code"),fl(22,"<ui5-button>"),bi(),fl(23," becomes "),br(24,"code"),fl(25,"<ui5-button-myapp>"),bi(),fl(26,". Each application gets its own isolated set of custom element definitions. "),bi()(),Sr(27,"separator"),br(28,"fd-docs-section-title",2),fl(29," When do you need scoping? "),bi(),br(30,"description")(31,"p"),fl(32," You need scoping when "),br(33,"strong"),fl(34,"different versions"),bi(),fl(35," of UI5 Web Components run on the same page. This typically happens in: "),bi(),br(36,"ul")(37,"li"),fl(38,"Micro-frontend architectures (Module Federation, single-spa, iframe-less shell apps)"),bi(),br(39,"li"),fl(40,"Multiple Angular apps composed into a single page"),bi()(),br(41,"p"),fl(42," If all apps on the page use the "),br(43,"strong"),fl(44,"same version"),bi(),fl(45," of UI5 Web Components, they share the same custom element registration and scoping is not needed. "),bi()(),Sr(46,"separator"),br(47,"fd-docs-section-title",3),fl(48," Setup "),bi(),br(49,"description")(50,"p"),fl(51," Add this call at the very top of your "),br(52,"code"),fl(53,"main.ts"),bi(),fl(54,", before any UI5 component import. The suffix must contain only alphanumeric characters, dashes, and underscores ("),br(55,"code"),fl(56,"/^[a-zA-Z0-9_-]+$/"),bi(),fl(57,"). "),bi(),br(58,"pre")(59,"code"),fl(60,`import { setCustomElementsScopingSuffix } from '@ui5/webcomponents-base/dist/CustomElementsScope.js';

setCustomElementsScopingSuffix('myapp');`),bi()(),br(61,"div",4)(62,"p",5)(63,"strong"),fl(64,"Order matters."),bi(),br(65,"code"),fl(66,"setCustomElementsScopingSuffix"),bi(),fl(67," must be called before any UI5 Web Components are imported or registered. If called too late, a console warning will appear and some components may not be scoped. "),bi()(),br(68,"p"),fl(69,"That's it. No other configuration is needed \u2014 UI5 handles the rest internally."),bi()(),Sr(70,"separator"),br(71,"fd-docs-section-title",6),fl(72,` Using scoped components in Angular templates
`),bi(),br(73,"description")(74,"p"),fl(75," Once scoping is active, all UI5 custom element tags get the suffix appended (e.g. "),br(76,"code"),fl(77,"<ui5-button>"),bi(),fl(78," becomes "),br(79,"code"),fl(80,"<ui5-button-myapp>"),bi(),fl(81,"). The component behavior, properties, events, and slots remain identical \u2014 only the HTML tag name changes. "),bi(),br(82,"p"),fl(83," Use the scoped tag name as the HTML element and add the original name as an attribute to activate the Angular wrapper: "),bi(),br(84,"pre")(85,"code"),fl(86,`<!-- With suffix "myapp" -->
<ui5-button-myapp ui5-button [design]="'Emphasized'">Submit</ui5-button-myapp>
<ui5-input-myapp ui5-input [placeholder]="'Search...'"></ui5-input-myapp>
<ui5-dialog-myapp ui5-dialog [headerText]="'Confirm'">...</ui5-dialog-myapp>`),bi()(),br(87,"div",4)(88,"p",5),fl(89," Both parts are required: the "),br(90,"strong"),fl(91,"scoped tag"),bi(),fl(92," ("),br(93,"code"),fl(94,"ui5-button-myapp"),bi(),fl(95,") registers the custom element, and the "),br(96,"strong"),fl(97,"attribute"),bi(),fl(98," ("),br(99,"code"),fl(100,"ui5-button"),bi(),fl(101,") activates the Angular wrapper. "),bi()()(),Sr(102,"separator"),br(103,"fd-docs-section-title",7),fl(104,` Handling Angular's unknown element warnings
`),bi(),br(105,"description")(106,"p"),fl(107," When you use scoped tag names like "),br(108,"code"),fl(109,"<ui5-button-myapp>"),bi(),fl(110,", Angular does not recognize them as known elements by default. To suppress the "),br(111,"code"),fl(112,"NG8001"),bi(),fl(113," warnings, add "),br(114,"code"),fl(115,"CUSTOM_ELEMENTS_SCHEMA"),bi(),fl(116," to your component: "),bi(),br(117,"pre")(118,"code"),fl(119,`import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
    selector: 'app-my-feature',
    template: \`<ui5-button-myapp ui5-button [design]="'Emphasized'">Submit</ui5-button-myapp>\`,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [Button]
})
export class MyFeatureComponent { }`),bi()(),br(120,"p"),fl(121,"This tells Angular to allow any unknown HTML element without throwing a compile error."),bi()(),Sr(122,"separator"),br(123,"fd-docs-section-title",8),fl(124," Advanced: Scoping rules "),bi(),br(125,"description")(126,"p"),fl(127," By default, all tags starting with "),br(128,"code"),fl(129,"ui5-"),bi(),fl(130," are scoped. You can customize which tags get scoped using "),br(131,"code"),fl(132,"setCustomElementsScopingRules"),bi(),fl(133,": "),bi(),br(134,"pre")(135,"code"),fl(136,`import {
    setCustomElementsScopingSuffix,
    setCustomElementsScopingRules
} from '@ui5/webcomponents-base/dist/CustomElementsScope.js';

// Set the suffix
setCustomElementsScopingSuffix('myapp');

// Only scope tags starting with "ui5-" but exclude "ui5-icon"
setCustomElementsScopingRules({
    include: [/^ui5-/],
    exclude: [/^ui5-icon$/]
});`),bi()(),br(137,"p")(138,"strong"),fl(139,"include"),bi(),fl(140," \u2014 array of regular expressions. A tag must match at least one to be scoped."),Sr(141,"br"),br(142,"strong"),fl(143,"exclude"),bi(),fl(144," \u2014 array of regular expressions. A tag matching any exclude rule is not scoped, even if it matches an include rule. "),bi()(),Sr(145,"separator"),br(146,"fd-docs-section-title",9),fl(147," CSS considerations "),bi(),br(148,"description")(149,"p"),fl(150,"If you have global CSS rules targeting UI5 tag names, they need to be updated to match the scoped names:"),bi(),br(151,"pre")(152,"code"),fl(153,`/* Before scoping */
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
}`),bi()(),br(154,"p"),fl(155," Using the "),br(156,"strong"),fl(157,"attribute selector"),bi(),br(158,"code"),fl(159,"[ui5-button]"),bi(),fl(160," in CSS is a good strategy because it works regardless of whether scoping is enabled and what suffix is used. "),bi()(),Sr(161,"separator"),br(162,"fd-docs-section-title",10),fl(163," Complete example "),bi(),br(164,"description")(165,"p"),fl(166,"Putting it all together for a micro-frontend called "),br(167,"code"),fl(168,"orders"),bi(),fl(169,":"),bi(),br(170,"h4"),fl(171,"main.ts"),bi(),br(172,"pre")(173,"code"),fl(174,`// main.ts \u2014 scoping FIRST, before anything else
import { setCustomElementsScopingSuffix } from '@ui5/webcomponents-base/dist/CustomElementsScope.js';
setCustomElementsScopingSuffix('orders');

(async () => {
    const { bootstrapApplication } = await import('@angular/platform-browser');
    const { appConfig } = await import('./app/app.config');
    const { App } = await import('./app/app');

    await bootstrapApplication(App, appConfig);
})().catch((err) => console.error(err));`),bi()(),br(175,"h4"),fl(176,"order-list.ts"),bi(),br(177,"pre")(178,"code"),fl(179,`import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
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
}`),bi()(),br(180,"h4"),fl(181,"order-list.html"),bi(),br(182,"pre")(183,"code"),fl(184,`<!-- All tags use the scoped name + attribute selector -->
<ui5-input-orders ui5-input
    [placeholder]="'Search orders...'"
    (ui5Input)="onSearch($event)">
</ui5-input-orders>

<ui5-table-orders ui5-table>
    <!-- table content -->
</ui5-table-orders>

<ui5-button-orders ui5-button [design]="'Emphasized'">
    New Order
</ui5-button-orders>`),bi()()(),Sr(185,"separator"),br(186,"fd-docs-section-title",11),fl(187," Troubleshooting "),bi(),br(188,"description")(189,"h4"),fl(190,'Console warning: "Setting the scoping suffix must be done before importing any components"'),bi(),br(191,"p")(192,"code"),fl(193,"setCustomElementsScopingSuffix"),bi(),fl(194," was called after a UI5 component was already imported. Move the call to the very first lines of "),br(195,"code"),fl(196,"main.ts"),bi(),fl(197,", before any other imports that might trigger component registration. "),bi(),br(198,"h4"),fl(199,"Component does not render (empty element)"),bi(),br(200,"p"),fl(201," Make sure the HTML tag uses the "),br(202,"strong"),fl(203,"scoped name"),bi(),fl(204," (e.g. "),br(205,"code"),fl(206,"<ui5-button-myapp>"),bi(),fl(207,"), not the original name ("),br(208,"code"),fl(209,"<ui5-button>"),bi(),fl(210,"). With scoping active, the original tag name is not registered in the custom element registry. "),bi(),br(211,"h4"),fl(212,"Angular input/output bindings not working"),bi(),br(213,"p"),fl(214," Verify that the "),br(215,"code"),fl(216,"ui5-button"),bi(),fl(217," (or equivalent) attribute is present on the element. The Angular wrapper needs the attribute to activate. Also check that the wrapper component is listed in the "),br(218,"code"),fl(219,"imports"),bi(),fl(220," array of your component. "),bi(),br(221,"h4"),fl(222,"NG8001: Unknown element warning"),bi(),br(223,"p"),fl(224," Add "),br(225,"code"),fl(226,"CUSTOM_ELEMENTS_SCHEMA"),bi(),fl(227," to the "),br(228,"code"),fl(229,"schemas"),bi(),fl(230," array of your component decorator. See the "),br(231,"strong"),fl(232,"Handling Angular's unknown element warnings"),bi(),fl(233," section above. "),bi()());},dependencies:[pht,Zbt,Bvt],encapsulation:2});}}return o})();var M=[{path:"",component:h,data:{primary:true},children:[{path:"",component:E}]}],A="scoping";export{A as LIBRARY_NAME,M as ROUTES};