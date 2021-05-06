declare module '@ackee/petrus' {
    export const getAccessToken: () => Generator<any, { token: string } | null>;
}
