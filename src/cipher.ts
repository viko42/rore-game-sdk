const ALGORITHM = 'AES-GCM';
const IV_LENGTH = 12;
const TAG_LENGTH = 128;

let sessionKey: CryptoKey | null = null;
// let sessionKeyRaw: ArrayBuffer | null = null;

export async function initSessionKey(keyBase64: string): Promise<void> {
    const keyBuffer = base64ToArrayBuffer(keyBase64);
    // sessionKeyRaw = keyBuffer;
    sessionKey = await crypto.subtle.importKey(
        'raw',
        keyBuffer,
        { name: ALGORITHM },
        false,
        ['encrypt', 'decrypt']
    );
}

export async function encrypt(data: unknown): Promise<string> {
    if (!sessionKey) {
        throw new Error('Session key not initialized');
    }

    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const json = JSON.stringify(data);
    const encoded = new TextEncoder().encode(json);

    const encrypted = await crypto.subtle.encrypt(
        { name: ALGORITHM, iv, tagLength: TAG_LENGTH },
        sessionKey,
        encoded
    );
    const encryptedBytes = new Uint8Array(encrypted);
    const tagBytesLength = TAG_LENGTH / 8;
    const ciphertextLength = encryptedBytes.length - tagBytesLength;
    const ciphertext = encryptedBytes.slice(0, ciphertextLength);
    const authTag = encryptedBytes.slice(ciphertextLength);

    const combined = new Uint8Array(iv.length + authTag.length + ciphertext.length);
    combined.set(iv, 0);
    combined.set(authTag, iv.length);
    combined.set(ciphertext, iv.length + authTag.length);

    return arrayBufferToBase64(combined.buffer);
}

export async function decrypt(encryptedBase64: string): Promise<unknown> {
    if (!sessionKey) {
        throw new Error('Session key not initialized');
    }

    const combined = base64ToArrayBuffer(encryptedBase64);
    const combinedArray = new Uint8Array(combined);

    const iv = combinedArray.slice(0, IV_LENGTH);
    const authTagLength = TAG_LENGTH / 8;
    const authTag = combinedArray.slice(IV_LENGTH, IV_LENGTH + authTagLength);
    const ciphertext = combinedArray.slice(IV_LENGTH + authTagLength);
    const encrypted = new Uint8Array(ciphertext.length + authTag.length);
    encrypted.set(ciphertext, 0);
    encrypted.set(authTag, ciphertext.length);

    const decrypted = await crypto.subtle.decrypt(
        { name: ALGORITHM, iv, tagLength: TAG_LENGTH },
        sessionKey,
        encrypted
    );

    const json = new TextDecoder().decode(decrypted);
    return JSON.parse(json);
}

export function isKeyInitialized(): boolean {
    return sessionKey !== null;
}

export function clearSessionKey(): void {
    sessionKey = null;
    // sessionKeyRaw = null;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}
