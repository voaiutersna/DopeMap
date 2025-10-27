import { jwtDecode } from "jwt-decode";
type Token = {
    exp : number;
    sub : string;
}
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<Token>(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch {
    return true;
  }
}

export function checkExpired(token: string){
    if (!token) return;
    if (isTokenExpired(token)) {
        localStorage.removeItem("token");
        window.location.href = "/signin?error=token-expired";
    }
}