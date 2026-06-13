'use client';

import { useState } from 'react';
import { Controller, type Control } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FieldRequiredIndicator } from '@/components/ui/field-required-indicator';
import { cn } from '@/lib/utils';

type RegisterRole = 'NKT' | 'NTD';

type RegisterRoleSelectProps = {
  control: Control<{
    role: RegisterRole;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>;
  label: string;
  roleNKT: string;
  roleNTD: string;
  required: string;
  complete: boolean;
  completeLabel: string;
};

const roleItems = [
  { value: 'NKT' as const, labelKey: 'roleNKT' as const },
  { value: 'NTD' as const, labelKey: 'roleNTD' as const },
];

export function RegisterRoleSelect({
  control,
  label,
  roleNKT,
  roleNTD,
  required,
  complete,
  completeLabel,
}: RegisterRoleSelectProps) {
  const [open, setOpen] = useState(false);

  const labelsByValue = {
    NKT: roleNKT,
    NTD: roleNTD,
  };

  return (
    <Controller
      name="role"
      control={control}
      render={({ field }) => (
        <div className="gov-field">
          <label id="role-label" htmlFor="role" className="text-sm font-medium">
            {label}
            <FieldRequiredIndicator
              complete={complete}
              requiredLabel={required}
              completeLabel={completeLabel}
            />
          </label>
          <div className="gov-input-wrap">
            <Select
              open={open}
              onOpenChange={setOpen}
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value as RegisterRole);
                setOpen(false);
              }}
              items={[
                { value: 'NKT', label: roleNKT },
                { value: 'NTD', label: roleNTD },
              ]}
            >
              <SelectTrigger
                id="role"
                aria-required="true"
                aria-labelledby="role-label"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key !== 'Enter') {
                    return;
                  }

                  event.preventDefault();
                  event.stopPropagation();
                  setOpen(true);
                }}
                className={cn(
                  'gov-input h-12 min-h-12 w-full rounded-lg border border-input bg-background px-4 py-0 text-base',
                  'data-[size=default]:h-12 data-[size=sm]:h-12',
                  'outline-none focus-visible:border-[#0b0c0c] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-[#ffdd00] focus-visible:outline-offset-[3px] focus-visible:ring-0'
                )}
              >
                <SelectValue placeholder={roleNKT} />
              </SelectTrigger>
              <SelectContent
                side="bottom"
                align="start"
                sideOffset={4}
                alignItemWithTrigger={false}
                className="rounded-none border-2 border-[#0b0c0c] bg-white p-1 shadow-none ring-0"
              >
                {roleItems.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="cursor-pointer rounded-none px-4 py-3 text-base text-[#0b0c0c] data-highlighted:bg-[#ffdd00] data-highlighted:text-[#0b0c0c] focus-visible:bg-[#ffdd00] focus-visible:text-[#0b0c0c] focus-visible:outline-none"
                  >
                    {labelsByValue[item.value]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    />
  );
}
