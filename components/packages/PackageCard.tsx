import Image from "next/image";
import Link from "next/link";


interface PackageCardProps {

  title: string;
  duration: string;
  price: string;
  image: string;
  popular?: boolean;

}



export default function PackageCard({
  title,
  duration,
  price,
  image,
  popular,
}: PackageCardProps) {


  return (

    <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">


      {popular && (

        <div className="absolute right-4 top-4 z-10 rounded-full bg-yellow-500 px-4 py-2 text-sm font-bold text-white">

          Most Popular

        </div>

      )}




      <div className="relative h-64">


        <Image

          src={image}
          alt={title}
          fill
          sizes="(max-width:768px)100vw,33vw"
          className="object-cover"

        />


      </div>





      <div className="p-7">



        <h3 className="text-2xl font-bold text-gray-800">

          {title}

        </h3>




        <div className="mt-5 space-y-3 text-gray-600">


          <p>
            📅 {duration}
          </p>


          <p>
            🛂 Visa Assistance Included
          </p>


          <p>
            🏨 Hotel Accommodation
          </p>


          <p>
            🚐 Transport Available
          </p>


        </div>





        <div className="mt-6 flex items-center justify-between">


          <div>

            <p className="text-sm text-gray-500">
              Starting From
            </p>


            <p className="text-3xl font-bold text-emerald-700">

              {price}

            </p>


          </div>


        </div>





        <Link

          href="/contact"

          className="mt-7 block rounded-xl bg-emerald-600 px-5 py-4 text-center font-semibold text-white transition hover:bg-emerald-700"

        >

          Book This Package

        </Link>



      </div>



    </div>

  );

}