"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


interface HotelFormProps {
  hotel?: {
    id: string;
    name: string;
    city: string;
    category: string;
    distanceFromHaram?: string | null;
    address?: string | null;
    description?: string | null;
  };
}


export default function HotelForm({
  hotel
}: HotelFormProps) {


const router = useRouter();


const [loading,setLoading] = useState(false);


const [form,setForm] = useState({

name: hotel?.name || "",

city: hotel?.city || "",

category: hotel?.category || "",

distanceFromHaram:
hotel?.distanceFromHaram || "",

address:
hotel?.address || "",

description:
hotel?.description || "",

});



function handleChange(
e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
){

setForm({

...form,

[e.target.name]:e.target.value

});

}




async function handleSubmit(
e:React.FormEvent
){

e.preventDefault();

setLoading(true);


const url = hotel
? `/api/hotels/${hotel.id}`
: "/api/hotels";


const method = hotel
? "PUT"
: "POST";



const res = await fetch(url,{

method,

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(form)

});



if(res.ok){

router.push("/dashboard/hotels");

router.refresh();

}
else{

alert("Something went wrong");

}


setLoading(false);

}



return (

<form
onSubmit={handleSubmit}
className="space-y-5 bg-white p-6 rounded-xl shadow"
>


<div>

<label className="block mb-1 font-medium">
Hotel Name
</label>

<input

name="name"

value={form.name}

onChange={handleChange}

className="w-full border rounded-lg p-3"

placeholder="Swiss Makkah Hotel"

/>

</div>



<div>

<label className="block mb-1 font-medium">
City
</label>

<input

name="city"

value={form.city}

onChange={handleChange}

className="w-full border rounded-lg p-3"

placeholder="Makkah"

/>

</div>




<div>

<label className="block mb-1 font-medium">
Category
</label>

<input

name="category"

value={form.category}

onChange={handleChange}

className="w-full border rounded-lg p-3"

placeholder="5 Star"

/>

</div>




<div>

<label className="block mb-1 font-medium">
Distance From Haram
</label>

<input

name="distanceFromHaram"

value={form.distanceFromHaram}

onChange={handleChange}

className="w-full border rounded-lg p-3"

placeholder="200 meters"

/>

</div>




<div>

<label className="block mb-1 font-medium">
Address
</label>

<input

name="address"

value={form.address}

onChange={handleChange}

className="w-full border rounded-lg p-3"

/>

</div>




<div>

<label className="block mb-1 font-medium">
Description
</label>

<textarea

name="description"

value={form.description}

onChange={handleChange}

className="w-full border rounded-lg p-3"

rows={5}

/>

</div>




<button

disabled={loading}

className="bg-green-600 text-white px-6 py-3 rounded-lg"

>

{
loading
?
"Saving..."
:
hotel
?
"Update Hotel"
:
"Create Hotel"
}


</button>



</form>

)

}