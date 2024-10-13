// // components/Footer.js

export default function Footer() {
  return (
    <div className="bg-blue-800 text-white text-center py-4 md:py-6 mt-10">
      <p className="text-xs md:text-sm">
        &copy; 2024 Master Sahub. All rights reserved.
      </p>
      <p className="text-xs md:text-sm">
        Contact us at: 
        <a href="mailto:mohammadfaisalpirzada@gmail.com" className="underline hover:text-gray-300"> 
          mohammadfaisalpirzada@gmail.com
        </a> 
        | Phone: <span className="font-bold">03458340669</span>
      </p>
    </div>
  );
}
