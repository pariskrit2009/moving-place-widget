import { useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { X, MapPin } from "lucide-react";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import FieldError from "./FieldError";
import { useDebounce } from "@/hooks";
import { LabelStackedField } from "./LabelStackedField";
import { Input } from "../ui/input";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useAutocompleteSuggestions } from "@/hooks/useAutocompleteSuggestions";
import type { SelectedPlace } from "@/features/search/schema";

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
  // Google-Places-API
  const places = useMapsLibrary("places");
  // Google-Places-API
  const [inputValue, setInputValue] = useState(field.value);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(inputValue, 300);
  const { suggestions, resetSession } =
    useAutocompleteSuggestions(debouncedQuery);

  const handleClear = () => {
    setInputValue("");
    field.onChange("");
    setIsOpen(false);

    if (onPlaceSelect)
      onPlaceSelect({
        fullAddress: "",
        zip: "",
        street: "",
        street2: "",
        city: "",
        state: "",
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value !== field.value) {
      field.onChange(value);
    }
    if (value.trim().length > 0) setIsOpen(true);
  };

  const handleSuggestionClick = async (
    suggestion: google.maps.places.AutocompleteSuggestion,
  ) => {
    if (!places) return;
    if (!suggestion.placePrediction) return;

    const place = suggestion.placePrediction.toPlace();

    await place.fetchFields({
      fields: ["formattedAddress", "addressComponents"],
    });

    let streetNumber = "";
    let route = "";
    let city = "";
    let state = "";

    // Map through Google Components to pull exact sub-strings
    place.addressComponents?.forEach((component) => {
      const types = component.types;
      if (types?.includes("street_number")) {
        streetNumber = component.longText ?? "";
      }
      if (types?.includes("route")) {
        route = component.longText ?? "";
      }
      if (types?.includes("locality")) {
        city = component.longText ?? "";
      }
      if (types?.includes("administrative_area_level_1")) {
        state = component.shortText ?? ""; // Short notation like "OH" or "CA"
      }
    });

    const postalCode = place.addressComponents?.find((c) =>
      c.types?.includes("postal_code"),
    )?.longText;

    const fullAddress = place.formattedAddress ?? "";
    setInputValue(fullAddress);
    // calling fetchFields invalidates the session-token, so we now have to call
    // resetSession() so a new one gets created for further search
    resetSession();

    // Combine street number and route. If they picked just a ZIP code,
    // both variables will be empty, making combinedStreet equal "" automatically.
    const combinedStreet = streetNumber ? `${streetNumber} ${route}` : route;

    if (onPlaceSelect)
      onPlaceSelect({
        fullAddress,
        zip: postalCode ?? "",
        street: combinedStreet, // Will naturally be "" if it's a ZIP code selection
        street2: "",
        city,
        state,
      });

    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!isOpen) return;

    setIsOpen(open);
  };

  return (
    <div>
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverAnchor className="w-full">
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
                className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-sm text-[#b1bbc8] hover:text-[#2e343e] focus:outline-none focus:ring-1 focus:ring-[#3799a3]"
                aria-label="Clear location"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </PopoverAnchor>
        <PopoverContent
          className="p-0 w-[var(--radix-popover-trigger-width)]"
          align="start"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <Command shouldFilter={false}>
            <CommandList>
              {suggestions.length > 0 ? (
                <CommandGroup>
                  {suggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion.placePrediction?.placeId}
                      value={suggestion.placePrediction?.placeId}
                      onSelect={() => handleSuggestionClick(suggestion)}
                      className="cursor-pointer"
                    >
                      <MapPin className="h-4 w-4 shrink-0 text-[#677890]" />
                      <div className="truncate">
                        <span className="block truncate">
                          {suggestion.placePrediction?.text.text}
                        </span>
                        <span className="block truncate text-xs text-[#677890]">
                          {suggestion.placePrediction?.secondaryText?.text}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                <CommandEmpty>No locations found.</CommandEmpty>
              )}
              {}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FieldError message={error} />
    </div>
  );
}
