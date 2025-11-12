enum TokenType {
    NUMBER = 0,
    LPARAN = 1,
    RPARAN = 2,
    LBRACK = 3,
    RBRACK = 4,
    ADD = 5,
    SUB = 6,
    MUL = 7,
    DIV = 8,
    EQU = 9,
    LETTER = 10,
    UNKNOWN = 11,
}

type Token = {
    type: TokenType
    char: string
}

function generateTokenFromChar(char: string): Token {
    let token: Token = {
        type: TokenType.UNKNOWN,
        char: char
    };

    // Check if char is a number
    if (Number.isFinite(Number(char))) {
        token.type = TokenType.NUMBER;
    } else {
        switch (char) {
            case "+":
                token.type = TokenType.ADD;
                break;
            case "-":
                token.type = TokenType.SUB;
                break;
            case "/":
                token.type = TokenType.DIV;
                break;
            case "*":
                token.type = TokenType.MUL;
                break;
            case "(":
                token.type = TokenType.LPARAN;
                break;
            case ")":
                token.type = TokenType.RPARAN;
                break;
            case "[":
                token.type = TokenType.LBRACK;
                break;
            case "]":
                token.type = TokenType.RBRACK;
                break;
            default:
                const isLetter = (char: string): boolean =>
                    // Ugly
                    /^[a-z]$/i.test(char);

                if (isLetter(char)) {
                    token.type = TokenType.LETTER;
                }
        }
    }

    return token;
}

export function processString(str: string): Token[] {
    const splString: string[] = str.split(/(?<=[a-z])(?=\d)|(?<=[0-9])(?=[a-z])|[\W_]+/i);
    let tokens: Token[] = []

    for (let i = 0; i < splString.length; ++i) {
        const ch: string = splString[i]!;
        const token: Token = generateTokenFromChar(ch);

        tokens.push(token);
    }

    return tokens
}