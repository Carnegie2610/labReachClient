'use client';

import { Check } from 'lucide-react';

interface CheckboxFieldProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}

export function CheckboxField({ id, label, checked, onChange }: CheckboxFieldProps) {
  return (
    <div className="flex items-center">
      <button
        type="button"
        id={id}
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors ${
          checked
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-border bg-transparent'
        }`}
      >
        {checked && <Check className="h-4 w-4" />}
      </button>
      <label htmlFor={id} className="ml-2 cursor-pointer select-none text-sm text-muted-foreground">
        {label}
      </label>
    </div>
  );
}