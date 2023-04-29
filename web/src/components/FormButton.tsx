import { HTMLProps } from "react";
import { Loading } from "./Loading";

interface FormButtonType extends HTMLProps<HTMLButtonElement> {
  title?: string;
  isLoading?: boolean;
}

export function FormButton({
  title,
  isLoading = false,
  ...rest
}: FormButtonType) {
  return (
    <button
      {...rest}
      disabled={isLoading}
      className="w-full border-white mt-[60px] shadow-md text-white tracking-wide bg-action-primary text-xl border-2 hover:scale-[1.025] outline-none font-jost font-bold h-[55px] hover:brightness-110 transition-all duration-150 ease-out rounded-[8px]"
      type="submit"
    >
      {isLoading ? <Loading /> : <span>{title}</span>}
    </button>
  );
}
