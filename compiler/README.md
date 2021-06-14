# @snel/compiler

> Lower level utilities for compiling svelte components to javascript.

### compiler

This is where the magic happens. svelte.compile takes your component source code, and turns it into a JavaScript module that exports a class.

```typescript
import { compile } from "./compiler.ts";

const source = `
<script>
	let message = "svelte is awesome!!!";
</script>

<p>{message}</p>
`;

const { js, css, ast, warnings, vars, stats } = compile(source, {
  /* options */
});
```

### [parse](https://svelte.dev/docs#svelte_parse)

The parse function parses a component, returning only its abstract syntax tree. Unlike compiling with the generate: false option, this will not perform any validation or other analysis of the component beyond parsing it.

```typescript
import { parse } from "./compiler.ts";

const ast = parse(source, { filename: "App.svelte" });
```

> more information about the compiler api [here](https://svelte.dev/docs#Compile_time)
