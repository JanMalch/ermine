import { isDevMode } from '@angular/core';

declare const Prism: any;

export interface PrismLanguage {
  name?: string;
  id?: string;
  fileEndings?: string[];
}

export const prismLanguages: PrismLanguage[] = [
  {
    name: 'Plain Text',
    id: undefined,
    fileEndings: []
  },
  {
    name: 'Markup',
    id: 'markup',
    fileEndings: []
  },
  {
    name: 'XML',
    id: 'xml',
    fileEndings: ['xml', 'csproj', 'xhtml', 'config', 'manifest', 'iml']
  },
  {
    name: 'HTML',
    id: 'html',
    fileEndings: ['html']
  },
  {
    name: 'Mathml',
    id: 'mathml',
    fileEndings: []
  },
  {
    name: 'SVG',
    id: 'svg',
    fileEndings: ['svg']
  },
  {
    name: 'CSS',
    id: 'css',
    fileEndings: ['css']
  },
  {
    name: 'C-Like',
    id: 'clike',
    fileEndings: ['bazel']
  },
  {
    name: 'JavaScript',
    id: 'javascript',
    fileEndings: ['js']
  },
  /*  {
      "name": "Js",
      "id": "js",
      "fileEndings": []
    },*/
  {
    name: 'ABAP',
    id: 'abap',
    fileEndings: ['abap']
  },
  {
    name: 'ActionScript',
    id: 'actionscript',
    fileEndings: ['as']
  },
  {
    name: 'Ada',
    id: 'ada',
    fileEndings: ['adb', 'ads']
  },
  {
    name: 'Apache Config',
    id: 'apacheconf',
    fileEndings: ['conf']
  },
  {
    name: 'APL',
    id: 'apl',
    fileEndings: ['apl']
  },
  {
    name: 'AppleScript',
    id: 'applescript',
    fileEndings: ['applescript', 'scpt', 'scptd']
  },
  {
    name: 'C',
    id: 'c',
    fileEndings: ['c', 'h']
  },
  {
    name: 'ARFF',
    id: 'arff',
    fileEndings: ['arff']
  },
  {
    name: 'AsciiDoc',
    id: 'asciidoc',
    fileEndings: ['asciidoc', 'adoc', 'asc']
  },
  {
    name: 'Asm6502',
    id: 'asm6502',
    fileEndings: ['asm']
  },
  {
    name: 'C#',
    id: 'csharp',
    fileEndings: ['cs']
  },
  {
    name: 'dotNET',
    id: 'dotnet',
    fileEndings: []
  },
  {
    name: 'AutoHotkey',
    id: 'autohotkey',
    fileEndings: ['ahk']
  },
  {
    name: 'AutoIt',
    id: 'autoit',
    fileEndings: []
  },
  {
    name: 'Bash',
    id: 'bash',
    fileEndings: ['sh']
  },
  {
    name: 'Shell',
    id: 'shell',
    fileEndings: ['sh']
  },
  {
    name: 'BASIC',
    id: 'basic',
    fileEndings: ['b']
  },
  {
    name: 'Batch',
    id: 'batch',
    fileEndings: ['bat']
  },
  {
    name: 'Bison',
    id: 'bison',
    fileEndings: []
  },
  {
    name: 'Brainfuck',
    id: 'brainfuck',
    fileEndings: ['bf']
  },
  {
    name: 'Bro',
    id: 'bro',
    fileEndings: ['bro']
  },
  {
    name: 'C++',
    id: 'cpp',
    fileEndings: ['cpp']
  },
  {
    name: 'CSV - Preview',
    id: 'csv-preview',
    fileEndings: ['csv']
  },
  {
    name: 'ASP.NET',
    id: 'aspnet',
    fileEndings: ['aspx', 'axd', 'asx', 'asmx', 'ashx']
  },
  {
    name: 'Arduino',
    id: 'arduino',
    fileEndings: ['ino']
  },
  {
    name: 'CoffeeScript',
    id: 'coffeescript',
    fileEndings: ['coffee']
  },
  {
    name: 'Clojure',
    id: 'clojure',
    fileEndings: ['clj']
  },
  {
    name: 'Ruby',
    id: 'ruby',
    fileEndings: ['rb']
  },
  {
    name: 'Csp',
    id: 'csp',
    fileEndings: []
  },
  {
    name: 'D',
    id: 'd',
    fileEndings: ['d']
  },
  {
    name: 'Dart',
    id: 'dart',
    fileEndings: ['dart']
  },
  {
    name: 'Diff',
    id: 'diff',
    fileEndings: []
  },
  {
    name: 'Django',
    id: 'django',
    fileEndings: []
  },
  {
    name: 'Jinja2',
    id: 'jinja2',
    fileEndings: []
  },
  {
    name: 'Docker',
    id: 'docker',
    fileEndings: ['dockerignore']
  },
  {
    name: 'Dockerfile',
    id: 'dockerfile',
    fileEndings: ['Dockerfile']
  },
  {
    name: 'Eiffel',
    id: 'eiffel',
    fileEndings: ['e']
  },
  {
    name: 'Elixir',
    id: 'elixir',
    fileEndings: ['exs']
  },
  {
    name: 'Elm',
    id: 'elm',
    fileEndings: ['elm']
  },
  {
    name: 'Markup-templating',
    id: 'markup-templating',
    fileEndings: []
  },
  {
    name: 'Erlang',
    id: 'erlang',
    fileEndings: ['erl']
  },
  {
    name: 'F#',
    id: 'fsharp',
    fileEndings: ['fs']
  },
  {
    name: 'Flow',
    id: 'flow',
    fileEndings: []
  },
  {
    name: 'Fortran',
    id: 'fortran',
    fileEndings: ['f90']
  },
  {
    name: 'GEDCOM',
    id: 'gedcom',
    fileEndings: ['ged']
  },
  {
    name: 'Gherkin',
    id: 'gherkin',
    fileEndings: []
  },
  {
    name: 'Git',
    id: 'git',
    fileEndings: ['gitignore', 'gitkeep']
  },
  {
    name: 'GLSL',
    id: 'glsl',
    fileEndings: ['glsl']
  },
  {
    name: 'Go',
    id: 'go',
    fileEndings: ['go']
  },
  {
    name: 'GraphQL',
    id: 'graphql',
    fileEndings: ['graphql']
  },
  {
    name: 'Groovy',
    id: 'groovy',
    fileEndings: ['groovy']
  },
  {
    name: 'Less',
    id: 'less',
    fileEndings: ['less']
  },
  {
    name: 'Handlebars',
    id: 'handlebars',
    fileEndings: []
  },
  {
    name: 'Haskell',
    id: 'haskell',
    fileEndings: ['hs']
  },
  {
    name: 'Haxe',
    id: 'haxe',
    fileEndings: ['hx', 'hxml']
  },
  {
    name: 'HTTP',
    id: 'http',
    fileEndings: ['http']
  },
  {
    name: 'HPKP',
    id: 'hpkp',
    fileEndings: []
  },
  {
    name: 'HSTS',
    id: 'hsts',
    fileEndings: []
  },
  {
    name: 'Ichigojam',
    id: 'ichigojam',
    fileEndings: []
  },
  {
    name: 'Icon',
    id: 'icon',
    fileEndings: []
  },
  {
    name: 'Inform7',
    id: 'inform7',
    fileEndings: []
  },
  {
    name: 'ini',
    id: 'ini',
    fileEndings: ['ini']
  },
  {
    name: 'Io',
    id: 'io',
    fileEndings: []
  },
  {
    name: 'J',
    id: 'j',
    fileEndings: []
  },
  {
    name: 'Java',
    id: 'java',
    fileEndings: ['java']
  },
  {
    name: 'Jolie',
    id: 'jolie',
    fileEndings: []
  },
  {
    name: 'JSON',
    id: 'json',
    fileEndings: ['json', 'babelrc', 'eslintrc', 'firebaserc']
  },
  {
    name: 'JSONP',
    id: 'jsonp',
    fileEndings: ['jsonp']
  },
  {
    name: 'Julia',
    id: 'julia',
    fileEndings: ['jl']
  },
  {
    name: 'Keyman',
    id: 'keyman',
    fileEndings: []
  },
  {
    name: 'Kotlin',
    id: 'kotlin',
    fileEndings: ['kt', 'ktm', 'kts']
  },
  {
    name: 'LaTeX',
    id: 'latex',
    fileEndings: ['tex']
  },
  {
    name: 'Markdown - Preview',
    id: 'markdown-preview',
    fileEndings: ['md']
  },
  {
    name: 'Markdown',
    id: 'markdown',
    fileEndings: ['md']
  },
  {
    name: 'Liquid',
    id: 'liquid',
    fileEndings: []
  },
  {
    name: 'Lisp',
    id: 'lisp',
    fileEndings: ['lisp']
  },
  {
    name: 'Elisp',
    id: 'elisp',
    fileEndings: ['el']
  },
  {
    name: 'Emacs',
    id: 'emacs',
    fileEndings: []
  },
  {
    name: 'Emacs Lisp',
    id: 'emacs-lisp',
    fileEndings: []
  },
  {
    name: 'Livescript',
    id: 'livescript',
    fileEndings: []
  },
  {
    name: 'Lolcode',
    id: 'lolcode',
    fileEndings: ['lol']
  },
  {
    name: 'Lua',
    id: 'lua',
    fileEndings: ['lua']
  },
  {
    name: 'Makefile',
    id: 'makefile',
    fileEndings: []
  },
  {
    name: 'Crystal',
    id: 'crystal',
    fileEndings: []
  },
  {
    name: 'Erb',
    id: 'erb',
    fileEndings: []
  },
  {
    name: 'MatLab',
    id: 'matlab',
    fileEndings: ['m']
  },
  {
    name: 'Mel',
    id: 'mel',
    fileEndings: []
  },
  {
    name: 'Mizar',
    id: 'mizar',
    fileEndings: []
  },
  {
    name: 'Monkey',
    id: 'monkey',
    fileEndings: []
  },
  {
    name: 'N4js',
    id: 'n4js',
    fileEndings: []
  },
  {
    name: 'N4jsd',
    id: 'n4jsd',
    fileEndings: []
  },
  {
    name: 'Nasm',
    id: 'nasm',
    fileEndings: []
  },
  {
    name: 'NGINX',
    id: 'nginx',
    fileEndings: []
  },
  {
    name: 'Nim',
    id: 'nim',
    fileEndings: []
  },
  {
    name: 'Nix',
    id: 'nix',
    fileEndings: []
  },
  {
    name: 'Nsis',
    id: 'nsis',
    fileEndings: []
  },
  {
    name: 'Objective-C',
    id: 'objectivec',
    fileEndings: []
  },
  {
    name: 'Ocaml',
    id: 'ocaml',
    fileEndings: []
  },
  {
    name: 'Opencl',
    id: 'opencl',
    fileEndings: []
  },
  {
    name: 'Oz',
    id: 'oz',
    fileEndings: []
  },
  {
    name: 'Parigp',
    id: 'parigp',
    fileEndings: []
  },
  {
    name: 'Parser',
    id: 'parser',
    fileEndings: []
  },
  {
    name: 'Pascal',
    id: 'pascal',
    fileEndings: ['p']
  },
  {
    name: 'ObjectPascal',
    id: 'objectpascal',
    fileEndings: []
  },
  {
    name: 'Perl',
    id: 'perl',
    fileEndings: ['pl']
  },
  {
    name: 'PHP',
    id: 'php',
    fileEndings: ['php']
  },
  {
    name: 'SQL',
    id: 'sql',
    fileEndings: ['sql']
  },
  {
    name: 'Powershell',
    id: 'powershell',
    fileEndings: ['ps1', 'psm1']
  },
  {
    name: 'Processing',
    id: 'processing',
    fileEndings: []
  },
  {
    name: 'Prolog',
    id: 'prolog',
    fileEndings: ['pl']
  },
  {
    name: 'Properties',
    id: 'properties',
    fileEndings: ['properties']
  },
  {
    name: 'Protobuf',
    id: 'protobuf',
    fileEndings: []
  },
  {
    name: 'SCSS',
    id: 'scss',
    fileEndings: ['scss']
  },
  {
    name: 'Puppet',
    id: 'puppet',
    fileEndings: []
  },
  {
    name: 'Pure',
    id: 'pure',
    fileEndings: []
  },
  {
    name: 'Python',
    id: 'python',
    fileEndings: ['py']
  },
  {
    name: 'Q',
    id: 'q',
    fileEndings: []
  },
  {
    name: 'Qore',
    id: 'qore',
    fileEndings: []
  },
  {
    name: 'R',
    id: 'r',
    fileEndings: ['r']
  },
  {
    name: 'JSX',
    id: 'jsx',
    fileEndings: ['jsx']
  },
  {
    name: 'TypeScript',
    id: 'typescript',
    fileEndings: ['ts']
  },
  /*  {
      "name": "Ts",
      "id": "ts",
      "fileEndings": []
    },*/
  {
    name: 'Renpy',
    id: 'renpy',
    fileEndings: []
  },
  {
    name: 'Reason',
    id: 'reason',
    fileEndings: []
  },
  {
    name: 'Rest',
    id: 'rest',
    fileEndings: []
  },
  {
    name: 'Rip',
    id: 'rip',
    fileEndings: []
  },
  {
    name: 'Roboconf',
    id: 'roboconf',
    fileEndings: []
  },
  {
    name: 'Textile',
    id: 'textile',
    fileEndings: []
  },
  {
    name: 'Rust',
    id: 'rust',
    fileEndings: ['rs']
  },
  {
    name: 'SAS',
    id: 'sas',
    fileEndings: []
  },
  {
    name: 'Sass',
    id: 'sass',
    fileEndings: ['sass']
  },
  {
    name: 'Stylus',
    id: 'stylus',
    fileEndings: []
  },
  {
    name: 'Scala',
    id: 'scala',
    fileEndings: ['scala']
  },
  {
    name: 'Scheme',
    id: 'scheme',
    fileEndings: []
  },
  {
    name: 'Smalltalk',
    id: 'smalltalk',
    fileEndings: ['st']
  },
  {
    name: 'Smarty',
    id: 'smarty',
    fileEndings: []
  },
  {
    name: 'PL/SQL',
    id: 'plsql',
    fileEndings: []
  },
  {
    name: 'Soy',
    id: 'soy',
    fileEndings: []
  },
  {
    name: 'Pug',
    id: 'pug',
    fileEndings: []
  },
  {
    name: 'Swift',
    id: 'swift',
    fileEndings: ['swift']
  },
  {
    name: 'YAML',
    id: 'yaml',
    fileEndings: ['yml']
  },
  {
    name: 'TCL',
    id: 'tcl',
    fileEndings: ['tcl']
  },
  {
    name: 'Haml',
    id: 'haml',
    fileEndings: ['haml']
  },
  {
    name: 'Tt2',
    id: 'tt2',
    fileEndings: []
  },
  {
    name: 'Twig',
    id: 'twig',
    fileEndings: []
  },
  {
    name: 'TSX',
    id: 'tsx',
    fileEndings: ['ts']
  },
  {
    name: 'Vbnet',
    id: 'vbnet',
    fileEndings: ['vb']
  },
  {
    name: 'Velocity',
    id: 'velocity',
    fileEndings: []
  },
  {
    name: 'Verilog',
    id: 'verilog',
    fileEndings: []
  },
  {
    name: 'VHDL',
    id: 'vhdl',
    fileEndings: ['vhdl']
  },
  {
    name: 'Vim',
    id: 'vim',
    fileEndings: ['vim']
  },
  {
    name: 'Visual-Basic',
    id: 'visual-basic',
    fileEndings: ['vb']
  },
  {
    name: 'WASM',
    id: 'wasm',
    fileEndings: ['wasm']
  },
  {
    name: 'Wiki',
    id: 'wiki',
    fileEndings: []
  },
  {
    name: 'Xeora',
    id: 'xeora',
    fileEndings: []
  },
  {
    name: 'Xeoracube',
    id: 'xeoracube',
    fileEndings: []
  },
  {
    name: 'Xojo',
    id: 'xojo',
    fileEndings: []
  },
  {
    name: 'Xquery',
    id: 'xquery',
    fileEndings: []
  },
  {
    name: 'Tap',
    id: 'tap',
    fileEndings: []
  },
  {
    id: 'abnf',
    name: 'ABNF',
    fileEndings: []
  },
  {
    id: 'adoc',
    name: 'Adoc',
    fileEndings: []
  },
  {
    id: 'bnf',
    name: 'BNF',
    fileEndings: []
  },
  {
    id: 'rbnf',
    name: 'RBNF',
    fileEndings: []
  },
  {
    id: 'cil',
    name: 'CIL',
    fileEndings: []
  },
  {
    id: 'cmake',
    name: 'CMake',
    fileEndings: []
  },
  {
    id: 'ebnf',
    name: 'EBNF',
    fileEndings: ['ebnf']
  },
  {
    id: 'ejs',
    name: 'EJS',
    fileEndings: ['ejs']
  },
  {
    id: 'gcode',
    name: 'G-code',
    fileEndings: ['gcode']
  },
  {
    id: 'gamemakerlanguage',
    name: 'GameMaker Language',
    fileEndings: ['gml']
  },
  {
    id: 'hcl',
    name: 'HCL',
    fileEndings: ['hcl']
  },
  {
    id: 'javastacktrace',
    name: 'Java Stacktrace',
    fileEndings: []
  },
  {
    id: 'javadoclike',
    name: 'JavaDoc-like',
    fileEndings: []
  },
  {
    id: 'json5',
    name: 'JSON5',
    fileEndings: []
  },
  {
    id: 'n1ql',
    name: 'N1QL',
    fileEndings: ['n1ql']
  },
  {
    id: 'nand2tetris-hdl',
    name: 'NAND2Tetris-hdl',
    fileEndings: ['hdl']
  },
  {
    id: 'jsdoc',
    name: 'JSDoc',
    fileEndings: []
  },
  {
    id: 'phpdoc',
    name: 'PHPdoc',
    fileEndings: []
  },
  {
    id: 'vala',
    name: 'Vala',
    fileEndings: ['vala', 'vapi']
  },
  {
    id: 'javadoc',
    name: 'JavaDoc',
    fileEndings: []
  },
  {
    id: 'toml',
    name: 'Toml',
    fileEndings: []
  },
  {
    id: 't4-templating',
    name: 'T4-templating',
    fileEndings: []
  },
  {
    id: 't4-cs',
    name: 'T4-cs',
    fileEndings: []
  },
  {
    id: 't4',
    name: 'T4',
    fileEndings: []
  },
  {
    id: 'regex',
    name: 'Regex',
    fileEndings: []
  },
  {
    id: 't4-vb',
    name: 'T4-vb',
    fileEndings: []
  }
];

if (isDevMode()) {
  const knownDuplicates = ['js', 'coffee', 'ts', 'py', 'yml', 'md', 'vb', 'hs', 'gml'];
  const jsLanguages = Object.entries(Prism.languages)
    .filter(([, v]) => typeof v !== 'function')
    .map(([k]) => k)
    .filter(id => !knownDuplicates.includes(id));
  if (jsLanguages.length > prismLanguages.length) {
    const registeredIds = prismLanguages.map(l => l.id);
    const delta = jsLanguages.filter(id => !registeredIds.includes(id));

    const entryGenerator = (id: string) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      fileEndings: []
    });

    console.warn(
      'JavaScript has more languages! Missing in TypeScript file:\n' +
        JSON.stringify(delta.map(entryGenerator), null, 2)
    );
  }
}
