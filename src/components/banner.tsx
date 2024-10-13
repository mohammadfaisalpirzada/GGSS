import Image from 'next/image'; // Import from next/image
import Link from 'next/link'; // Import Link from next/link

export default function Banner() {
  return (
    <div className="bg-blue-800 flex items-center justify-between p-4 h-20">
      {/* Clickable Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image 
            className='logo cursor-pointer' // Add cursor-pointer for better UX
            src="/images/logo.png" 
            alt="Logo"
            width={80} 
            height={80}
          />
        </Link>
      </div>

      {/* Responsive Welcome Message */}
      <h1 className="text-xl sm:text-2xl md:text-3xl text-white text-center flex-grow font-bold">
        G.G.S.S Nishtar Road Students Data Form!
      </h1>
    </div>
  );
}
