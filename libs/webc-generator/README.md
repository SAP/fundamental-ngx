# webc-generator

Code generator that produces Angular wrappers from UI5 Web Components. The output lives in `libs/ui5-webcomponents*` — those directories are auto-generated and should not be edited by hand.

## Building

```bash
nx build webc-generator
```

## Running unit tests

```bash
nx test webc-generator
```

## Regenerating wrappers

After modifying the generator, rebuild and run it to regenerate the UI5 wrapper libraries:

```bash
nx build webc-generator && nx run webc-generator:generate
```
