type AnalysisPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
};

export const sendAnalysisData = async (data: AnalysisPayload) => {
  const payload = {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    ...(data.phone && { phone: data.phone }),
  };

  try {
    const response = await fetch("/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error response:", errorText);
      throw new Error(`שגיאה בשרת: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.warn("Response is not JSON, assuming success");
      return { success: true };
    }

    const text = await response.text();
    if (!text) {
      console.warn("Empty response body, assuming success");
      return { success: true };
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Error in sendAnalysisData:", error);
    throw error;
  }
};
