
export const registerUser = async (userData: {
  username: string;
  phone: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      return data;
    } else {
      const errorText = await response.text();
      throw new Error(`Unexpected response format: ${errorText}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      // Additional logging for debugging
      console.error("Error during registration:", error.message);
      throw new Error(error.message || "Registration failed");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const loginUser = async (userData: { email: string; password: string }) => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // If login is successful, ensure to return the token or user data
      if (data.token) {
        return data; // Return the token or any other data you need
      } else {
        throw new Error("No token received");
      }
    } else {
      const errorText = await response.text();
      throw new Error(`Unexpected response format: ${errorText}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during login:", error.message);
      throw new Error(error.message || "Login failed");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
