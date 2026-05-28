import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { Icon } from "@/components/ui/icon";
import { LocationSearchInput } from "@/components/form/LocationSearchInput";
import { useWidgetStore } from "@/store";
import { APIProvider } from "@vis.gl/react-google-maps";
import { config } from "@/lib/config";
import { useSearchForm } from "@/features/search/useSearchForm";
import type { SelectedPlace } from "@/features/search/schema";
import { ReviewCard } from "@/features/search/components/ReviewCard";
import { AnimatePresence, motion } from "framer-motion";
import type { ReviewItem } from "@/features/search/types";
import { useState } from "react";
import { Pagination } from "@/components/ui/pagination";

export default function SearchPage() {
  const { navigateWithParams } = useNavigateWithParams();
  const selectedPlace = useWidgetStore((s) => s.selectedPlaces);
  const setSelectedPlace = useWidgetStore((s) => s.setSelectedPlace);
  const setMovingDate = useWidgetStore((s) => s.setMovingDateData);
  const setLocations = useWidgetStore((s) => s.setLocations);

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePlaceSelect = (
    field: "startLocation" | "endLocation",
    place: SelectedPlace,
  ) => {
    setSelectedPlace(field, place);
  };

  const mockReviews: ReviewItem[] = [
    {
      id: "1",
      name: "John Doe",
      description:
        "Excellent service and very professional team. Everything was handled smoothly from start to finish. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam perferendis, quaerat eveniet fugiat modi accusamus consectetur, quis, unde placeat nostrum tempore cumque praesentium! Ullam magnam dolorem tenetur voluptas sequi odit. Quam perferendis, quaerat eveniet fugiat modi accusamus consectetur, quis, unde placeat nostrum tempore cumque praesentium! Ullam magnam dolorem tenetur voluptas sequi odit. Quam perferendis, quaerat eveniet fugiat modi accusamus consectetur, quis, unde placeat nostrum tempore cumque praesentium! Ullam magnam dolorem tenetur voluptas sequi odit. Quam perferendis, quaerat eveniet fugiat modi accusamus consectetur, quis, unde placeat nostrum tempore cumque praesentium! Ullam magnam dolorem tenetur voluptas sequi odit.",
      rating: 5,
      status: true,
    },
    {
      id: "2",
      name: "Sarah Williams",
      description:
        "Good experience overall, but there was a slight delay during delivery  Quam perferendis, quaerat eveniet fugiat modi accusamus consectetur, quis, unde placeat nostrum tempore cumque praesentium! Ullam magnam dolorem tenetur voluptas sequi odit..",
      rating: 4,
      status: true,
    },
    {
      id: "3",
      name: "Michael Brown",
      description:
        "Average experience. Communication could have been better. Quam perferendis, quaerat eveniet fugiat modi accusamus consectetur, quis, unde placeat nostrum tempore cumque praesentium! Ullam magnam dolorem tenetur voluptas sequi odit.",
      rating: 3,
      status: false,
    },
    {
      id: "4",
      name: "Emily Johnson",
      description:
        "Very satisfied with the quality of service and customer support. Quam perferendis, quaerat eveniet fugiat modi accusamus consectetur, quis, unde placeat nostrum tempore cumque praesentium! Ullam magnam dolorem tenetur voluptas sequi odit.",
      rating: 5,
      status: true,
    },
    {
      id: "5",
      name: "David Wilson",
      description:
        "Not happy with the packaging. Some items arrived damaged. Quam perferendis, quaerat eveniet fugiat modi accusamus consectetur, quis, unde placeat nostrum tempore cumque praesentium! Ullam magnam dolorem tenetur voluptas sequi odit.",
      rating: 2,
      status: false,
    },
  ];

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
      if (!selectedPlace?.startLocation?.fullAddress.trim())
        setLocations({
          loadingPropertyType: undefined,
          loadingDetails: undefined,
        });
      console.log(selectedPlace, "selectedPlace");
      if (!selectedPlace?.endLocation?.fullAddress.trim())
        setLocations({
          unloadingPropertyType: undefined,
          unloadingDetails: undefined,
        });
      setMovingDate({ hasDifferentDates: false, movingDate: "" });
      navigateWithParams("/location");
    } catch (error) {
      console.error("Failed to submit locations:", error);
    }
  };

  const nextReview = () => {
    setActiveIndex((prev) => Math.min(prev + 1, mockReviews.length - 1));
  };

  const prevReview = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <WidgetLayout onContinue={handleSubmit(onSubmit)}>
      <div className="flex flex-col sm:pt-4">
        {/* header section */}
        <div>
          <span className="pb-1">
            Powered By
            <Icon
              name="moving-place-logo"
              width={105.59}
              height={20}
              className="pl-[8.55px]"
              aria-hidden="true"
            />
          </span>
          <h2 className="text-2xl leading-8 py-0.5 sm:py-1">
            Need help with your move?
          </h2>
          <p>
            Tell us where you're moving and we'll match you with the right
            movers.
          </p>
        </div>

        {/* input section */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:pt-3 pt-2 my-4">
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
              onPlaceSelect={(place) => handlePlaceSelect("endLocation", place)}
            />
          </APIProvider>
        </div>

        {/* info section */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50 px-3 py-4">
          <div className="flex items-center gap-3">
            <Icon
              name="info"
              size={20}
              className="shrink-0 text-blue-500 mt-0.5"
            />
            <p className="text-sm font-normal leading-relaxed text-gray-500">
              If you only need help with loading or unloading, just enter the
              relevant address. We&apos;ll match you with the right type of
              movers.
            </p>
          </div>
        </div>
      </div>

      {/* review */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-wrap gap-1 justify-between">
          <div className="flex flex-col sm:gap-1">
            <h2 className="font-semibold text-base leading-5.5 sm:text-[18px]">
              Why move with us
            </h2>
            <p className="text-sm sm:text-base leading-[150%]">
              Real experiences from verified bookings
            </p>
          </div>
          <div className="bg-teal-50 border h-fit w-fit border-teal-600 pl-3 pr-2 rounded-2xl">
            <span className="text-center">4.8 out of 5 on</span>
            <span>
              <Icon
                name="trustpilot"
                className="mb-1 sm:mb-[7px] sm:w-[97.7px] sm:h-[27px] h-4 w-[65.14px]"
                aria-label="Trustpilot"
              ></Icon>
            </span>
          </div>
        </div>
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4"
            >
              <div className="w-[75%] shrink-0">
                <ReviewCard review={mockReviews[activeIndex]} />
              </div>

              {mockReviews[activeIndex + 1] && (
                <div className="w-[20%] shrink-0">
                  <ReviewCard
                    review={mockReviews[activeIndex + 1]}
                    className="min-w-[645px] !h-full md:whitespace-nowrap [&_button]:pointer-events-none [&_button]:opacity-40"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <Pagination
          data={mockReviews}
          activeIndex={activeIndex}
          onPageChange={setActiveIndex}
          onNext={nextReview}
          onPrev={prevReview}
        />
        <p className="text-center">
          Only five steps. Takes less than 2 minutes
        </p>
      </div>
    </WidgetLayout>
  );
}
