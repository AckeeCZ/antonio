/**
 *
 * @param {{ name: String, message: String, code: Number }} error
 * @param {Error|TypeError|RangeError\etc.} ErrorClass
 * @returns {ErrorClass}
 */
export const enhancedError = (error = {}, ErrorClass = Error) => {
    const pkgName = 'ackee-http-client';
    const string = Object.entries(error).reduce((acc, entry) => {
        const row = `\t"${entry[0]}": "${entry[1]}"`;

        return `${acc}\n${row}`;
    }, `\n:${pkgName} {`);

    return new ErrorClass(`${string}\n}`);
};
