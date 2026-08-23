import { prisma } from "@/lib/prisma";
import PackageForm from "@/components/admin/PackageForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPackagePage({
  params,
}: Props) {
  const { id } = await params;

  const [packageData, airlines, hotels] = await Promise.all([
    prisma.package.findUnique({
      where: { id },
      include: {
  airline: true,
  makkahHotel: true,
  madinahHotel: true,
  images: {
    orderBy: {
      sortOrder: "asc",
    },
  },
},
    }),

    prisma.airline.findMany({
      orderBy: {
        name: "asc",
      },
    }),

    prisma.hotel.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  if (!packageData) {
    return <div>Package not found.</div>;
  }

  const formData = {
  id: packageData.id,

  // Basic information
  title: packageData.title,
  slug: packageData.slug,
  duration: packageData.duration,
  category: packageData.category,
  departureCity: packageData.departureCity,

  // Package status
  status: packageData.status,

  // Airline / Hotels
  airlineId: packageData.airlineId,
  makkahHotelId: packageData.makkahHotelId,
  madinahHotelId: packageData.madinahHotelId,

  // Nights
  makkahNights: packageData.makkahNights,
  madinahNights: packageData.madinahNights,

  // Pricing
  price: packageData.price,

  // Content
  description: packageData.description,
  itinerary: packageData.itinerary,
  inclusions: packageData.inclusions,
  exclusions: packageData.exclusions,

  // Services
  visa: packageData.visa,
  transport: packageData.transport,
  meals: packageData.meals,
  featured: packageData.featured,

  // Media
  brochure: packageData.brochure,
  images: packageData.images,

  // SEO
  seoTitle: packageData.seoTitle,
  seoDescription: packageData.seoDescription,
  seoKeywords: packageData.seoKeywords,
};

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Package
      </h1>

      <PackageForm
        airlines={airlines}
        hotels={hotels}
        initialData={formData}
      />
    </div>
  );
}