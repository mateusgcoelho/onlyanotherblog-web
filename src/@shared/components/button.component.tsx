import { SpinnerComponent } from "./spinner.component";

type ButtonComponentProps = {
  isLoading?: boolean;
  children: React.ReactNode;
};

export function ButtonComponent({
  children,
  isLoading,
  ...rest
}: ButtonComponentProps) {
  let defaultCss =
    "flex mt-10 gap-x-2 items-center justify-center p-2 bg-purple-600 rounded-md text-sm";

  return (
    <button
      disabled={isLoading}
      {...rest}
      className={`${defaultCss} ${isLoading && "bg-purple-800"}`}
    >
      {isLoading && <SpinnerComponent />}
      {children}
    </button>
  );
}
