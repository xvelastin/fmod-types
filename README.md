# FMOD JS API Typescript Definitions

This repository contains typescript definitions for the 
[FMOD JS Scripting API](https://www.fmod.com/docs/2.03/studio/scripting-api-reference.html).

These were created by hand using the information available in the official
documentation and spending many hours working out details in the FMOD console.

Some types might either be incomplete or even incorrect, but I hope these things
will surface while using them.

The plan is to eventually open a PR to add these to the
[Definitely Typed Project](https://github.com/DefinitelyTyped/DefinitelyTyped).

## Usage

Clone this repository and either copy or link the `fmod.d.ts` file into a
`types/fmod` folder in your typescript project.

In your `.ts` file declare the `studio` global object as follows.

```js
declare var studio: Fmod.Studio;
```

Enjoy type/code completion while making cool tools for FMOD!

![demo.gif](./demo.gif)

**Note:** FMOD Studio expects `ES5` javascript, make sure to setup your TS
project accordingly.

This is a very minimal `.tsconfig` that worked for me.

```json
{
    "compilerOptions": {
        "target": "ES5",
        "module": "CommonJS",
        "outDir": "dist",
        "sourceMap": false
    },
    "include": [ "src/**/*"]
}
```

## Contributing

Contributions are always welcome. Please open a PR or message me.

## Reporting Issues

If you encounter bugs/issues please report them using the issue tracker.

Please keep in mind that I'm working on these in my free time, and it might take
me a while to address them.