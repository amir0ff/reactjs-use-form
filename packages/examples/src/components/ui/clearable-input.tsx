import * as React from 'react';
import { X } from 'lucide-react';
import { Input } from './input';
import { cn } from '../../lib/utils';

export interface ClearableInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear: () => void;
  clearLabel?: string;
}

const ClearableInput = React.forwardRef<HTMLInputElement, ClearableInputProps>(
  ({ className, value, onClear, clearLabel = 'Clear field', ...props }, ref) => {
    const hasValue = String(value ?? '').length > 0;

    return (
      <div className="group relative mt-2">
        <Input
          ref={ref}
          value={value}
          className={cn('pr-9', className)}
          {...props}
        />
        {hasValue && (
          <button
            type="button"
            tabIndex={-1}
            aria-label={clearLabel}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onClear}
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-0.5',
              'text-muted-foreground transition-opacity hover:text-foreground',
              'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100',
              'focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            )}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  },
);
ClearableInput.displayName = 'ClearableInput';

export { ClearableInput };
