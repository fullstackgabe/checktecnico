import * as FileSystem from 'expo-file-system';

export const onlyDigits = (s) => String(s || '').replace(/\D+/g, '');

export const formatPhoneBR = (s) => {
  const d = onlyDigits(s);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7, 11)}`;
};

export const isValidEmail = (s) => {
  if (!s) return false;
  const e = s.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
};

export const toTitleCase = (s) => {
  if (!s) return '';
  return String(s)
    .split(/\s+/)
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
    .join(' ');
};

export const sanitizeNameInput = (s) => String(s || '').replace(/[^A-Za-zÀ-ÿ\s'\-]/g, '');

export const isUuid = (s) => {
  const v = (s || '').trim();
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
};

export const getMimeFromUri = (uri) => {
  if (!uri) return 'image/jpeg';
  const lower = String(uri).toLowerCase();
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
  return 'image/jpeg';
};

export const toBase64 = async (uri) => {
  if (!uri) return null;
  try {
    const b64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    const mime = getMimeFromUri(uri);
    return `data:${mime};base64,${b64}`;
  } catch {
    return null;
  }
};

export const dataOrRead = async (dataUri, uri) => {
  if (dataUri) return dataUri;
  if (uri && /^https?:\/\//.test(uri)) return uri;
  return await toBase64(uri);
};