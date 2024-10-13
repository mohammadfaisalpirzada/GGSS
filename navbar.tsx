import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-red-500 flex items-center justify-between p-4 shadow-md h-7 ">
      {/* Website Name (Visible only on larger screens) */}
      <div className="hidden md:block text-white text-sm font-bold italic hover:text-gray-300 transition duration-300">
        <Link href="/" >@Master Sahub</Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-4 text-xs md:text-sm flex-grow justify-center md:justify-end">
        <li>
          <Link href="/" className="text-white hover:text-gray-300 transition duration-300 font-bold">
            HOME
          </Link>
        </li>
        <li>
          <Link href="/about-us" className="text-white hover:text-gray-300 transition duration-300 font-bold">
            ABOUT US
          </Link>
        </li>
        <li>
          <Link href="/contact-us" className="text-white hover:text-gray-300 transition duration-300 font-bold">
            CONTACT US
          </Link>
        </li>
        <li>
          <Link href="/jobs" className="text-white hover:text-gray-300 transition duration-300 font-bold">
            JOBS
          </Link>
        </li>
      </ul>
    </div>
  );
}
