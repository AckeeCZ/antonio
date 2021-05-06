enum TokenType {
    BEARER = 'Bearer',
}

export default function setAuthHeader(
    headers: Headers,
    tokenValue?: string,
    tokenType: TokenType | string = TokenType.BEARER,
): void {
    if (tokenValue) {
        headers.set('Authorization', `${tokenType} ${tokenValue}`);
    } else {
        headers.delete('Authorization');
    }
}
