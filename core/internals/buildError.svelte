<script>
  import { onMount } from "svelte";
  import "https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/prism.min.js";
  import "https://cdn.jsdelivr.net/npm/prismjs@1.23.0/plugins/normalize-whitespace/prism-normalize-whitespace.min.js";

  export let type = "";
  export let message = "";
  export let file = "";
  export let filepath = "";
  export let code = "";
  export let errorName = "";
  export let start = { line: 0, column: 0 };

  let codeElement;

  function update(text) {
    Prism.plugins.NormalizeWhitespace.setDefaults({
      "remove-trailing": true,
      "remove-indent": true,
      "left-trim": true,
      "right-trim": true,
    });

    // // Update code
    codeElement.innerHTML = text;
    Prism.highlightElement(codeElement);
  }

  onMount(() => {
    update(code);
  });
</script>

<main>
  <h1>{errorName}</h1>
  <hr />
  <div>
    <span>
      /{file.split("/").pop()}: {message} ( {start?.line}:{start?.column} )
    </span>
  </div>
  <br />
  <div>
    <pre>
      <code class="language-js" id="highlighting-content" bind:this={codeElement}></code>
    </pre>
  </div>

  <span style="">
    View in vscode:
    <a
      href="vscode://file/{filepath}"
      style="color: #e32945; font-size: 18px; font-weight: bold; margin-top: 80px;"
    >
      {file}
    </a>
  </span>
  <hr />

  <h4>
    This screen is visible only in development. It will not appear if the app
    crashes in production. Open your browser’s developer console to further
    inspect this error.
  </h4>
</main>

<svelte:head>
  <title>
    Snel {type}
  </title>

  <style>
    p code {
      border-radius: 2px;
      background-color: #eee;
      color: #111;
    }
    #editing,
    #highlighting {
      margin: 10px;
      padding: 10px;
      border: 0;
      width: calc(100% - 32px);
      height: 150px;
    }
    #editing,
    #highlighting,
    #highlighting * {
      font-size: 15pt;
      font-family: monospace;
      line-height: 20pt;
    }
    #editing,
    #highlighting {
      position: absolute;
      top: 0;
      left: 0;
    }
    #editing {
      z-index: 1;
    }
    #highlighting {
      z-index: 0;
    }
    #editing {
      color: transparent;
      background: transparent;
      caret-color: white;
    }
    #editing,
    #highlighting {
      overflow: auto;
    }
    #editing {
      resize: none;
    }
    code[class*="language-"],
    pre[class*="language-"] {
      font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
      font-size: 1em;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      word-wrap: normal;
      line-height: 1.5;
      -moz-tab-size: 4;
      -o-tab-size: 4;
      tab-size: 4;
      -webkit-hyphens: none;
      -moz-hyphens: none;
      -ms-hyphens: none;
      hyphens: none;
    }
    pre[class*="language-"] {
      padding: 0.4em 0.8em;
      margin: 0.5em 0;
      overflow: auto;
      background: #242829;
      border-radius: 5px;
    }
    code[class*="language-"] {
      background: #242829;
      color: white;
    }
    :not(pre) > code[class*="language-"] {
      padding: 0.2em;
      border-radius: 0.3em;
      box-shadow: none;
      white-space: normal;
    }
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #aaa;
    }
    .token.punctuation {
      color: #999;
    }
    .token.namespace {
      opacity: 0.7;
    }
    .token.property,
    .token.tag,
    .token.boolean,
    .token.number,
    .token.constant,
    .token.symbol {
      color: #0cf;
    }
    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin {
      color: yellow;
    }
    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .token.variable,
    .token.inserted {
      color: yellowgreen;
    }
    .token.atrule,
    .token.attr-value,
    .token.keyword {
      color: deeppink;
    }
    .token.regex,
    .token.important {
      color: orange;
    }
    .token.important,
    .token.bold {
      font-weight: bold;
    }
    .token.italic {
      font-style: italic;
    }
    .token.entity {
      cursor: help;
    }
    .token.deleted {
      color: red;
    }
    pre.diff-highlight.diff-highlight > code .token.deleted:not(.prefix),
    pre > code.diff-highlight.diff-highlight .token.deleted:not(.prefix) {
      background-color: rgba(255, 0, 0, 0.3);
      display: inline;
    }
    pre.diff-highlight.diff-highlight > code .token.inserted:not(.prefix),
    pre > code.diff-highlight.diff-highlight .token.inserted:not(.prefix) {
      background-color: rgba(0, 255, 128, 0.3);
      display: inline;
    }
  </style>
</svelte:head>

<style>
  * {
    margin: 0px 0px 0px 0px;
    padding: 0;
    color: #ffff;
  }

  :global(body) {
    background-color: #181b1c;
    width: 100vw;
    height: 100vh;
    margin: auto;
  }

  h1 {
    color: #e32945;
    margin-bottom: 10px;
  }

  span {
    color: #ffff;
  }

  h4 {
    color: #4c555c;
    margin-top: 10px;
  }
</style>
