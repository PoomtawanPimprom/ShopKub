import { cn } from "@/lib/utils";

type submitButton = {
  disabled: boolean;
  label: string;
  labelUploading: string;
  classnameButton?: string;
};

export default function SubmitButtton({
  label,
  labelUploading,
  disabled,
  classnameButton,
}: submitButton) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={cn(
        `${
          disabled ?? "bg-green-main/50"
        } rounded-xl bg-green-main py-2 px-6 font-bold text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`,
        classnameButton
      )}
    >
      {disabled ? labelUploading : label}
    </button>
  );
}
