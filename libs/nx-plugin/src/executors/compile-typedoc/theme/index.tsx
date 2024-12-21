import {
    ContainerReflection,
    DeclarationHierarchy,
    DeclarationReflection,
    DefaultThemeRenderContext,
    DocumentReflection,
    JSX,
    PageEvent,
    Reflection,
    RenderTemplate,
    SignatureReflection,
    SomeType
} from 'typedoc';
import { index } from './partials';
import { comment } from './partials/comment';
import { commentSummary } from './partials/comment.summary';
import { commentTags } from './partials/comment.tags';
import { defaultLayout } from './partials/default.layout';
import { hierarchy } from './partials/hierarchy';
import { member } from './partials/member';
import { memberDeclaration } from './partials/member.declaration';
import { memberGetterSetter } from './partials/member.getter-setter';
import { memberSignatures } from './partials/member.signatures';
import { memberSources } from './partials/member.sources';
import { reflectionTemplate } from './partials/reflection';
import { type } from './partials/type';

export class FdThemeContext extends DefaultThemeRenderContext {
    override footer = () => <></>;
    override header = () => <></>;
    override sidebar = () => <></>;
    override pageSidebar = () => <></>;
    override toolbar = () => <></>;
    override member = (props: DeclarationReflection | DocumentReflection) => {
        if (props instanceof DeclarationReflection || props instanceof SignatureReflection) {
            return member(this, props);
        }
        // Handle DocumentReflection accordingly, if needed
        return <>{JSON.stringify(props)}</>; // Example placeholder for handling DocumentReflection
    };
    override memberSignatures = (props: DeclarationReflection) => memberSignatures(this, props);
    comment = (props: Reflection) => comment(props);
    override commentTags = (props: Reflection) => commentTags(this, props);
    override commentSummary = (props: Reflection) => commentSummary(this, props);
    override index = (props: ContainerReflection) => index(this, props);
    override defaultLayout = (template: RenderTemplate<PageEvent<Reflection>>, props: PageEvent<Reflection>) =>
        defaultLayout(template, props);

    override hierarchy = (props: DeclarationHierarchy | undefined) => hierarchy(this, props);

    override memberSources = (props: DeclarationReflection | SignatureReflection) => memberSources(this, props);
    override memberDeclaration = (props: DeclarationReflection) => memberDeclaration(this, props);

    override memberGetterSetter = (props: DeclarationReflection) => memberGetterSetter(this, props);

    override type = (tp: SomeType | undefined) => type(this, tp);

    override reflectionTemplate = (props: PageEvent<ContainerReflection>) => reflectionTemplate(this, props);
}
