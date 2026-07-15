import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export function GoogleLoginButton({ onDone }: { onDone?: () => void }) {
  const { googleLogin } = useAuth();

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={async (res) => {
          if (!res.credential) {
            toast.error("Google login failed — no credential returned");
            return;
          }
          try {
            await googleLogin(res.credential);
            onDone?.();
          } catch (err: any) {
            toast.error(err?.response?.data?.message ?? "Google login failed");
          }
        }}
        onError={() => toast.error("Google login failed")}
        theme="outline"
        shape="pill"
        width="320"
      />
    </div>
  );
}