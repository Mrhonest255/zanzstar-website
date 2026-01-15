"use client";
import { motion } from "framer-motion";
import { Clock, Users, ArrowRight, MapPin } from "lucide-react";
import { useState } from "react";

interface TourCardProps {
  title: string;
  image: string;
  price: string;
  duration: string;
  groupType: string;
  category: string;
  link: string;
  location?: string;
}

const FALLBACK_IMAGE = "https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg?auto=compress&cs=tinysrgb&w=800";

export default function TourCard({ title, image, price, duration, groupType, category, link, location }: TourCardProps) {
  const [imgSrc, setImgSrc] = useState(image);
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg group h-full flex flex-col border border-gray-100"
    >
      <div className="relative h-72 overflow-hidden bg-gray-100">
        {imgLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={imgSrc} 
          alt={title}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imgLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setImgLoading(false)}
          onError={() => {
            setImgSrc(FALLBACK_IMAGE);
            setImgLoading(false);
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold text-primary shadow-sm">
          {category}
        </div>
        
        {/* Price badge */}
        <div className="absolute top-4 right-4 bg-primary/95 backdrop-blur-md px-4 py-1.5 rounded-full text-white font-bold text-sm shadow-lg">
          {price}
        </div>
        
        {/* Quick view on hover */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <a 
            href={link}
            className="block w-full bg-white py-3 rounded-xl text-center text-xs uppercase tracking-widest font-bold text-primary hover:bg-primary hover:text-white transition-colors"
          >
            View Details
          </a>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">{title}</h3>
        
        {location && (
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
            <MapPin size={12} />
            <span>{location}</span>
          </div>
        )}
        
        <div className="flex items-center gap-6 text-xs text-gray-500 mb-6 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-mint flex items-center justify-center">
              <Clock size={12} className="text-primary" />
            </div>
            <span className="font-medium">{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-mint flex items-center justify-center">
              <Users size={12} className="text-primary" />
            </div>
            <span className="font-medium">{groupType}</span>
          </div>
        </div>

        <a 
          href={link} 
          className="flex items-center justify-between text-xs uppercase tracking-widest font-bold text-primary group-hover:text-primary-dark transition-colors pt-4 border-t border-gray-100"
        >
          <span>Explore Tour</span>
          <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}
