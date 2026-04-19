type AnalysisPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
};

export const sendAnalysisData = async (payload: AnalysisPayload) => {
  try {
    console.log("📤 Sending analysis request:", payload);

    const response = await fetch("/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("📨 Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Server error:", errorText);
      throw new Error(`שגיאה בשרת: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log("✅ Analysis result:", result);
    return result;
  } catch (error) {
    console.error("❌ Error in sendAnalysisData:", error);
    throw error;
  }
};
