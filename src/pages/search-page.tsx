import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { Icon } from "@/components/ui/icon";
import { LocationSearchInput } from "@/components/form/LocationSearchInput";
import { useWidgetStore } from "@/store";
import { APIProvider } from "@vis.gl/react-google-maps";
import { config } from "@/lib/config";
import { useSearchForm } from "@/features/search/useSearchForm";
import type { SelectedPlace } from "@/features/search/schema";
export default function SearchPage() {
  const { navigateWithParams } = useNavigateWithParams();
  const selectedPlace = useWidgetStore((s) => s.selectedPlaces);
  const setSelectedPlace = useWidgetStore((s) => s.setSelectedPlace);

  const handlePlaceSelect = (
    field: "startLocation" | "endLocation",
    place: SelectedPlace,
  ) => {
    setSelectedPlace(field, place);
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useSearchForm({
    startLocation: selectedPlace?.startLocation || {
      fullAddress: "",
      zip: "",
    },
    endLocation: selectedPlace?.endLocation || {
      fullAddress: "",
      zip: "",
    },
  });

  // Persist form values to store on every change
  // useEffect(() => {
  //   const subscription = watch((values) => {
  //     setSearch(values as LocationsFormData);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch, setSearch]);

  const onSubmit = async () => {
    try {
      navigateWithParams("/location");
    } catch (error) {
      console.error("Failed to submit locations:", error);
    }
  };

  return (
    <WidgetLayout onContinue={handleSubmit(onSubmit)}>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 sm:space-y-6">
          <p className="text-sm font-normal text-[#677890] mt-2 sm:mb-1">
            Book your move in minutes
          </p>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#2e343e]">
              Where do you need help?
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-3">
              <APIProvider apiKey={config.googlePlacesApiKey}>
                <LocationSearchInput
                  control={control}
                  name="startLocation.fullAddress"
                  label="Loading address"
                  id="startLocation"
                  placeholder="Zip code or street address"
                  error={errors.startLocation?.message}
                  onPlaceSelect={(place) =>
                    handlePlaceSelect("startLocation", place)
                  }
                />

                <LocationSearchInput
                  control={control}
                  name="endLocation.fullAddress"
                  label="Unloading address"
                  id="endLocation"
                  placeholder="Zip code or street address"
                  error={errors.endLocation?.message}
                  onPlaceSelect={(place) =>
                    handlePlaceSelect("endLocation", place)
                  }
                />
              </APIProvider>
            </div>

            <div className="rounded-2xl border border-[#2d6671] bg-[#f1faf9] px-3 py-4">
              <div className="flex items-center gap-3">
                <Icon
                  name="info"
                  size={20}
                  className="shrink-0 text-[#2d6671] mt-0.5"
                />
                <p className="text-sm font-normal leading-relaxed text-[#677890]">
                  If you only need help with loading or unloading, just enter
                  the relevant address. We&apos;ll match you with the right type
                  of movers.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F8F8F8] flex flex-col items-start sm:items-center sm:text-center p-6 rounded-2xl">
            <Icon name="advantage" size={64} aria-hidden="true" />
            <h3 className="font-bold text-xl whitespace-pre-line pt-3 ">
              {
                "Book with The Nation's Largest\nMarketplace of Professional Movers"
              }
            </h3>
            <p className="text-[#2E343E] text-sm pt-1">
              Every booking includes the MovingPlace Advantage
            </p>

            <span className="font-bold py-4">
              4.8 out of 5 on{" "}
              <Icon
                name="trustpilot"
                width={97.71}
                height={24}
                className=" mb-2 "
                aria-label="Trustpilot"
              ></Icon>
            </span>

            <div className="flex md:flex-row flex-col gap-4" role="list">
              <span>
                <Icon
                  name="shieldcheck"
                  size={20}
                  className="mb-1.5"
                  aria-hidden="true"
                />{" "}
                Fully vetted movers
              </span>
              <span>
                {" "}
                <Icon
                  name="star"
                  size={20}
                  className="mb-1.5"
                  aria-hidden="true"
                />{" "}
                334,000+ authentic reviews
              </span>
              <span>
                {" "}
                <Icon
                  name="tag"
                  size={20}
                  className="mb-1.5"
                  aria-hidden="true"
                />{" "}
                No hidden fees
              </span>
            </div>
          </div>
        </div>

        {/* <StickyFooter className=" self-end">
          <Button
            type="submit"
            variant="cta"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="h-12 self-end"
          >
            {isSubmitting ? "Loading..." : "Continue"}
          </Button>
        </StickyFooter> */}
      </div>
    </WidgetLayout>
  );
}
