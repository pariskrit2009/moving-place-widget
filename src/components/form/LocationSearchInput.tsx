import { useState, useCallback } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { X, Loader2, MapPin } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import FieldError from "./FieldError";
import {
  usePlaceAutocomplete,
  usePlaceDetails,
  resetSessionToken,
} from "@/features/search";
import type { SelectedPlace } from "@/features/search";
import { useDebounce } from "@/hooks";
import { LabelStackedField } from "./LabelStackedField";
import { Input } from "../ui/input";

interface LocationSearchInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  id: string;
  placeholder?: string;
  error?: string;
  onPlaceSelect?: (place: SelectedPlace) => void;
}

export function LocationSearchInput<T extends FieldValues>({
  control,
  name,
  label,
  id,
  placeholder = "Zip code or street address",
  error,
  onPlaceSelect,
}: LocationSearchInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <LocationSearchInner
          field={field}
          id={id}
          label={label}
          placeholder={placeholder}
          error={error}
          onPlaceSelect={onPlaceSelect}
        />
      )}
    />
  );
}

interface LocationSearchInnerProps {
  field: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    ref: React.RefCallback<HTMLElement>;
  };
  id: string;
  label: string;
  placeholder: string;
  error?: string;
  onPlaceSelect?: (place: SelectedPlace) => void;
}

function LocationSearchInner({
  field,
  id,
  label,
  placeholder,
  error,
  onPlaceSelect,
}: LocationSearchInnerProps) {
  const [inputValue, setInputValue] = useState(field.value);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(inputValue, 300);
  const { suggestions, isLoading: isLoadingSuggestions } =
    usePlaceAutocomplete(debouncedQuery);
  const detailsMutation = usePlaceDetails();

  const handleSelect = useCallback(
    async (placeId: string, description: string) => {
      setInputValue(description);
      field.onChange(description);
      setIsOpen(false);

      try {
        const placeDetails = await detailsMutation.mutateAsync(placeId);
        onPlaceSelect?.(placeDetails);
      } catch (err) {
        console.error("Failed to fetch place details:", err);
      }
    },
    [field, detailsMutation, onPlaceSelect],
  );

  const handleClear = useCallback(() => {
    setInputValue("");
    field.onChange("");
    setIsOpen(false);
    resetSessionToken();
  }, [field]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      if (value !== field.value) {
        field.onChange(value);
      }
    },
    [field],
  );

  const isLoading = isLoadingSuggestions || detailsMutation.isPending;

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger className="w-full">
          <div className="relative w-full">
            <LabelStackedField label={label} id={id}>
              <Input
                id={id}
                value={inputValue}
                placeholder={placeholder}
                onChange={handleInputChange}
                autoComplete="off"
                onBlur={() => {
                  field.onBlur();
                }}
              />
            </LabelStackedField>
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-sm text-[#b1bbc8] hover:text-[#2e343e] focus:outline-none focus:ring-1 focus:ring-[#3799a3]"
                aria-label="Clear location"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-[var(--radix-popover-trigger-width)]"
          align="start"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <Command shouldFilter={false}>
            <CommandList>
              {isLoading ? (
                <div className="flex items-center justify-center py-6 text-sm text-[#677890]">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Searching...
                </div>
              ) : (
                <CommandEmpty>No locations found.</CommandEmpty>
              )}
              {suggestions.length > 0 && (
                <CommandGroup>
                  {suggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion.placeId}
                      value={suggestion.placeId}
                      onSelect={() =>
                        handleSelect(
                          suggestion.placeId,
                          suggestion.description,
                        )
                      }
                    >
                      <MapPin className="h-4 w-4 shrink-0 text-[#677890]" />
                      <div className="truncate">
                        <span className="block truncate">
                          {suggestion.mainText}
                        </span>
                        <span className="block truncate text-xs text-[#677890]">
                          {suggestion.secondaryText}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FieldError message={error} />
    </div>
  );
}
