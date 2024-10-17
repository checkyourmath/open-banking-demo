export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return (window as any).config?.apiBaseUrl;
  }

  if (!process.env.API_BASE_URL) {
    throw new Error('Missing API Base URL');
  }

  return process.env.API_BASE_URL;
}
