
async function generateImage(prompt) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `prompt=${encodeURIComponent(prompt)}&size=small`,
    };

    const response = await fetch("https://dalle-api-3856df7c1545.herokuapp.com/openai/generateimage", options);
    const result = await response.json();

    if (response.ok) {
      return result.data;
    } else {
      throw new Error(result.error || "Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error.message || "An error occurred");
  }
}

export default generateImage;