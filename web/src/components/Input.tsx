import { HTMLAttributes } from "react";

export function Input({ ...rest }: HTMLAttributes<HTMLInputElement>) {
  return <input {...rest} />;
}
