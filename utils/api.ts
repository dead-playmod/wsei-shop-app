export async function api<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}${url}`,
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await (response.json() as Promise<T>);
  } catch (error) {
    console.error('API request error:', error);

    throw error;
  }
}
