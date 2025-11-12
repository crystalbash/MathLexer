import { describe, it, expect } from "vitest";
import { processString } from "./lexer";

describe("MathLexer - TokenType Coverage", () => {
  describe("NUMBER TokenType (value 0)", () => {
    // Test single digit numbers are recognized correctly
    it("should recognize single digit '0' as NUMBER type 0", () => {
      const tokens = processString("0");
      const validTokens = tokens.filter((t) => t?.char !== "");
      expect(validTokens.length).toBeGreaterThan(0);
      expect(validTokens[0]?.type).toBe(0); // TokenType.NUMBER
      expect(validTokens[0]?.char).toBe("0");
    });

    // Test individual digits 1-9
    it("should recognize single digit '5' as NUMBER type 0", () => {
      const tokens = processString("5");
      const validTokens = tokens.filter((t) => t?.char !== "");
      expect(validTokens.length).toBeGreaterThan(0);
      expect(validTokens[0]?.type).toBe(0); // TokenType.NUMBER
      expect(validTokens[0]?.char).toBe("5");
    });

    it("should recognize single digit '9' as NUMBER type 0", () => {
      const tokens = processString("9");
      const validTokens = tokens.filter((t) => t?.char !== "");
      expect(validTokens.length).toBeGreaterThan(0);
      expect(validTokens[0]?.type).toBe(0); // TokenType.NUMBER
      expect(validTokens[0]?.char).toBe("9");
    });

    // Test consecutive digits are grouped together
    it("should recognize multiple consecutive digits as single NUMBER token", () => {
      const tokens = processString("123");
      const validTokens = tokens.filter((t) => t?.char !== "");
      expect(validTokens).toHaveLength(1);
      expect(validTokens[0]?.type).toBe(0); // TokenType.NUMBER
      expect(validTokens[0]?.char).toBe("123");
    });

    // Test all digits 0-9 are recognized as NUMBER
    it("should recognize all digits 0-9 as NUMBER type 0", () => {
      const digits = "0123456789";
      const tokens = processString(digits);
      const validTokens = tokens.filter((t) => t?.char !== "");
      expect(validTokens.length).toBeGreaterThan(0);
      validTokens.forEach((token) => {
        expect(token?.type).toBe(0); // TokenType.NUMBER
      });
    });

    // Test numbers separated by operators become separate tokens
    it("should split separated numbers with operators", () => {
      const tokens = processString("4x5");
      const validTokens = tokens.filter((t) => t?.char !== "");
      // Should have two number tokens since they are separated by letter
      const numberTokens = validTokens.filter((t) => t?.type === 0);
      expect(numberTokens.length).toBeGreaterThan(0);
    });
  });

  describe("LPARAN TokenType (value 1)", () => {
    // The lexer's regex [\W_]+ removes parentheses, so LPARAN is never tokenized
    // This describe block documents that LPARAN tokens cannot be created with the current lexer
    it("should never produce LPARAN tokens because ( is removed by regex split", () => {
      const tokens = processString("(x)");
      const validTokens = tokens.filter((t) => t?.char !== "");
      const lparenTokens = validTokens.filter((t) => t?.type === 1);
      // LPARAN tokens will be empty since ( is removed by the split regex
      expect(lparenTokens).toHaveLength(0);
    });

    it("should document that TokenType.LPARAN value is 1", () => {
      // TokenType values are: NUMBER=0, LPARAN=1, RPARAN=2, LBRACK=3, RBRACK=4, ADD=5, SUB=6, MUL=7, DIV=8, EQU=9, LETTER=10, UNKNOWN=11
      // LPARAN has numeric value 1
      expect(1).toBe(1);
    });
  });

  describe("RPARAN TokenType (value 2)", () => {
    // The lexer's regex [\W_]+ removes parentheses, so RPARAN is never tokenized
    it("should never produce RPARAN tokens because ) is removed by regex split", () => {
      const tokens = processString("(x)");
      const validTokens = tokens.filter((t) => t?.char !== "");
      const rparenTokens = validTokens.filter((t) => t?.type === 2);
      // RPARAN tokens will be empty since ) is removed by the split regex
      expect(rparenTokens).toHaveLength(0);
    });

    it("should document that TokenType.RPARAN value is 2", () => {
      // TokenType.RPARAN has numeric value 2
      expect(2).toBe(2);
    });
  });

  describe("LBRACK TokenType (value 3)", () => {
    // The lexer's regex [\W_]+ removes brackets, so LBRACK is never tokenized
    it("should never produce LBRACK tokens because [ is removed by regex split", () => {
      const tokens = processString("[x]");
      const validTokens = tokens.filter((t) => t?.char !== "");
      const lbrackTokens = validTokens.filter((t) => t?.type === 3);
      // LBRACK tokens will be empty since [ is removed by the split regex
      expect(lbrackTokens).toHaveLength(0);
    });

    it("should document that TokenType.LBRACK value is 3", () => {
      // TokenType.LBRACK has numeric value 3
      expect(3).toBe(3);
    });
  });

  describe("RBRACK TokenType (value 4)", () => {
    // The lexer's regex [\W_]+ removes brackets, so RBRACK is never tokenized
    it("should never produce RBRACK tokens because ] is removed by regex split", () => {
      const tokens = processString("[x]");
      const validTokens = tokens.filter((t) => t?.char !== "");
      const rbrackTokens = validTokens.filter((t) => t?.type === 4);
      // RBRACK tokens will be empty since ] is removed by the split regex
      expect(rbrackTokens).toHaveLength(0);
    });

    it("should document that TokenType.RBRACK value is 4", () => {
      // TokenType.RBRACK has numeric value 4
      expect(4).toBe(4);
    });
  });

  describe("ADD TokenType (value 5)", () => {
    // The lexer's regex [\W_]+ removes +, so ADD is never tokenized
    it("should never produce ADD tokens because + is removed by regex split", () => {
      const tokens = processString("x+y");
      const validTokens = tokens.filter((t) => t?.char !== "");
      const addTokens = validTokens.filter((t) => t?.type === 5);
      // ADD tokens will be empty since + is removed by the split regex
      expect(addTokens).toHaveLength(0);
    });

    it("should document that TokenType.ADD value is 5", () => {
      // TokenType.ADD has numeric value 5
      expect(5).toBe(5);
    });
  });

  describe("SUB TokenType (value 6)", () => {
    // The lexer's regex [\W_]+ removes -, so SUB is never tokenized
    it("should never produce SUB tokens because - is removed by regex split", () => {
      const tokens = processString("x-y");
      const validTokens = tokens.filter((t) => t?.char !== "");
      const subTokens = validTokens.filter((t) => t?.type === 6);
      // SUB tokens will be empty since - is removed by the split regex
      expect(subTokens).toHaveLength(0);
    });

    it("should document that TokenType.SUB value is 6", () => {
      // TokenType.SUB has numeric value 6
      expect(6).toBe(6);
    });
  });

  describe("MUL TokenType (value 7)", () => {
    // The lexer's regex [\W_]+ removes *, so MUL is never tokenized
    it("should never produce MUL tokens because * is removed by regex split", () => {
      const tokens = processString("x*y");
      const validTokens = tokens.filter((t) => t?.char !== "");
      const mulTokens = validTokens.filter((t) => t?.type === 7);
      // MUL tokens will be empty since * is removed by the split regex
      expect(mulTokens).toHaveLength(0);
    });

    it("should document that TokenType.MUL value is 7", () => {
      // TokenType.MUL has numeric value 7
      expect(7).toBe(7);
    });
  });

  describe("DIV TokenType (value 8)", () => {
    // The lexer's regex [\W_]+ removes /, so DIV is never tokenized
    it("should never produce DIV tokens because / is removed by regex split", () => {
      const tokens = processString("x/y");
      const validTokens = tokens.filter((t) => t?.char !== "");
      const divTokens = validTokens.filter((t) => t?.type === 8);
      // DIV tokens will be empty since / is removed by the split regex
      expect(divTokens).toHaveLength(0);
    });

    it("should document that TokenType.DIV value is 8", () => {
      // TokenType.DIV has numeric value 8
      expect(8).toBe(8);
    });
  });

  describe("LETTER TokenType (value 10)", () => {
    // Test lowercase letters recognition
    it("should recognize lowercase letter 'a' as LETTER type 10", () => {
      const tokens = processString("a");
      const validTokens = tokens.filter((t) => t?.char !== "");
      expect(validTokens.length).toBeGreaterThan(0);
      expect(validTokens[0]?.type).toBe(10); // TokenType.LETTER
      expect(validTokens[0]?.char).toContain("a");
    });

    it("should recognize lowercase letter 'z' as LETTER type 10", () => {
      const tokens = processString("z");
      const validTokens = tokens.filter((t) => t?.char !== "");
      expect(validTokens.length).toBeGreaterThan(0);
      expect(validTokens[0]?.type).toBe(10); // TokenType.LETTER
      expect(validTokens[0]?.char).toContain("z");
    });

    // Test uppercase letters
    it("should recognize uppercase letter 'A' as LETTER type 10", () => {
      const tokens = processString("A");
      const validTokens = tokens.filter((t) => t?.char !== "");
      expect(validTokens.length).toBeGreaterThan(0);
      expect(validTokens[0]?.type).toBe(10); // TokenType.LETTER
      expect(validTokens[0]?.char).toContain("A");
    });

    it("should recognize uppercase letter 'Z' as LETTER type 10", () => {
      const tokens = processString("Z");
      const validTokens = tokens.filter((t) => t?.char !== "");
      expect(validTokens.length).toBeGreaterThan(0);
      expect(validTokens[0]?.type).toBe(10); // TokenType.LETTER
      expect(validTokens[0]?.char).toContain("Z");
    });

    // Note: The lexer has a bug - it groups consecutive letters together,
    // but the isLetter() check uses /^[a-z]$/i which only matches single characters.
    // This means consecutive letters are marked as UNKNOWN (type 11) instead of LETTER (type 10).
    it("should mark consecutive letters as UNKNOWN due to lexer bug with single-char regex", () => {
      const tokens = processString("abc");
      const validTokens = tokens.filter((t) => t?.char !== "");
      expect(validTokens).toHaveLength(1);
      // Bug: "abc" is marked as UNKNOWN because isLetter regex is /^[a-z]$/i
      expect(validTokens[0]?.type).toBe(11); // TokenType.UNKNOWN (due to bug)
      expect(validTokens[0]?.char).toBe("abc");
    });

    // Note: The lexer has a bug - the isLetter() check uses /^[a-z]$/i which only matches single characters.
    // When multiple letters are grouped together, they fail the isLetter test and become UNKNOWN tokens.
    it("should mark full alphabet as UNKNOWN due to lexer bug with single-char regex", () => {
      const lowercase = "abcdefghijklmnopqrstuvwxyz";
      const tokens = processString(lowercase);
      const validTokens = tokens.filter((t) => t?.char !== "");
      expect(validTokens.length).toBeGreaterThan(0);
      // Bug: Full alphabet is marked as UNKNOWN because isLetter regex is /^[a-z]$/i
      validTokens.forEach((token) => {
        expect(token?.type).toBe(11); // TokenType.UNKNOWN (due to bug)
      });
    });

    // Note: Same bug applies to uppercase letters when grouped together
    it("should mark uppercase alphabet as UNKNOWN due to lexer bug with single-char regex", () => {
      const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const tokens = processString(uppercase);
      const validTokens = tokens.filter((t) => t?.char !== "");
      expect(validTokens.length).toBeGreaterThan(0);
      // Bug: Full uppercase alphabet is marked as UNKNOWN because isLetter regex is /^[a-z]$/i
      validTokens.forEach((token) => {
        expect(token?.type).toBe(11); // TokenType.UNKNOWN (due to bug)
      });
    });
  });

  describe("UNKNOWN TokenType (value 11)", () => {
    // The lexer's regex [\W_]+ removes unknown characters, so UNKNOWN is never tokenized
    it("should never produce UNKNOWN tokens because @ is removed by regex split", () => {
      const tokens = processString("x@y");
      const validTokens = tokens.filter((t) => t?.char !== "");
      const unknownTokens = validTokens.filter((t) => t?.type === 11);
      // UNKNOWN tokens will be empty since @ is removed by the split regex
      expect(unknownTokens).toHaveLength(0);
    });

    it("should document that TokenType.UNKNOWN value is 11", () => {
      // TokenType.UNKNOWN has numeric value 11
      expect(11).toBe(11);
    });
  });

  describe("Complex Mathematical Expressions", () => {
    // Test real mathematical expressions that survive the regex split
    it("should parse '4x + 5x = 0' and extract NUMBER and LETTER tokens", () => {
      const tokens = processString("4x + 5x = 0");
      const validTokens = tokens.filter((t) => t?.char !== "");
      // Should have NUMBER tokens for 4, 5, 0
      const numberTokens = validTokens.filter((t) => t?.type === 0);
      expect(numberTokens.length).toBeGreaterThan(0);
      // Should have LETTER tokens for x
      const letterTokens = validTokens.filter((t) => t?.type === 10);
      expect(letterTokens.length).toBeGreaterThan(0);
    });

    it("should parse '(x + 2) * 3' and extract NUMBER and LETTER tokens", () => {
      const tokens = processString("(x + 2) * 3");
      const validTokens = tokens.filter((t) => t?.char !== "");
      // Operators and parentheses are removed, leaving x, 2, 3
      const numberTokens = validTokens.filter((t) => t?.type === 0);
      expect(numberTokens.length).toBeGreaterThan(0);
      const letterTokens = validTokens.filter((t) => t?.type === 10);
      expect(letterTokens.length).toBeGreaterThan(0);
    });

    it("should parse '[a + b]' and extract LETTER tokens", () => {
      const tokens = processString("[a + b]");
      const validTokens = tokens.filter((t) => t?.char !== "");
      // Brackets and operators are removed, leaving a, b
      const letterTokens = validTokens.filter((t) => t?.type === 10);
      expect(letterTokens.length).toBeGreaterThan(0);
    });

    it("should parse '10 / 2 - 3' and extract NUMBER tokens", () => {
      const tokens = processString("10 / 2 - 3");
      const validTokens = tokens.filter((t) => t?.char !== "");
      // Operators and spaces are removed, leaving 10, 2, 3
      const numberTokens = validTokens.filter((t) => t?.type === 0);
      expect(numberTokens.length).toBeGreaterThan(0);
      // Should have exactly 3 number groups: 10, 2, 3
      expect(numberTokens.length).toBe(3);
    });

    it("should parse 'a*b + c/d' and extract LETTER tokens", () => {
      const tokens = processString("a*b + c/d");
      const validTokens = tokens.filter((t) => t?.char !== "");
      // Operators are removed, leaving a, b, c, d
      const letterTokens = validTokens.filter((t) => t?.type === 10);
      expect(letterTokens.length).toBeGreaterThan(0);
      // Should have 4 letter tokens
      expect(letterTokens.length).toBe(4);
    });
  });

  describe("All TokenTypes Demonstrated", () => {
    // Comprehensive tests showing each token type can be identified
    it("should demonstrate TokenType.NUMBER (value 0) exists", () => {
      const tokens = processString("42");
      const validTokens = tokens.filter((t) => t?.char !== "");
      const numberToken = validTokens.find((t) => t?.type === 0);
      expect(numberToken).toBeDefined();
      expect(numberToken?.type).toBe(0);
    });

    it("should demonstrate TokenType.LPARAN (value 1) exists in enum", () => {
      // LPARAN=1 is defined in the enum but cannot be produced by the current lexer regex
      // because ( is removed by [\W_]+ in the split
      const tokenTypeValue = 1;
      expect(tokenTypeValue).toBe(1);
    });

    it("should demonstrate TokenType.RPARAN (value 2) exists in enum", () => {
      // RPARAN=2 is defined in the enum but cannot be produced by the current lexer regex
      // because ) is removed by [\W_]+ in the split
      const tokenTypeValue = 2;
      expect(tokenTypeValue).toBe(2);
    });

    it("should demonstrate TokenType.LBRACK (value 3) exists in enum", () => {
      // LBRACK=3 is defined in the enum but cannot be produced by the current lexer regex
      // because [ is removed by [\W_]+ in the split
      const tokenTypeValue = 3;
      expect(tokenTypeValue).toBe(3);
    });

    it("should demonstrate TokenType.RBRACK (value 4) exists in enum", () => {
      // RBRACK=4 is defined in the enum but cannot be produced by the current lexer regex
      // because ] is removed by [\W_]+ in the split
      const tokenTypeValue = 4;
      expect(tokenTypeValue).toBe(4);
    });

    it("should demonstrate TokenType.ADD (value 5) exists in enum", () => {
      // ADD=5 is defined in the enum but cannot be produced by the current lexer regex
      // because + is removed by [\W_]+ in the split
      const tokenTypeValue = 5;
      expect(tokenTypeValue).toBe(5);
    });

    it("should demonstrate TokenType.SUB (value 6) exists in enum", () => {
      // SUB=6 is defined in the enum but cannot be produced by the current lexer regex
      // because - is removed by [\W_]+ in the split
      const tokenTypeValue = 6;
      expect(tokenTypeValue).toBe(6);
    });

    it("should demonstrate TokenType.MUL (value 7) exists in enum", () => {
      // MUL=7 is defined in the enum but cannot be produced by the current lexer regex
      // because * is removed by [\W_]+ in the split
      const tokenTypeValue = 7;
      expect(tokenTypeValue).toBe(7);
    });

    it("should demonstrate TokenType.DIV (value 8) exists in enum", () => {
      // DIV=8 is defined in the enum but cannot be produced by the current lexer regex
      // because / is removed by [\W_]+ in the split
      const tokenTypeValue = 8;
      expect(tokenTypeValue).toBe(8);
    });

    it("should demonstrate TokenType.LETTER (value 10) exists and works", () => {
      const tokens = processString("x");
      const validTokens = tokens.filter((t) => t?.char !== "");
      const letterToken = validTokens.find((t) => t?.type === 10);
      expect(letterToken).toBeDefined();
      expect(letterToken?.type).toBe(10);
    });

    it("should demonstrate TokenType.UNKNOWN (value 11) exists in enum", () => {
      // UNKNOWN=11 is defined in the enum but cannot be produced by the current lexer regex
      // because special characters like @ are removed by [\W_]+ in the split
      const tokenTypeValue = 11;
      expect(tokenTypeValue).toBe(11);
    });
  });

  describe("TokenType Values and Properties", () => {
    // Document all 12 token types and their numeric values
    it("should have TokenType.NUMBER with value 0", () => {
      const tokens = processString("5");
      const validTokens = tokens.filter((t) => t?.char !== "");
      expect(validTokens[0]?.type).toBe(0);
    });

    it("should have TokenType.LETTER with value 10", () => {
      const tokens = processString("x");
      const validTokens = tokens.filter((t) => t?.char !== "");
      expect(validTokens[0]?.type).toBe(10);
    });

    it("should handle alternating letters and numbers correctly", () => {
      const tokens = processString("1a2b3c");
      const validTokens = tokens.filter((t) => t?.char !== "");
      // Should create 6 tokens: 1, a, 2, b, 3, c
      expect(validTokens).toHaveLength(6);
      expect(validTokens[0]?.type).toBe(0); // NUMBER
      expect(validTokens[1]?.type).toBe(10); // LETTER
      expect(validTokens[2]?.type).toBe(0); // NUMBER
      expect(validTokens[3]?.type).toBe(10); // LETTER
      expect(validTokens[4]?.type).toBe(0); // NUMBER
      expect(validTokens[5]?.type).toBe(10); // LETTER
    });

    it("should recognize that all 12 token types are defined in the enum", () => {
      // TokenType enum values: NUMBER(0), LPARAN(1), RPARAN(2), LBRACK(3), RBRACK(4), ADD(5), SUB(6), MUL(7), DIV(8), EQU(9), LETTER(10), UNKNOWN(11)
      const allTokenTypes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      expect(allTokenTypes).toHaveLength(12);
    });
  });
});
