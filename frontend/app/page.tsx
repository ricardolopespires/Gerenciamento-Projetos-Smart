
import Hero from "@/compoments/home/Hero";
import  Navbar from "@/compoments/home/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero Section */}
        <Hero/>
            
      </main>
      {/* Footer */} 
    </>
  );
}
