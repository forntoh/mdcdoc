class Generator {
  constructor(options) {
    this.options = options;

    this.level = 0;
    this.codeBlock = false;
    this.doc = [];
    this.codePatterns = [];
  }

  generate(tokens) {
    if (this.options.addFileHeader) {
      this.addLine(
        `> This document was generated from file \`${
          this.options.file
        }\` at ${new Date().toLocaleString()}`
      );
    }

    for (const t of tokens) {
      this.addToken(t);
    }
  }

  addCodePattern(pattern, fn) {
    this.codePatterns.push({
      pattern: pattern,
      callback: fn,
    });
  }

  applyCodePattern(token) {
    for (const p of this.codePatterns) {
      if (p.pattern.test(token.code)) {
        p.callback.call(this, token);
        return;
      }
    }
  }

  addToken(token) {
    if (token.code != "") {
      this.applyCodePattern(token);
      this.addSubHeader(token.header || token.code);
      this.addLines(token.text, true);
      this.addCodeLine(token);
      if (token.params.length !== 0) this.addParamLines(token.params);
      if (token.return != undefined) this.addReturnsLine(token.return);
    } else {
      this.addLines(token.text);
    }

    this.addLine("");
  }

  addHeader(text) {
    this.addLine(heading(this.level) + " " + text);
  }

  addSubHeader(text) {
    this.addLine(
      (this.level <= 1 ? "" : "1. ") + heading(this.level + 1) + " " + text
    );
    this.addLine("");
  }

  addLine(line) {
    this.doc.push(line);
  }

  addCodeLine(token) {
    this.addLine("");
    this.addLine((this.level <= 1 ? "" : "    ") + "```cpp");
    this.addLine((this.level <= 1 ? "" : "    ") + token.code);
    this.addLine((this.level <= 1 ? "" : "    ") + "```");
    this.addLine("");
  }

  addParamLines(lines) {
    this.addLine((this.level <= 1 ? "" : "    ") + "**Params:**");
    this.addLine("");
    for (const l of lines) {
      var first = l.split(" ")[1];
      this.addLine(
        (this.level <= 1 ? "" : "    ") + "- `" + first + "` - " + l.substring(first.length + 1).trim()
      );
    }
    this.addLine("");
  }

  addReturnsLine(text) {
    this.addLine((this.level <= 1 ? "" : "    ") + "**Returns:**");
    this.addLine("");
    this.addLine((this.level <= 1 ? "" : "    ") + "- " + text);
  }

  addTextLine(text, relative) {
    if (text.startsWith("```")) {
      this.codeBlock = !this.codeBlock;
    }

    if (this.codeBlock) {
      this.addLine(text);
      return;
    }

    if (text.startsWith("#")) {
      if (relative) {
        this.addLine(heading(this.level + 1) + text);
      } else {
        var prefix = text.substring(0, text.indexOf(" "));
        this.level = prefix.length;
        this.addLine(text);
      }
    } else {
      this.addLine((this.level <= 1 ? "" : "    ") + text);
    }
  }

  addLines(lines, relative) {
    for (const l of lines) {
      this.addTextLine(l, relative);
    }
  }
}

function heading(n) {
  return new Array(n + 1).join("#");
}

exports.Generator = Generator;
