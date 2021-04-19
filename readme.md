# C/C++ Header to Markdown converter (*mdcdoc*)

Small utility for generating markdown file from block comments in C/C++ source code.

```cpp
library.h  →  [mdcdoc]  →  documentation.md
```

Basic idea is that you already have markdown text in block comment of your code and you want to take them into separate file.

*This tool is far away from doxygen or other proper documentation generators. I wanted a small tool for documenting a trivial Arduino library. I realized that, I unintentionally already writing markdown into comments. So, I just needed to take them out…*

## Examples

- [timer.h](https://github.com/forntoh/mdcdoc/blob/master/examples/timer.h) → [timer.md](https://github.com/forntoh/mdcdoc/blob/master/examples/timer.md) (C++ header)
- [simple.h](https://github.com/forntoh/mdcdoc/blob/master/examples/simple.h) → [simple.md](https://github.com/forntoh/mdcdoc/blob/master/examples/simple.md) (C header)

## Usage

Get application. Requires *node.js* and *npm* to be installed on computer.

```bash
git clone https://github.com/forntoh/mdcdoc.git && cd mdcdoc
npm install
```

Run it

```bash
node mdcdoc -p cpp -o documentation.md library.h
```

## Theory of operation

mdcdoc works in 3 steps:

1. Take block comment (beginning with `/**`) from file plus one following line of code.
2. Apply patterns to block according to that one line of code (if not empty). Patterns are in [libs](https://github.com/forntoh/mdcdoc/tree/master/lib/patterns).
3. Go block by block and
    - If code line is empty, just put content of block to output file.
    - If code line is not empty, make md header from it and then put content of block.
