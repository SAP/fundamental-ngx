import {
    ContainerReflection,
    DeclarationReflection,
    DefaultThemeRenderContext,
    JSX,
    PageEvent,
    ReflectionKind,
    SignatureReflection
} from 'typedoc';
import { classNames, fixedMarkdown, getKindClass, hasTypeParameters } from '../utils';

export function reflectionTemplate(context: DefaultThemeRenderContext, props: PageEvent<ContainerReflection>) {
    if (
        [ReflectionKind.TypeAlias, ReflectionKind.Variable].includes(props.model.kind) &&
        props.model instanceof DeclarationReflection
    ) {
        return context.memberDeclaration(props.model);
    }

    return (
        <>
            {props.model.hasComment() && (
                <section class="tsd-panel tsd-comment">
                    {context.commentSummary(props.model)}
                    {context.commentTags(props.model)}
                </section>
            )}

            {props.model instanceof DeclarationReflection &&
                props.model.kind === ReflectionKind.Module &&
                props.model.readme?.length && (
                    <section class="tsd-panel tsd-typography">
                        <JSX.Raw html={fixedMarkdown(context.markdown, props.model.readme)} />
                    </section>
                )}

            {hasTypeParameters(props.model) && <> {context.typeParameters(props.model.typeParameters)} </>}
            {props.model instanceof DeclarationReflection && (
                <>
                    {context.hierarchy(props.model.typeHierarchy)}

                    {!!props.model.implementedTypes && (
                        <section class="tsd-panel">
                            <h4>Implements</h4>
                            <ul class="tsd-hierarchy">
                                {props.model.implementedTypes.map((item) => (
                                    <li>{context.type(item)}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                    {!!props.model.implementedBy && (
                        <section class="tsd-panel">
                            <h4>Implemented by</h4>
                            <ul class="tsd-hierarchy">
                                {props.model.implementedBy.map((item) => (
                                    <li>{context.type(item)}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                    {!!props.model.signatures && (
                        <section class="tsd-panel">{context.memberSignatures(props.model)}</section>
                    )}
                    {!!props.model.indexSignatures?.length && (
                        <section class={classNames({ 'tsd-panel': true }, context.getReflectionClasses(props.model))}>
                            <h4 class="tsd-before-signature">{context.i18n.theme_indexable()}</h4>
                            <ul class="tsd-signatures">
                                {props.model.indexSignatures.map((index) => renderIndexSignature(context, index))}
                            </ul>
                        </section>
                    )}
                    {/* {!props.model.signatures && context.memberSources(props.model)} */}
                </>
            )}
            {!!props.model.children?.length && context.index(props.model)}
            {context.members(props.model)}
        </>
    );
}

function renderIndexSignature(context: DefaultThemeRenderContext, index: SignatureReflection) {
    return (
        <li class="tsd-index-signature">
            <div class="tsd-signature">
                {index.flags.isReadonly && <span class="tsd-signature-keyword">readonly </span>}
                <span class="tsd-signature-symbol">[</span>
                {index.parameters!.map((item) => (
                    <>
                        <span class={getKindClass(item)}>{item.name}</span>: {context.type(item.type)}
                    </>
                ))}
                <span class="tsd-signature-symbol">]: </span>
                {context.type(index.type)}
            </div>
            {context.commentSummary(index)}
            {context.commentTags(index)}
            {context.typeDetailsIfUseful(index.type)}
        </li>
    );
}
