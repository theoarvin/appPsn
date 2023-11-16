export interface AuthState {
  isAuthenticated: boolean;
  // Autres propriétés spécifiques à la tranche auth
}

export interface LoginPayload {
  username: string;
  password: string;
}
