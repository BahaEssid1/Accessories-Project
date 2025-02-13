// export const registerUser = async (userData: {
//   username: string;
//   phone: string;
//   email: string;
//   password: string;
// }) => {
//   try {
//     console.log('Sending registration request with data:', userData);
    
//     const response = await fetch("http://localhost:3000/api/auth/register", {
//       method: "POST",
//       headers: { 
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(userData),
//     });

//     console.log('Response status:', response.status);
//     const contentType = response.headers.get("content-type");
//     console.log('Content-Type:', contentType);

//     let responseData;
//     try {
//       responseData = await response.json();
//     } catch (e) {
//       const textResponse = await response.text();
//       console.error('Failed to parse JSON response:', textResponse);
//       throw new Error('Invalid server response');
//     }

//     if (!response.ok) {
//       throw new Error(responseData.message || 'Registration failed');
//     }

//     return responseData;
//   } catch (error) {
//     console.error("Registration error:", error);
//     throw error;
//   }
// };

// export const loginUser = async (userData: { email: string; password: string }) => {
//   try {
//     const response = await fetch("http://localhost:3000/api/auth/login", {
//       method: "POST",
//       headers: { 
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(userData),
//     });

//     const responseData = await response.json();

//     if (!response.ok) {
//       throw new Error(responseData.message || 'Login failed');
//     }

//     if (!responseData.token) {
//       throw new Error('No token received');
//     }

//     return responseData;
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// };



export const registerUser = async (userData: {
  username: string;
  phone: string;
  email: string;
  password: string;
}) => {
  try {
    console.log('Sending registration request with data:', userData);
    
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData),
    });

    console.log('Response status:', response.status);
    const contentType = response.headers.get("content-type");
    console.log('Content-Type:', contentType);

    let responseData;
    try {
      responseData = await response.json();
    } catch (e) {
      const textResponse = await response.text();
      console.error('Failed to parse JSON response:', textResponse);
      throw new Error('Invalid server response');
    }

    if (!response.ok) {
      throw new Error(responseData.message || 'Registration failed');
    }

    return responseData;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (userData: { email: string; password: string }) => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Login failed');
    }

    if (!responseData.token) {
      throw new Error('No token received');
    }

    // Return both token and user data
    return responseData;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
