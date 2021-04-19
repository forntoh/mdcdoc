function parseCode(text) {
  var lines = text.split("\n");

  var line;
  var lineNo = 0;
  var blocks = [];

  function nextLine() {
    lineNo++;
    return lines.shift();
  }

  while ((line = nextLine())) {
    var l = line.trim();

    if (!l.startsWith("/**")) {
      continue;
    }

    var block = {
      text: [],
      params: [],
      textLine: lineNo,
    };

    while ((line = nextLine())) {
      l = line.trim();
      if (l.startsWith("*/") || l.startsWith("**/")) break;

      if (l.startsWith("* @return")) block.return = trimText(l.substr(9));
      else if (l.startsWith("* @param")) block.params.push(l.substr(8));
      else block.text.push(trimText(l));
    }

    block.code = trimCode(nextLine());
    block.codeLine = lineNo;

    blocks.push(block);
  }

  return blocks;
}

function trimCode(code) {
  if (!code) return code;
  return stripRight(code.trim(), "{;").trim();
}

function trimText(text) {
  if (!text) return text;

  text = text.trim();

  if (text.startsWith("* ")) {
    text = text.substr(2);
  }

  if (text == "*") {
    text = "";
  }

  return text;
}

function stripRight(s, chars) {
  var regex;
  var pattern;
  var ss = s == null ? "" : "" + s;

  if (chars === undefined) {
    pattern = /\s+$/g;
  } else {
    pattern = new RegExp("[" + chars + "]+$", "g");
  }

  return ss.replace(pattern, "");
}

exports.parseCode = parseCode;
