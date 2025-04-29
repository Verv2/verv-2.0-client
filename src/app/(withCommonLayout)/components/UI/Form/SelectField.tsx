import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ISelectFieldProps } from "@/types";
import { Controller, FieldValues } from "react-hook-form";
import { useEffect, useRef } from "react";

const SelectField = <T extends FieldValues>({
  className,
  registerName,
  label,
  control,
  errors,
  options,
}: ISelectFieldProps<T>) => {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errors?.[registerName]) {
      fieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [errors, registerName]);

  return (
    <div className={className} ref={fieldRef}>
      {label && <Label htmlFor={registerName}>{label}</Label>}
      <Controller
        name={registerName}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="flex w-full items-center self-stretch px-3 py-1.5 rounded-md border border-gray-400 bg-white">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {options.map((group, index) => (
                <SelectGroup key={index}>
                  <SelectLabel>{group.label}</SelectLabel>
                  {group.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {errors?.[registerName] && (
        <p className="text-red-500 mt-1">
          {(errors[registerName] as { message?: string })?.message}
        </p>
      )}
    </div>
  );
};

export default SelectField;
