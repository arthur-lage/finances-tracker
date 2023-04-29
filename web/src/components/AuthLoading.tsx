import { Loading } from "./Loading";

export function AuthLoading() {
  return (
    <div className="auth-loading-wrapper">
      <div className="auth-loading-box">
        <Loading />
      </div>
    </div>
  );
}
