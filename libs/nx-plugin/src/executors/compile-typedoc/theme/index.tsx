import {
    DeclarationReflection,
    DefaultThemeRenderContext,
    JSX as React,
    JSX,
    Reflection,
    ContainerReflection,
    RenderTemplate,
    PageEvent,
    SignatureReflection,
    DeclarationHierarchy,
    Type
} from 'typedoc';
import { member } from './partials/member';
import { memberSignatures } from './partials/member.signatures';
import { comment } from './partials/comment';
import { index } from './partials';
import { defaultLayout } from './partials/default.layout';
import { memberGetterSetter } from './partials/member.getter-setter';
import { memberSources } from './partials/member.sources';
import { commentSummary } from './partials/comment.summary';
import { hierarchy } from './partials/hierarchy';
import { type } from './partials/type';
import { memberDeclaration } from './partials/member.declaration';
import { reflectionTemplate } from './partials/reflection';
import { commentTags } from './partials/comment.tags';

export class FdThemeContext extends DefaultThemeRenderContext {
    override analytics = () => <></>;
    override footer = () => <></>;
    override header = () => <></>;
    override sidebar = () => <></>;
    override pageSidebar = () => <></>;
    override toolbar = () => <></>;
    override member = (props: DeclarationReflection) => member(this, props);
    override memberSignatures = (props: DeclarationReflection) => memberSignatures(this, props);
    override comment = (props: Reflection) => comment(props);
    override commentTags = (props: Reflection) => commentTags(this, props);
    override commentSummary = (props: Reflection) => commentSummary(this, props);
    override index = (props: ContainerReflection) => index(this, props);
    override defaultLayout = (template: RenderTemplate<PageEvent<Reflection>>, props: PageEvent<Reflection>) =>
        defaultLayout(template, props);

    override hierarchy = (props: DeclarationHierarchy | undefined) => hierarchy(this, props);

    override memberSources = (props: DeclarationReflection | SignatureReflection) => memberSources(this, props);
    override memberDeclaration = (props: DeclarationReflection) => memberDeclaration(this, props);

    override memberGetterSetter = (props: DeclarationReflection) => memberGetterSetter(this, props);

    override type = (tp: Type | undefined) => type(this, tp);

    override reflectionTemplate = (props: PageEvent<ContainerReflection>) => reflectionTemplate(this, props);
}
