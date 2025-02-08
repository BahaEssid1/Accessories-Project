// import Image from "next/image";
// import Hero from "./_components/Hero";
// import ProductItem from "./_components/ProductItem";
// import ProductSection from "./_components/ProductSection";


// export default function Home() {
//   return (
//     <div className="min-h-screen">
//       <div>
//         <Hero />
//         <ProductSection />
//       </div>
      
//     </div>
//   );
// }




// "use client"; // Add this to ensure the file is a client-side component

// import { useState, useEffect } from "react";
// import Hero from "./_components/Hero";
// import ProductSection from "./_components/ProductSection";

// export default function Home() {
//   const [isMounted, setIsMounted] = useState(false); // Track if component is mounted on client

//   useEffect(() => {
//     setIsMounted(true); // Set state to true once component is mounted
//   }, []);

//   if (!isMounted) {
//     return <div>Loading...</div>; // Optionally show a loading state until mounted
//   }

//   return (
//     <div className="min-h-screen">
//       <Hero />
//       <ProductSection />
//     </div>
//   );
// }




"use client"; // Ensure it's a client component

import Hero from "./_components/Hero";
import ProductSection from "./_components/ProductSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProductSection />
    </div>
  );
}
