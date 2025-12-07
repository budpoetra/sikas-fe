import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const useSignOut = () => {
    
  const { logout } = useAuth();
  const navigate = useNavigate();

  const signOut = () => {
    try {
      // Panggil fungsi logout dari context
      logout();
      
      // Navigasi ke halaman signin
      navigate('/signin', { replace: true });
      
      // Optional: Force reload untuk membersihkan state aplikasi sepenuhnya
      // window.location.reload();
      
      return { success: true };
    } catch (error) {
      console.error('Error during sign out:', error);
      return { success: false, error };
    }
  };

  return { signOut };
};