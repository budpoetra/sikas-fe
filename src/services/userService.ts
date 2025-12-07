export interface User {
  id: number;
  username: string;
  phone: string;
  email: string;
  fullName: string;
  status: number;
}

// Simulasi API call - ganti dengan API yang sebenarnya
// export const fetchUsers = async (): Promise<User[]> => {
//   try {
//     // Contoh dengan fetch API
//     const response = await fetch('https://api.example.com/users');
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const data = await response.json();
//     return data;
    
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw error;
//   }
// };


// Jika menggunakan axios (install terlebih dahulu: npm install axios)
import axios from 'axios';

const API_BASE_URL = 'https://api.example.com';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
