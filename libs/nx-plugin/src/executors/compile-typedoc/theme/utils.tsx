import {
    DeclarationHierarchy,
    DeclarationReflection,
    DefaultThemeRenderContext,
    ProjectReflection,
    JSX as React,
    JSX,
    Reflection,
    ReflectionKind,
    ReflectionCategory,
    ReferenceReflection,
    TypeParameterReflection,
    SignatureReflection,
    CommentDisplayPart
} from 'typedoc';

export function anchorIcon(context: DefaultThemeRenderContext, anchor: string | undefined) {
    if (!anchor) return <></>;

    return (
        <a href={`#${anchor}`} aria-label="Permalink" class="tsd-anchor-icon">
            {/* {context.icons.anchor()} */}
        </a>
    );
}

export function getDisplayName(refl: Reflection): string {
    let version = '';
    if ((refl instanceof DeclarationReflection || refl instanceof ProjectReflection) && refl.packageVersion) {
        version = ` - v${refl.packageVersion}`;
    }

    return `${refl.name}${version}`;
}

export function reflectionFlags(_context: DefaultThemeRenderContext, props: Reflection) {
    const allFlags = [...props.flags];
    if (props.comment) {
        for (const tag of props.comment.modifierTags) {
            if (!flagsNotRendered.includes(tag)) {
                allFlags.push(camelToTitleCase(tag.substring(1)));
            }
        }
    }

    return (
        <>
            {allFlags.map((item) => (
                <>
                    <span class={'tsd-flag ts-flag' + item}>{item}</span>{' '}
                </>
            ))}
        </>
    );
}

export function camelToTitleCase(text: string) {
    return text.substring(0, 1).toUpperCase() + text.substring(1).replace(/[a-z][A-Z]/g, (x) => `${x[0]} ${x[1]}`);
}

export function classNames(names: Record<string, boolean | null | undefined>, extraCss?: string) {
    const css = Object.keys(names)
        .filter((key) => names[key])
        .concat(extraCss || '')
        .join(' ')
        .trim()
        .replace(/\s+/g, ' ');
    return css.length ? css : undefined;
}

/**
 * Insert word break tags ``<wbr>`` into the given string.
 *
 * Breaks the given string at ``_``, ``-`` and capital letters.
 *
 * @param str The string that should be split.
 * @return The original string containing ``<wbr>`` tags where possible.
 */
export function wbr(str: string): (string | JSX.Element)[] {
    // TODO surely there is a better way to do this, but I'm tired.
    const ret: (string | JSX.Element)[] = [];
    const re = /[\s\S]*?(?:[^_-][_-](?=[^_-])|[^A-Z](?=[A-Z][^A-Z]))/g;
    let match: RegExpExecArray | null;
    let i = 0;
    while ((match = re.exec(str))) {
        ret.push(match[0], <wbr />);
        i += match[0].length;
    }
    ret.push(str.slice(i));

    return ret;
}

/**
 * Renders the reflection name with an additional `?` if optional.
 */
export function renderName(refl: Reflection) {
    if (!refl.name) {
        return <em>{wbr(ReflectionKind.singularString(refl.kind))}</em>;
    }

    if (refl.flags.isOptional) {
        return <>{wbr(refl.name)}?</>;
    }

    return wbr(refl.name);
}

export function renderCategory(
    { urlTo, getReflectionClasses }: DefaultThemeRenderContext,
    item: ReflectionCategory,
    prependName = ''
) {
    return (
        <section class="tsd-index-section">
            <h3 class="tsd-index-heading">{prependName ? `${prependName} - ${item.title}` : item.title}</h3>
            <div class="tsd-index-list">
                {item.children.map((item) => (
                    <>
                        <a
                            href={urlTo(item)}
                            class={classNames(
                                { 'tsd-index-link': true, deprecated: item.isDeprecated() },
                                getReflectionClasses(item)
                            )}
                        >
                            <span>{renderName(item)}</span>
                        </a>
                        {'\n'}
                    </>
                ))}
            </div>
        </section>
    );
}

export function hierarchyList(context: DefaultThemeRenderContext, props: DeclarationHierarchy) {
    return (
        <ul class="tsd-hierarchy">
            {props.types.map((item, i, l) => (
                <li>
                    {props.isTarget ? <span class="target">{item.toString()}</span> : context.type(item)}
                    {i === l.length - 1 && !!props.next && hierarchyList(context, props.next)}
                </li>
            ))}
        </ul>
    );
}

export function renderTypeParametersSignature(
    context: DefaultThemeRenderContext,
    typeParameters: readonly TypeParameterReflection[] | undefined
): JSX.Element {
    if (!typeParameters || typeParameters.length === 0) return <></>;
    const hideParamTypes = context.options.getValue('hideParameterTypesInTitle');

    if (hideParamTypes) {
        return (
            <>
                <span class="tsd-signature-symbol">{'<'}</span>
                {join(<span class="tsd-signature-symbol">{', '}</span>, typeParameters, (item) => (
                    <>
                        {item.flags.isConst && 'const '}
                        {item.varianceModifier ? `${item.varianceModifier} ` : ''}
                        <span class="tsd-signature-type tsd-kind-type-parameter">{item.name}</span>
                    </>
                ))}
                <span class="tsd-signature-symbol">{'>'}</span>
            </>
        );
    }

    return (
        <>
            <span class="tsd-signature-symbol">{'<'}</span>
            {join(<span class="tsd-signature-symbol">{', '}</span>, typeParameters, (item) => (
                <>
                    {item.flags.isConst && 'const '}
                    {item.varianceModifier ? `${item.varianceModifier} ` : ''}
                    <span class="tsd-signature-type tsd-kind-type-parameter">{item.name}</span>
                    {!!item.type && (
                        <>
                            <span class="tsd-signature-symbol"> extends </span>
                            {context.type(item.type)}
                        </>
                    )}
                </>
            ))}
            <span class="tsd-signature-symbol">{'>'}</span>
        </>
    );
}

export function hasTypeParameters(
    reflection: Reflection
): reflection is Reflection & { typeParameters: TypeParameterReflection[] } {
    return (
        (reflection instanceof DeclarationReflection || reflection instanceof SignatureReflection) &&
        reflection.typeParameters != null &&
        reflection.typeParameters.length > 0
    );
}

export function stringify(data: unknown) {
    if (typeof data === 'bigint') {
        return data.toString() + 'n';
    }
    return JSON.stringify(data);
}

export function join<T>(joiner: JSX.Children, list: readonly T[], cb: (x: T) => JSX.Children) {
    const result: JSX.Children = [];

    for (const item of list) {
        if (result.length > 0) {
            result.push(joiner);
        }
        result.push(cb(item));
    }

    return <>{result}</>;
}

export function getKindClass(refl: Reflection): string {
    if (refl instanceof ReferenceReflection) {
        return getKindClass(refl.getTargetReflectionDeep());
    }
    return ReflectionKind.classString(refl.kind);
}

export function fixedMarkdown(markdown: DefaultThemeRenderContext['markdown'], content: CommentDisplayPart[]): string {
    return markdown(content).split('<button>Copy</button>').join('');
}

const flagsNotRendered: string[] = ['@showCategories', '@showGroups', '@hideCategories', '@hideGroups', '@hidden'];
