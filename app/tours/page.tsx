"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TourCard from "@/components/TourCard";
import { tours, getCategories, getSafariTours, getPackageTours, getSingleTours } from "@/lib/tours";
import { useState } from "react";

export default function ToursPage() {
  const [filter, setFilter] = useState("All");
  const [tourType, setTourType] = useState("all");
  
  const categories = getCategories();
  
  // Filter by tour type first
  let filteredByType = tours;
  if (tourType === "single") {
    filteredByType = getSingleTours();
  } else if (tourType === "package") {
    filteredByType = getPackageTours();
  } else if (tourType === "safari") {
    filteredByType = getSafariTours();
  }
  
  // Then filter by category
  const filteredTours = filter === "All" 
    ? filteredByType 
    : filteredByType.filter(t => t.category === filter);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-40 pb-20 bg-mint">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-4">Discover</p>
          <h1 className="text-4xl md:text-7xl font-serif text-primary mb-6">Boundless Adventures</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light italic text-[15px] leading-relaxed">
            From the historic streets of Stone Town to the untamed wilderness of the Serengeti, discover the best of East Africa with our curated experiences.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 border-b border-gray-100 sticky top-20 bg-white z-40 shadow-sm">
        <div className="container mx-auto px-6">
          {/* Tour Type Tabs */}
          <div className="flex justify-center items-center gap-4 mb-8">
            {[
              { key: "all", label: "All Tours" },
              { key: "single", label: "Single Tours" },
              { key: "package", label: "Package Tours" },
              { key: "safari", label: "Safari Tours" }
            ].map((type) => (
              <button
                key={type.key}
                onClick={() => { setTourType(type.key); setFilter("All"); }}
                className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${
                  tourType === type.key 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
          
          {/* Category Filter */}
          <div className="overflow-x-auto">
            <div className="flex justify-center items-center gap-8 min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all pb-2 border-b-2 ${
                    filter === cat 
                      ? "text-primary border-primary" 
                      : "text-gray-400 border-transparent hover:text-gray-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          {/* Results count */}
          <div className="mb-10 text-center">
            <p className="text-gray-500 text-sm">
              Showing <span className="font-bold text-primary">{filteredTours.length}</span> {filteredTours.length === 1 ? 'tour' : 'tours'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredTours.map((tour, index) => (
              <TourCard 
                key={index} 
                title={tour.title}
                image={tour.image}
                price={tour.price}
                duration={tour.duration}
                groupType={tour.groupType}
                category={tour.category}
                location={tour.location}
                link={`/${tour.slug}`} 
              />
            ))}
          </div>
          
          {filteredTours.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 italic">No experiences found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

