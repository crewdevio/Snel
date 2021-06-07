import type { Token } from "https://deno.land/x/css@0.2.0/mod.ts";
import { lex } from "https://deno.land/x/css@0.2.0/mod.ts";
import { join, toFileUrl } from "../../imports/path.ts";
import { compile } from "../../imports/scss.ts";
import { colors } from "../../imports/fmt.ts";
import { exists } from "../../imports/fs.ts";
import { less } from "../../imports/less.ts";

const file = "./jose.css";

const source = await Deno.readTextFile(file);

type Remotes = {
  url: string;
  start?: { line: number; col: number };
  end?: { line: number; col: number };
};

const validFile = (url: string) =>
  url.endsWith(".css") || url.endsWith(".scss") || url.endsWith(".less");

const isRemote = (url: string) =>
  url.startsWith("https://") || url.startsWith("http://");

const printError = (options: any) => {
  let { prefix, message, token, code, line, filepath, init } = options;

  console.log(
    `${colors.bold(colors.red(prefix))}: ${colors.yellow(message)}\n`
  );

  const count = token.start?.line!;
  const sniped = code[line].replace("@import", colors.green("@import"));

  if (count > 1) console.log(`${colors.yellow((count - 1).toString())} |`);
  const errorLine = `${colors.yellow(count.toString())} | ${colors.cyan(
    sniped
  )}`;

  console.log(errorLine);
  console.log(`    ${colors.red("~").repeat(sniped.length * 0.7)}`);
  console.log(`${colors.yellow((count + 1).toString())} |`);

  filepath = !isRemote(filepath) ? join(Deno.cwd(), filepath) : filepath;

  console.log(
    `    at ${colors.bold(init)} (${colors.cyan(toFileUrl(filepath).href)})`
  );

  Deno.exit(1);
};

const splitCode = (source: string) => source.split("\n");

function parseImports(source: string) {
  const imports: Set<Token> = new Set<Token>([]);

  for (const token of lex(source)) {
    if (token.type === "import") {
      imports.add(token);
    }
  }

  const remotes: Remotes[] = [];
  const locals: Token[] = [];

  for (const token of [...imports]) {
    const isRemote = /(?:url\()?\s?["\'](.*?)["\']\s?\)/gim;
    const value = isRemote.exec(token.value!);

    if (Array.isArray(value) && value.length >= 2) {
      remotes.push({ url: value[1], start: token.start, end: token.end });
    }

    if (value === null) {
      locals.push(token);
    }
  }

  return {
    remotes,
    locals,
  };
}

async function remote(remotes: Remotes[], code: string[], filepath: string) {
  for (let index = 0; index < remotes.length; index++) {
    const token = remotes[index];
    const line = token.start?.line! - 1;

    if (!validFile(token.url)) {
      printError({
        message: "only .css, .sass or .less files are allowed",
        prefix: "Not valid file",
        init: "resolveRemotes",
        token,
        code,
        line,
        filepath,
      });
    }

    try {
      const response = await fetch(token.url);

      if (!response.ok) {
        printError({
          message: `${response.statusText}. code ${response.status}`,
          prefix: "Failed to fetch",
          init: "resolveRemotes",
          token,
          code,
          line,
          filepath,
        });
      }

      const cssCode = await response.text();

      code[line] = await resolveCss(cssCode, token.url);
    } catch (error: any) {
      printError({
        message: error.message,
        prefix: "Failed to fetch",
        init: "resolveRemotes",
        token,
        code,
        line,
        filepath,
      });
    }
  }
}

async function local(locals: Token[], code: string[], filepath: string) {
  for (let index = 0; index < locals.length; index++) {
    const token = locals[index];
    const line = token.start?.line! - 1;

    const quotePattern = /(["'])(?:\\\1|[^\1]+)*\1/gim;

    let path =
      quotePattern
        .exec(code[line])?.[0]
        .replaceAll("'", "")
        .replaceAll('"', "") ?? null;

    if (path) {
      if (!validFile(path)) {
        printError({
          message: "only .css, .sass or .less files are allowed",
          prefix: "Not valid file",
          init: "resolveLocal",
          token,
          code,
          line,
          filepath,
        });
      }

      if (!(await exists(path))) {
        printError({
          message: `can't load ${path}`,
          prefix: "Not found file",
          init: "resolveLocal",
          token,
          code,
          line,
          filepath,
        });
      }

      try {
        code[line] = await resolveCss(await Deno.readTextFile(path), path);
      } catch (error: any) {
        printError({
          message: `${error?.message}`,
          prefix: "Error local file",
          init: "resolveLocal",
          token,
          code,
          line,
          filepath,
        });
      }
    }
  }
}

async function resolveCss(source: string, filepath: string): Promise<any> {
  if (filepath.endsWith(".less")) {
    const code = splitCode(source!);

    let css = code
      .filter((chunk) => {
        const cssImportPattern =
          /(?:@import)\s(?:url\()?\s?["\'](.*?)["\']\s?\)?(?:[^;]*);?/gim;

        return cssImportPattern.exec(chunk) === null;
      })
      .join("\n");

    const imports = code
      .filter((chunk) => {
        const cssImportPattern =
          /(?:@import)\s(?:url\()?\s?["\'](.*?)["\']\s?\)?(?:[^;]*);?/gim;

        return cssImportPattern.exec(chunk) !== null;
      })
      .join("\n");

    css = (await less.render(css)).css;

    const { remotes, locals } = parseImports(`${imports}\n${css}`);

    await local(locals, code, filepath);
    await remote(remotes, code, filepath);

    if (remotes.length === 0 && locals.length === 0) {
      return css;
    }

    return await resolveCss(code.join("\n"), filepath);
  }

  if (filepath.endsWith(".scss")) {
    const code = splitCode(source!);

    let css = code
      .filter((chunk) => {
        const cssImportPattern =
          /(?:@import)\s(?:url\()?\s?["\'](.*?)["\']\s?\)?(?:[^;]*);?/gim;

        return cssImportPattern.exec(chunk) === null;
      })
      .join("\n");

    const imports = code
      .filter((chunk) => {
        const cssImportPattern =
          /(?:@import)\s(?:url\()?\s?["\'](.*?)["\']\s?\)?(?:[^;]*);?/gim;

        return cssImportPattern.exec(chunk) !== null;
      })
      .join("\n");

    css = compile(css);

    const { remotes, locals } = parseImports(`${imports}\n${css}`);

    await local(locals, code, filepath);
    await remote(remotes, code, filepath);

    return compile(code.join("\n"));
  }

  if (filepath.endsWith(".css")) {
    const { remotes, locals } = parseImports(source!);
    const code = splitCode(source!);

    await local(locals, code, filepath);
    await remote(remotes, code, filepath);

    return code.join("\n");
  }
  // }
}

console.log(`${await resolveCss(source, file)}`);
