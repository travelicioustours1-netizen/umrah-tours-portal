"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface PackageFiltersProps {
  filters: {
    airlines: {
      id: string;
      name: string;
    }[];
    cities: string[];
    categories: string[];
  };
}

export default function PackageFilters({
  filters,
}: PackageFiltersProps) {

  const router = useRouter();

  const searchParams = useSearchParams();


  const [search, setSearch] = useState(
    searchParams.get("search") ?? ""
  );


  function updateQuery(
    key: string,
    value: string
  ) {

    const query = new URLSearchParams(
      searchParams.toString()
    );


    if (value) {
      query.set(key, value);
    } else {
      query.delete(key);
    }


    query.delete("page");


    router.push(
      `/umrah?${query.toString()}`
    );
  }



  function submitSearch() {

    updateQuery(
      "search",
      search
    );

  }



  function resetFilters() {

    router.push("/umrah");

  }



  return (

    <div className="rounded-2xl bg-white p-6 shadow-sm">


      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">



        {/* SEARCH */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3.5 text-gray-400"
          />


          <input

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }

            onKeyDown={(e) =>
              e.key === "Enter" &&
              submitSearch()
            }

            placeholder="Search packages..."

            className="w-full rounded-xl border py-3 pl-10 pr-4"

          />

        </div>




        {/* AIRLINE */}

        <select

          value={
            searchParams.get("airline") ?? ""
          }

          onChange={(e) =>
            updateQuery(
              "airline",
              e.target.value
            )
          }

          className="rounded-xl border px-4 py-3"

        >

          <option value="">
            All Airlines
          </option>


          {filters.airlines.map(
            (airline) => (

              <option
                key={airline.id}
                value={airline.id}
              >
                {airline.name}
              </option>

            )
          )}

        </select>




        {/* DEPARTURE CITY */}

        <select

          value={
            searchParams.get("departureCity") ?? ""
          }

          onChange={(e) =>
            updateQuery(
              "departureCity",
              e.target.value
            )
          }

          className="rounded-xl border px-4 py-3"

        >

          <option value="">
            Departure City
          </option>


          {filters.cities.map(
            (city) => (

              <option
                key={city}
                value={city}
              >
                {city}
              </option>

            )
          )}

        </select>




        {/* CATEGORY */}

        <select

          value={
            searchParams.get("category") ?? ""
          }

          onChange={(e) =>
            updateQuery(
              "category",
              e.target.value
            )
          }

          className="rounded-xl border px-4 py-3"

        >

          <option value="">
            All Categories
          </option>


          {filters.categories.map(
            (category) => (

              <option
                key={category}
                value={category}
              >
                {category}
              </option>

            )
          )}

        </select>


      </div>




      <div className="mt-4 grid gap-4 md:grid-cols-2">



        {/* FEATURED */}

        <select

          value={
            searchParams.get("featured") ?? ""
          }

          onChange={(e) =>
            updateQuery(
              "featured",
              e.target.value
            )
          }

          className="rounded-xl border px-4 py-3"

        >

          <option value="">
            All Packages
          </option>

          <option value="true">
            Featured Only
          </option>


        </select>




        {/* SORT */}

        <select

          value={
            searchParams.get("sort") ?? "departure"
          }

          onChange={(e) =>
            updateQuery(
              "sort",
              e.target.value
            )
          }

          className="rounded-xl border px-4 py-3"

        >

          <option value="departure">
            Departure Date
          </option>

          <option value="price-low">
            Price Low → High
          </option>

          <option value="price-high">
            Price High → Low
          </option>

          <option value="newest">
            Newest
          </option>


        </select>


      </div>




      <div className="mt-5 flex gap-3">


        <button

          onClick={submitSearch}

          className="rounded-xl bg-emerald-600 px-6 py-3 text-white"

        >
          Search
        </button>



        <button

          onClick={resetFilters}

          className="rounded-xl border px-6 py-3"

        >
          Reset Filters
        </button>


      </div>


    </div>

  );
}