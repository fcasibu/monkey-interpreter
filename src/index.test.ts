import { Tokenizer, TokenType } from ".";

describe("Tokenizerrr", () => {
  it("should be able to tokenize simple input", () => {
    const input = "=+(){},;";
    const tokenizer = new Tokenizer(input);

    const tokens = [
      { type: TokenType.ASSIGN, value: "=" },
      { type: TokenType.PLUS, value: "+" },
      { type: TokenType.LPAREN, value: "(" },
      { type: TokenType.RPAREN, value: ")" },
      { type: TokenType.LBRACE, value: "{" },
      { type: TokenType.RBRACE, value: "}" },
      { type: TokenType.COMMA, value: "," },
      { type: TokenType.SEMICOLON, value: ";" },
      { type: TokenType.EOF, value: "\0" },
    ];

    for (const token of tokens) {
      expect(tokenizer.nextToken()).toEqual(token);
    }
  });

  it("should be able to tokenize complex input", () => {
    const input = `
let five = 5;
let ten = 10;

let add = fn(x, y) {
  x + y;
};

let result = add(five, ten);
!-/*5;
5 < 10 > 5;

if (5 < 10) {
  return true;
} else {
  return false;
}

10 == 10;
10 != 9;

10 >= 10;
10 <= 9;
`;
    const tokenizer = new Tokenizer(input);

    const tokens = [
      { type: TokenType.LET, value: "let" },
      { type: TokenType.IDENT, value: "five" },
      { type: TokenType.ASSIGN, value: "=" },
      { type: TokenType.NUMBER, value: "5" },
      { type: TokenType.SEMICOLON, value: ";" },
      { type: TokenType.LET, value: "let" },
      { type: TokenType.IDENT, value: "ten" },
      { type: TokenType.ASSIGN, value: "=" },
      { type: TokenType.NUMBER, value: "10" },
      { type: TokenType.SEMICOLON, value: ";" },
      { type: TokenType.LET, value: "let" },
      { type: TokenType.IDENT, value: "add" },
      { type: TokenType.ASSIGN, value: "=" },
      { type: TokenType.FUNCTION, value: "fn" },
      { type: TokenType.LPAREN, value: "(" },
      { type: TokenType.IDENT, value: "x" },
      { type: TokenType.COMMA, value: "," },
      { type: TokenType.IDENT, value: "y" },
      { type: TokenType.RPAREN, value: ")" },
      { type: TokenType.LBRACE, value: "{" },
      { type: TokenType.IDENT, value: "x" },
      { type: TokenType.PLUS, value: "+" },
      { type: TokenType.IDENT, value: "y" },
      { type: TokenType.SEMICOLON, value: ";" },
      { type: TokenType.RBRACE, value: "}" },
      { type: TokenType.SEMICOLON, value: ";" },
      { type: TokenType.LET, value: "let" },
      { type: TokenType.IDENT, value: "result" },
      { type: TokenType.ASSIGN, value: "=" },
      { type: TokenType.IDENT, value: "add" },
      { type: TokenType.LPAREN, value: "(" },
      { type: TokenType.IDENT, value: "five" },
      { type: TokenType.COMMA, value: "," },
      { type: TokenType.IDENT, value: "ten" },
      { type: TokenType.RPAREN, value: ")" },
      { type: TokenType.SEMICOLON, value: ";" },
      { type: TokenType.BANG, value: "!" },
      { type: TokenType.MINUS, value: "-" },
      { type: TokenType.SLASH, value: "/" },
      { type: TokenType.ASTERISK, value: "*" },
      { type: TokenType.NUMBER, value: "5" },
      { type: TokenType.SEMICOLON, value: ";" },
      { type: TokenType.NUMBER, value: "5" },
      { type: TokenType.LT, value: "<" },
      { type: TokenType.NUMBER, value: "10" },
      { type: TokenType.GT, value: ">" },
      { type: TokenType.NUMBER, value: "5" },
      { type: TokenType.SEMICOLON, value: ";" },
      { type: TokenType.IF, value: "if" },
      { type: TokenType.LPAREN, value: "(" },
      { type: TokenType.NUMBER, value: "5" },
      { type: TokenType.LT, value: "<" },
      { type: TokenType.NUMBER, value: "10" },
      { type: TokenType.RPAREN, value: ")" },
      { type: TokenType.LBRACE, value: "{" },
      { type: TokenType.RETURN, value: "return" },
      { type: TokenType.TRUE, value: "true" },
      { type: TokenType.SEMICOLON, value: ";" },
      { type: TokenType.RBRACE, value: "}" },
      { type: TokenType.ELSE, value: "else" },
      { type: TokenType.LBRACE, value: "{" },
      { type: TokenType.RETURN, value: "return" },
      { type: TokenType.FALSE, value: "false" },
      { type: TokenType.SEMICOLON, value: ";" },
      { type: TokenType.RBRACE, value: "}" },
      { type: TokenType.NUMBER, value: "10" },
      { type: TokenType.EQ, value: "==" },
      { type: TokenType.NUMBER, value: "10" },
      { type: TokenType.SEMICOLON, value: ";" },
      { type: TokenType.NUMBER, value: "10" },
      { type: TokenType.NOT_EQ, value: "!=" },
      { type: TokenType.NUMBER, value: "9" },
      { type: TokenType.SEMICOLON, value: ";" },
      { type: TokenType.NUMBER, value: "10" },
      { type: TokenType.GTE, value: ">=" },
      { type: TokenType.NUMBER, value: "10" },
      { type: TokenType.SEMICOLON, value: ";" },
      { type: TokenType.NUMBER, value: "10" },
      { type: TokenType.LTE, value: "<=" },
      { type: TokenType.NUMBER, value: "9" },
      { type: TokenType.SEMICOLON, value: ";" },
      { type: TokenType.EOF, value: "\0" },
    ];

    for (const token of tokens) {
      expect(tokenizer.nextToken()).toEqual(token);
    }
  });
});
