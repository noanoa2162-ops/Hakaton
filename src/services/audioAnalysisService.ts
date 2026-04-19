const BASE_URL = "https://5mdqfs-50004.csb.app";

export const uploadAudioFile = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    console.log("🚀 Uploading audio file to server:", file.name);
    const response = await fetch(`${BASE_URL}/analyze`, {
      method: "POST",
      body: formData,
      // Note: Don't set Content-Type header when sending FormData, 
      // the browser will set it automatically with the correct boundary
    });

    console.log("📨 Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Server error response:", errorText);
      throw new Error(`שגיאה בשרת: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return { success: true };
  } catch (error) {
    console.error("❌ Error in uploadAudioFile:", error);
    throw error;
  }
};
