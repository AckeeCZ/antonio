enum TokenType {
    Bearer,
}

export default function setAuthHeader(
    headers: Headers,
    tokenValue?: string,
    tokenType: TokenType | string = TokenType.Bearer,
): void {
    if (tokenValue) {
        headers.set('Authorization', `${tokenType} ${tokenValue}`);
    } else {
        headers.delete('Authorization');
    }
}
