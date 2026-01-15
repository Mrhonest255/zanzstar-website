"use client";
import { motion } from "framer-motion";
import { Clock, Users, ArrowRight } from "lucide-react";
import { useState } from "react";

interface TourCardProps {
  title: string;
  image: string;
  price: string;
  duration: string;
  groupType: string;
  category: string;
  link: string;
}

const FALLBACK_IMAGE = "https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg?auto=compress&cs=tinysrgb&w=800";

export default function TourCard({ title, image, price, duration, groupType, category, link }: TourCardProps) {
  const [imgSrc, setImgSrc] = useState(image);
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="modern-card group h-full flex flex-col"
    >
      <div className="relative h-64 overflow-hidden bg-gray-100">
        {imgLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={imgSrc} 
          alt={title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imgLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setImgLoading(false)}
          onError={() => {
            setImgSrc(FALLBACK_IMAGE);
            setImgLoading(false);
          }}
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-primary">
          {category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-serif text-gray-800">{title}</h3>
          <span className="text-primary font-semibold font-serif text-lg">{price}</span>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-primary-light" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} className="text-primary-light" />
            {groupType}
          </div>
        </div>

        <a 
          href={link} 
          className="mt-auto flex items-center justify-between text-xs uppercase tracking-widest font-bold text-primary-light group-hover:text-primary transition-colors"
        >
          View Experience <ArrowRight size={16} />
        </a>
      </div>
    </motion.div>
  );
}
