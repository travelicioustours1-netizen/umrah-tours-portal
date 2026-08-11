import Link from "next/link";
import { getAllBookings } from "@/lib/services/booking.service";


export default async function AdminBookingsPage() {


const bookings = await getAllBookings();


return (

<div className="p-6">


<h1 className="text-3xl font-bold mb-6">
Booking Management
</h1>


<div className="rounded-lg border overflow-x-auto">


<table className="w-full">


<thead>

<tr className="border-b bg-gray-50">


<th className="p-3 text-left">
Booking No
</th>


<th className="p-3 text-left">
Customer
</th>


<th className="p-3 text-left">
Package
</th>


<th className="p-3">
Guests
</th>


<th className="p-3">
Status
</th>


<th className="p-3">
Payment
</th>


<th className="p-3">
Action
</th>


</tr>

</thead>


<tbody>


{
bookings.map((booking)=>(

<tr
key={booking.id}
className="border-b"
>


<td className="p-3">

{booking.bookingNumber}

</td>


<td className="p-3">

{booking.customerName}

<br/>

<span className="text-sm text-gray-500">

{booking.email}

</span>

</td>


<td className="p-3">

{booking.package.title}

</td>


<td className="p-3 text-center">

{booking.adults}
+
{booking.children}
+
{booking.infants}

</td>


<td className="p-3 text-center">

{booking.status}

</td>


<td className="p-3 text-center">

{booking.paymentStatus}

</td>


<td className="p-3">


<Link

href={`/admin/bookings/${booking.id}`}

className="text-blue-600"

>

View

</Link>


</td>


</tr>

))

}


</tbody>


</table>


</div>


</div>

)

}