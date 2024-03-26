import {
    ContainerReflection,
    DeclarationReflection,
    DefaultThemeRenderContext,
    JSX,
    PageEvent,
    ReflectionKind,
    ReflectionType
} from 'typedoc';
import { classNames, fixedMarkdown, hasTypeParameters } from '../utils';

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
                    {!!props.model.indexSignature && (
                        <section class={classNames({ 'tsd-panel': true }, context.getReflectionClasses(props.model))}>
                            <h4 class="tsd-before-signature">Indexable</h4>
                            <div class="tsd-signature">
                                <span class="tsd-signature-symbol">[</span>
                                {props.model.indexSignature.parameters!.map((item) => (
                                    <>
                                        {item.name}: {context.type(item.type)}
                                    </>
                                ))}
                                <span class="tsd-signature-symbol">]: </span>
                                {context.type(props.model.indexSignature.type)}
                            </div>
                            {context.commentSummary(props.model.indexSignature)}
                            {context.commentTags(props.model.indexSignature)}
                            {props.model.indexSignature?.type instanceof ReflectionType &&
                                context.parameter(props.model.indexSignature.type.declaration)}
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
