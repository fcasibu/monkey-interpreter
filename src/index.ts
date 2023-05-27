export enum TokenType {
  ILLEGAL = "ILLEGAL",
  EOF = "EOF",
  IDENT = "IDENT",
  NUMBER = "NUMBER",
  ASSIGN = "ASSIGN",
  PLUS = "PLUS",
  MINUS = "MINUS",
  BANG = "BANG",
  ASTERISK = "ASTERISK",
  SLASH = "SLASH",
  LT = "LT",
  LTE = "LTE",
  GT = "GT",
  GTE = "GTE",
  EQ = "EQ",
  NOT_EQ = "NOT_EQ",
  COMMA = "COMMA",
  SEMICOLON = "SEMICOLON",
  LPAREN = "LPAREN",
  RPAREN = "RPAREN",
  LBRACE = "LBRACE",
  RBRACE = "RBRACE",
  FUNCTION = "FUNCTION",
  LET = "LET",
  IF = "IF",
  ELSE = "ELSE",
  RETURN = "RETURN",
  TRUE = "TRUE",
  FALSE = "FALSE",
}

const Keywords = {
  fn: TokenType.FUNCTION,
  let: TokenType.LET,
  if: TokenType.IF,
  else: TokenType.ELSE,
  return: TokenType.RETURN,
  true: TokenType.TRUE,
  false: TokenType.FALSE,
} as const;

type Token = { type: TokenType; value: string };

export class Tokenizer {
  private position;
  private readPosition;
  private character;

  constructor(private input: string) {
    this.position = 0;
    this.readPosition = 0;
    this.character = "";

    this.readChar();
  }

  public nextToken(): Token {
    let token: Token = {
      type: TokenType.ILLEGAL,
      value: "ILLEGAL",
    };

    this.skipWhiteSpace();

    switch (this.character) {
      case "=": {
        if (this.peekChar() === "=") {
          token = this.createToken(
            TokenType.EQ,
            this.character + this.character
          );
          this.readChar();
        } else {
          token = this.createToken(TokenType.ASSIGN, this.character);
        }
        break;
      }
      case ";": {
        token = this.createToken(TokenType.SEMICOLON, this.character);
        break;
      }
      case "(": {
        token = this.createToken(TokenType.LPAREN, this.character);
        break;
      }
      case ")": {
        token = this.createToken(TokenType.RPAREN, this.character);
        break;
      }
      case ",": {
        token = this.createToken(TokenType.COMMA, this.character);
        break;
      }
      case "+": {
        token = this.createToken(TokenType.PLUS, this.character);
        break;
      }
      case "-": {
        token = this.createToken(TokenType.MINUS, this.character);
        break;
      }
      case "!": {
        if (this.peekChar() === "=") {
          const character = this.character;
          this.readChar();
          token = this.createToken(
            TokenType.NOT_EQ,
            character + this.character
          );
        } else {
          token = this.createToken(TokenType.BANG, this.character);
        }
        break;
      }
      case "*": {
        token = this.createToken(TokenType.ASTERISK, this.character);
        break;
      }
      case "/": {
        token = this.createToken(TokenType.SLASH, this.character);
        break;
      }
      case "<": {
        if (this.peekChar() === "=") {
          const character = this.character;
          this.readChar();
          token = this.createToken(TokenType.LTE, character + this.character);
        } else {
          token = this.createToken(TokenType.LT, this.character);
        }
        break;
      }
      case ">": {
        if (this.peekChar() === "=") {
          const character = this.character;
          this.readChar();
          token = this.createToken(TokenType.GTE, character + this.character);
        } else {
          token = this.createToken(TokenType.GT, this.character);
        }
        break;
      }
      case "{": {
        token = this.createToken(TokenType.LBRACE, this.character);
        break;
      }
      case "}": {
        token = this.createToken(TokenType.RBRACE, this.character);
        break;
      }
      case "\0": {
        token = this.createToken(TokenType.EOF, this.character);
        break;
      }
    }

    if (Validator.isLetter(this.character)) {
      const tokenValue = this.readIdentifier();
      return this.createToken(this.lookupIdentifier(tokenValue), tokenValue);
    } else if (Validator.isNumber(this.character)) {
      return this.createToken(TokenType.NUMBER, this.readNumber());
    }

    this.readChar();
    return token;
  }

  private readChar() {
    this.character = this.peekChar();
    this.position = this.readPosition;
    this.readPosition += 1;
  }

  private readIdentifier() {
    const initialPosition = this.position;

    while (Validator.isLetter(this.character)) {
      this.readChar();
    }

    return this.input.slice(initialPosition, this.position);
  }

  private readNumber() {
    const initialPosition = this.position;

    while (Validator.isNumber(this.character)) {
      this.readChar();
    }

    return this.input.slice(initialPosition, this.position);
  }

  private peekChar() {
    if (this.readPosition >= this.input.length) {
      return "\0";
    } else {
      return this.input[this.readPosition] ?? "";
    }
  }

  private skipWhiteSpace() {
    while (Validator.isWhiteSpace(this.character)) {
      this.readChar();
    }
  }

  private lookupIdentifier(identifier: string): TokenType {
    const token = Keywords[identifier as keyof typeof Keywords];

    return token ?? TokenType.IDENT;
  }

  private createToken(type: TokenType, value: string) {
    return { type, value };
  }
}

export class Validator {
  public static isWhiteSpace(character: string) {
    return (
      character === " " ||
      character === "\n" ||
      character === "\r" ||
      character === "\t"
    );
  }

  public static isNumber(character: string) {
    return character >= "0" && character <= "9";
  }

  public static isLetter(character: string) {
    return (
      (character >= "a" && character <= "z") ||
      (character >= "A" && character <= "Z") ||
      character === "_"
    );
  }
}
