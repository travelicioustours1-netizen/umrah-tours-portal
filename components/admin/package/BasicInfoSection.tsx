"use client";

import React, { useMemo, useState } from "react";

interface Props {
  initialData?: any;
  airlines: {
    id: string;
    name: string;
  }[];
}

const REGION_DESTINATIONS: Record<string, string[]> = {
  CIS: [
    "Georgia",
    "Azerbaijan",
    "Kazakhstan",
    "Armenia",
    "Uzbekistan",
    "Kyrgyzstan",
  ],

  "Far East": [
    "Japan",
    "South Korea",
    "Thailand",
    "Malaysia",
    "Singapore",
    "Indonesia",
    "Vietnam",
    "Philippines",
    "Hong Kong",
    "China",
  ],

  Europe: [
    "Turkey",
    "France",
    "Italy",
    "Switzerland",
    "Germany",
    "Spain",
    "Greece",
    "Austria",
    "Netherlands",
    "United Kingdom",
    "Portugal",
  ],

  USA: [
    "New York",
    "California",
    "Los Angeles",
    "Las Vegas",
    "Orlando",
    "Miami",
    "San Francisco",
    "Washington DC",
    "Chicago",
  ],

  "Australia & New Zealand": [
    "Australia",
    "Sydney",
    "Melbourne",
    "Brisbane",
    "Gold Coast",
    "New Zealand",
    "Auckland",
    "Queenstown",
    "Christchurch",
  ],
};

export default function BasicInfoSection({
  initialData,
  airlines,
}: Props) {
  const initialCategory =
    initialData?.category ?? "";

  const initialRegion =
    initialData?.region ?? "";

  const initialDestination =
    initialData?.destination ?? "";

  const [category, setCategory] =
    useState<string>(initialCategory);

  const [region, setRegion] =
    useState<string>(initialRegion);

  const [destination, setDestination] =
    useState<string>(initialDestination);

  const availableDestinations = useMemo(() => {
    if (category !== "HOLIDAY") {
      return [];
    }

    return REGION_DESTINATIONS[region] ?? [];
  }, [category, region]);

  function handleCategoryChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const value = event.target.value;

    setCategory(value);

    if (value !== "HOLIDAY") {
      setRegion("");
      setDestination("");
    }
  }

  function handleRegionChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const value = event.target.value;

    setRegion(value);

    /*
     * Clear destination whenever region changes.
     *
     * This prevents an old destination such as
     * Georgia from remaining after switching to Europe.
     */
    setDestination("");
  }

  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* =====================================================
            PACKAGE TITLE
        ====================================================== */}

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
            Package Title
          </label>

          <input
            type="text"
            name="title"
            defaultValue={initialData?.title ?? ""}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>


        {/* =====================================================
            SLUG
        ====================================================== */}

        <div>
          <label className="mb-2 block font-medium">
            Slug
          </label>

          <input
            type="text"
            name="slug"
            defaultValue={initialData?.slug ?? ""}
            className="w-full rounded-lg border p-3"
            placeholder="dubai-holiday-package"
          />
        </div>


        {/* =====================================================
            DURATION
        ====================================================== */}

        <div>
          <label className="mb-2 block font-medium">
            Duration
          </label>

          <input
            type="text"
            name="duration"
            defaultValue={initialData?.duration ?? ""}
            className="w-full rounded-lg border p-3"
            placeholder="5 Days / 4 Nights"
            required
          />
        </div>


        {/* =====================================================
            CATEGORY
        ====================================================== */}

        <div>
          <label className="mb-2 block font-medium">
            Category
          </label>

          <select
            name="category"
            value={category}
            onChange={handleCategoryChange}
            className="w-full rounded-lg border p-3"
            required
          >
            <option value="">
              Select Category
            </option>

            <option value="UMRAH">
              Umrah
            </option>

            <option value="HOLIDAY">
              Holiday
            </option>

            <option value="VISA">
              Visa
            </option>

            <option value="HOTEL">
              Hotel
            </option>

            <option value="FLIGHT">
              Flight
            </option>
          </select>
        </div>


        {/* =====================================================
            HOLIDAY REGION
        ====================================================== */}

        <div>
          <label className="mb-2 block font-medium">
            Holiday Region
          </label>

          <select
            name="region"
            value={region}
            onChange={handleRegionChange}
            disabled={category !== "HOLIDAY"}
            className="w-full rounded-lg border p-3 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="">
              {category === "HOLIDAY"
                ? "Select Region"
                : "Not Applicable"}
            </option>

            <option value="CIS">
              CIS
            </option>

            <option value="Far East">
              Far East
            </option>

            <option value="Europe">
              Europe
            </option>

            <option value="USA">
              USA
            </option>

            <option value="Australia & New Zealand">
              Australia & New Zealand
            </option>
          </select>

          <p className="mt-1 text-sm text-gray-500">
            Select a region for holiday packages.
          </p>
        </div>


        {/* =====================================================
            DESTINATION
        ====================================================== */}

        <div>
          <label className="mb-2 block font-medium">
            Destination
          </label>

          <select
            name="destination"
            value={destination}
            onChange={(event) =>
              setDestination(event.target.value)
            }
            disabled={
              category !== "HOLIDAY" ||
              !region
            }
            className="w-full rounded-lg border p-3 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="">
              {category !== "HOLIDAY"
                ? "Not Applicable"
                : !region
                  ? "Select Region First"
                  : "Select Destination"}
            </option>

            {availableDestinations.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}

            {/*
             * Preserve an existing destination if it
             * is not yet present in the predefined list.
             *
             * This prevents an existing package from
             * losing its value when editing.
             */}
            {initialDestination &&
              category === "HOLIDAY" &&
              region &&
              !availableDestinations.includes(
                initialDestination
              ) && (
                <option value={initialDestination}>
                  {initialDestination}
                </option>
              )}
          </select>

          <p className="mt-1 text-sm text-gray-500">
            Destination options depend on the selected region.
          </p>
        </div>


        {/* =====================================================
            DEPARTURE CITY
        ====================================================== */}

        <div>
          <label className="mb-2 block font-medium">
            Departure City
          </label>

          <input
            type="text"
            name="departureCity"
            defaultValue={
              initialData?.departureCity ?? ""
            }
            className="w-full rounded-lg border p-3"
            placeholder="Dubai"
          />
        </div>


        {/* =====================================================
            AIRLINE
        ====================================================== */}

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
            Airline
          </label>

          <select
            name="airlineId"
            defaultValue={
              initialData?.airlineId ?? ""
            }
            className="w-full rounded-lg border p-3"
          >
            <option value="">
              Select Airline
            </option>

            {airlines.map((airline) => (
              <option
                key={airline.id}
                value={airline.id}
              >
                {airline.name}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
}