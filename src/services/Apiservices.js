export const fetchData = async (
  url,
  method = "GET",
  data = null,
  headers = {}
) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...(data ? { body: JSON.stringify(data) } : {}),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error.message);
    return { error: error.message };
  }
};
