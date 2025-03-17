const API_URL = "http://10.0.2.2:5000"; // For Android Emulator


export const registerUser = async (name: string,email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name,email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    return await response.json(); // Return response JSON
  } catch (error) {
    console.error("Registration error:", error);
    return null;
  }
};
