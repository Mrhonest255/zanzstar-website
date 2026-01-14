"use client";
import { motion } from "framer-motion";
import { Clock, Users, ArrowRight } from "lucide-react";

interface TourCardProps {
  title: string;
  image: string;
  price: string;
  duration: string;
  groupType: string;
  category: string;
  link: string;
}

export default function TourCard({ title, image, price, duration, groupType, category, link }: TourCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="modern-card group h-full flex flex-col"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
