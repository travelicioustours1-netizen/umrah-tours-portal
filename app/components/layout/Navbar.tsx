export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <h1 className="text-3xl font-bold text-emerald-700">
          Umrah Tours
        </h1>

        <ul className="flex gap-8 font-medium">
          <li>Home</li>
          <li>Packages</li>
          <li>Destinations</li>
          <li>Services</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

        <button className="rounded-lg bg-emerald-600 px-5 py-2 text-white">
          Book Now
        </button>
      </div>
    </nav>
  );
}