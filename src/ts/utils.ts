// Credit to the Geckolib Blockbench plugin for the Monkeypatch code
// https://github.com/JannisX11/blockbench-plugins/blob/master/plugins/geckolib/src/ts/utils.ts
export const Monkeypatches = new Map();

export const addMonkeypatch = (symbol: any, path: string | null, functionKey: string, newFunction: any) => {
    const pathAccessor = path ? symbol[path] : symbol;

    if (!Monkeypatches.get(symbol))
        Monkeypatches.set(symbol, { _pathAccessor: pathAccessor });

    Monkeypatches.get(symbol)[functionKey] = pathAccessor[functionKey];
    pathAccessor[functionKey] = newFunction;
};

export const removeMonkeypatches = () => {
    Monkeypatches.forEach(symbol => {
        Object.keys(symbol).forEach(functionKey => {
            if (functionKey.startsWith('_'))
                return;

            symbol._pathAccessor[functionKey] = symbol[functionKey];
        });
    });
    Monkeypatches.clear();
}
// End of Geckolib copy-pasted code

export function getEntityModelName(entityName: string) {
    return getClassNameFromEntity(entityName, "Model");
}

export function getEntityAnimationName(entityName: string) {
    return getClassNameFromEntity(entityName, "Animation");
}

export function getEntityRendererName(entityName: string) {
    return getClassNameFromEntity(entityName, "Renderer");
}

export function getEntityRenderStateName(entityName: string) {
    return getClassNameFromEntity(entityName, "RenderState");
}

function getClassNameFromEntity(entityName: string, suffix: string): string {
    // if(entityName != "") entityName = Project[ENTITY_CLASS_PROPERTY];
    return entityName + suffix;
}

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}