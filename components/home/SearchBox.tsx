import Link from "next/link";


export default function SearchBox() {

  return (

    <section className="relative -mt-20 mb-20"> 


      <div className="mx-auto max-w-6xl px-6">


        <div className="rounded-3xl bg-white p-8 shadow-2xl">


          <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">

            Find Your Perfect Journey

          </h2>




          <div className="grid gap-5 md:grid-cols-4">



            {/* Travel Type */}

            <select
              className="rounded-xl border px-5 py-4 text-gray-700 outline-none focus:border-emerald-600"
            >

              <option>
                Select Package
              </option>

              <option>
                Umrah Package
              </option>

              <option>
                Holiday Package
              </option>

              <option>
                Visa Service
              </option>

            </select>





            {/* Destination */}

            <select
              className="rounded-xl border px-5 py-4 text-gray-700 outline-none focus:border-emerald-600"
            >

              <option>
                Destination
              </option>

              <option>
                Makkah
              </option>

              <option>
                Madinah
              </option>

              <option>
                Dubai
              </option>

              <option>
                Turkey
              </option>

            </select>





            {/* Date */}

            <input
              type="date"
              className="rounded-xl border px-5 py-4 text-gray-700 outline-none focus:border-emerald-600"
            />





            {/* Button */}

            <Link
              href="/contact"
              className="flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-4 font-semibold text-white transition hover:bg-emerald-700"
            >

              Search Now

            </Link>



          </div>



        </div>


      </div>


    </section>

  );

}