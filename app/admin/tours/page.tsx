"use client";
import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Eye, MoreVertical, Filter, ChevronLeft, ChevronRight, Star, MapPin, Clock } from "lucide-react";
import TourForm from "@/components/admin/TourForm";
import { Tour, TourInsert, TourCategory } from "@/lib/supabase/types";
import { tours as toursData } from "@/lib/tours";

// Transform tours from lib/tours.ts to match admin Tour type
const transformedTours: Tour[] = toursData.map((t, idx) => ({
  id: String(idx + 1),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  slug: t.slug,
  title: t.title,
  description: t.description,
  image: t.image,
  header_image: t.headerImage,
  price: parseInt(t.price.replace(/[^0-9]/g, '')) || 0,
  price_display: t.price,
  duration: t.duration,
  group_type: t.groupType,
  group_size: t.groupSize,
  location: t.location,
  category: t.category as TourCategory,
  is_safari: t.isSafari || false,
  is_featured: idx < 6, // First 6 are featured
  is_active: true,
  itinerary: t.itinerary,
  inclusions: t.inclusions,
  exclusions: t.exclusions,
}));

const categories: TourCategory[] = ['Culture', 'Nature', 'Adventure', 'Wildlife', 'Beach', 'Safari', 'Luxury'];

export default function AdminToursPage() {
  const [tours, setTours] = useState<Tour[]>(transformedTours);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Filter tours
  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || tour.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && tour.is_active) ||
                         (statusFilter === 'inactive' && !tour.is_active) ||
                         (statusFilter === 'featured' && tour.is_featured) ||
                         (statusFilter === 'safari' && tour.is_safari);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateTour = async (data: TourInsert) => {
    setIsLoading(true);
    try {
      // TODO: Replace with Supabase
      const newTour: Tour = {
        id: String(tours.length + 1),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...data,
        image: data.image || '',
        header_image: data.header_image || '',
        is_safari: data.is_safari || false,
        is_featured: data.is_featured || false,
        is_active: data.is_active !== false,
        itinerary: data.itinerary || [],
        inclusions: data.inclusions || [],
        exclusions: data.exclusions || [],
      };
      setTours([newTour, ...tours]);
      setShowForm(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTour = async (data: TourInsert) => {
    if (!editingTour) return;
    setIsLoading(true);
    try {
      // TODO: Replace with Supabase
      const updatedTours = tours.map(t => 
        t.id === editingTour.id 
          ? { ...t, ...data, updated_at: new Date().toISOString() } as Tour
          : t
      );
      setTours(updatedTours);
      setEditingTour(null);
      setShowForm(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTour = async (id: string) => {
    // TODO: Replace with Supabase
    setTours(tours.filter(t => t.id !== id));
    setShowDeleteConfirm(null);
  };

  const toggleTourStatus = async (id: string) => {
    setTours(tours.map(t => 
      t.id === id ? { ...t, is_active: !t.is_active } : t
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-gray-900">Tours & Safaris</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your tour offerings</p>
        </div>
        <button
          onClick={() => { setEditingTour(null); setShowForm(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium"
        >
          <Plus size={20} />
          Add New Tour
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-primary bg-gray-50"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-primary bg-gray-50 text-sm"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-primary bg-gray-50 text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="featured">Featured</option>
            <option value="safari">Safaris Only</option>
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Total Tours</p>
          <p className="text-2xl font-serif mt-1">{tours.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Active</p>
          <p className="text-2xl font-serif mt-1 text-green-600">{tours.filter(t => t.is_active).length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Featured</p>
          <p className="text-2xl font-serif mt-1 text-amber-600">{tours.filter(t => t.is_featured).length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Safaris</p>
          <p className="text-2xl font-serif mt-1 text-purple-600">{tours.filter(t => t.is_safari).length}</p>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTours.map((tour) => (
          <div 
            key={tour.id} 
            className={`bg-white rounded-2xl border overflow-hidden group transition-all hover:shadow-lg ${
              !tour.is_active ? 'opacity-60 border-gray-200' : 'border-gray-100'
            }`}
          >
            {/* Image */}
            <div className="relative aspect-video">
              <img 
                src={tour.image} 
                alt={tour.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {tour.is_featured && (
                  <span className="flex items-center gap-1 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    <Star size={12} fill="currentColor" /> Featured
                  </span>
                )}
                {tour.is_safari && (
                  <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Safari
                  </span>
                )}
                {!tour.is_active && (
                  <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Inactive
                  </span>
                )}
              </div>

              {/* Category */}
              <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                {tour.category}
              </span>

              {/* Price */}
              <div className="absolute bottom-3 right-3 bg-white px-3 py-1.5 rounded-full font-serif text-sm shadow-lg">
                {tour.price_display}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-serif text-lg text-gray-900 mb-2 line-clamp-1">{tour.title}</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{tour.description}</p>
              
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {tour.location.split(',')[0]}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {tour.duration}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => { setEditingTour(tour); setShowForm(true); }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Edit size={16} /> Edit
                </button>
                <a
                  href={`/${tour.slug}`}
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Eye size={16} /> View
                </a>
                <button
                  onClick={() => toggleTourStatus(tour.id)}
                  className={`flex-1 py-2 text-sm rounded-lg transition-colors ${
                    tour.is_active 
                      ? 'text-amber-600 hover:bg-amber-50' 
                      : 'text-green-600 hover:bg-green-50'
                  }`}
                >
                  {tour.is_active ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(tour.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTours.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tours found</h3>
          <p className="text-gray-500 text-sm mb-6">
            {searchQuery || categoryFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Get started by creating your first tour'}
          </p>
          {!searchQuery && categoryFilter === 'all' && statusFilter === 'all' && (
            <button
              onClick={() => { setEditingTour(null); setShowForm(true); }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
            >
              <Plus size={20} />
              Create Tour
            </button>
          )}
        </div>
      )}

      {/* Tour Form Modal */}
      {showForm && (
        <TourForm
          tour={editingTour}
          onSubmit={editingTour ? handleUpdateTour : handleCreateTour}
          onClose={() => { setShowForm(false); setEditingTour(null); }}
          isLoading={isLoading}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-4">
            <h3 className="text-lg font-serif mb-2">Delete Tour?</h3>
            <p className="text-gray-500 text-sm mb-6">
              This action cannot be undone. The tour will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTour(showDeleteConfirm)}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
