"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Plus, Search, Edit, Trash2, Eye, Star, MapPin, Clock, RefreshCw, Loader2, Menu, X } from "lucide-react";
import TourForm from "@/components/admin/TourForm";
import { Tour, TourCategory } from "@/lib/supabase/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Database tour type (matches Supabase schema)
interface DbTour {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  description: string;
  short_description?: string;
  price: number;
  duration: string;
  category: TourCategory;
  location: string;
  image_url: string;
  header_image_url?: string;
  gallery?: string[];
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: any[];
  max_guests?: number;
  min_guests?: number;
  is_safari: boolean;
  is_featured: boolean;
  is_active: boolean;
}

// Transform database tour to app Tour type
const transformDbTour = (dbTour: DbTour): Tour => ({
  id: dbTour.id,
  created_at: dbTour.created_at,
  updated_at: dbTour.updated_at,
  slug: dbTour.slug,
  title: dbTour.title,
  description: dbTour.description,
  image: dbTour.image_url || '',
  header_image: dbTour.header_image_url || '',
  price: dbTour.price,
  price_display: `From $${dbTour.price}`,
  duration: dbTour.duration,
  group_type: 'Private Tour',
  group_size: `Up to ${dbTour.max_guests || 10} guests`,
  location: dbTour.location,
  category: dbTour.category,
  is_safari: dbTour.is_safari,
  is_featured: dbTour.is_featured,
  is_active: dbTour.is_active,
  itinerary: dbTour.itinerary || [],
  inclusions: dbTour.inclusions || [],
  exclusions: dbTour.exclusions || [],
});

const categories: TourCategory[] = ['Culture', 'Nature', 'Adventure', 'Wildlife', 'Beach', 'Safari', 'Luxury'];

export default function AdminToursPage() {
  const [dbTours, setDbTours] = useState<DbTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingTour, setEditingTour] = useState<DbTour | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch tours from Supabase
  const fetchTours = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDbTours(data || []);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Filter tours
  const filteredTours = dbTours.filter(tour => {
    const matchesSearch = tour.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || tour.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && tour.is_active) ||
                         (statusFilter === 'inactive' && !tour.is_active) ||
                         (statusFilter === 'featured' && tour.is_featured) ||
                         (statusFilter === 'safari' && tour.is_safari);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateTour = async (data: any) => {
    setIsLoading(true);
    try {
      const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      const { data: newTour, error } = await supabase
        .from('tours')
        .insert({
          title: data.title,
          slug: slug,
          description: data.description,
          short_description: data.short_description,
          price: data.price,
          duration: data.duration,
          category: data.category,
          location: data.location,
          image_url: data.image_url || data.image,
          header_image_url: data.header_image_url || data.header_image,
          gallery: data.gallery || [],
          inclusions: data.inclusions || [],
          exclusions: data.exclusions || [],
          itinerary: data.itinerary || [],
          max_guests: data.max_guests || 10,
          min_guests: data.min_guests || 1,
          is_safari: data.is_safari || false,
          is_featured: data.is_featured || false,
          is_active: data.is_active !== false,
        })
        .select()
        .single();

      if (error) throw error;
      
      setDbTours([newTour, ...dbTours]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating tour:', error);
      alert('Failed to create tour. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTour = async (data: any) => {
    if (!editingTour) return;
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('tours')
        .update({
          title: data.title,
          description: data.description,
          short_description: data.short_description,
          price: data.price,
          duration: data.duration,
          category: data.category,
          location: data.location,
          image_url: data.image_url || data.image,
          header_image_url: data.header_image_url || data.header_image,
          gallery: data.gallery || [],
          inclusions: data.inclusions || [],
          exclusions: data.exclusions || [],
          itinerary: data.itinerary || [],
          max_guests: data.max_guests,
          min_guests: data.min_guests,
          is_safari: data.is_safari,
          is_featured: data.is_featured,
          is_active: data.is_active,
        })
        .eq('id', editingTour.id);

      if (error) throw error;
      
      setDbTours(dbTours.map(t => 
        t.id === editingTour.id ? { ...t, ...data, updated_at: new Date().toISOString() } : t
      ));
      setEditingTour(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating tour:', error);
      alert('Failed to update tour. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTour = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tours')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setDbTours(dbTours.filter(t => t.id !== id));
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting tour:', error);
      alert('Failed to delete tour. Please try again.');
    }
  };

  const toggleTourStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('tours')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      setDbTours(dbTours.map(t => 
        t.id === id ? { ...t, is_active: !currentStatus } : t
      ));
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('tours')
        .update({ is_featured: !currentFeatured })
        .eq('id', id);

      if (error) throw error;
      
      setDbTours(dbTours.map(t => 
        t.id === id ? { ...t, is_featured: !currentFeatured } : t
      ));
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-500">Loading tours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif text-gray-900">Tours & Safaris</h1>
            <p className="text-gray-500 text-sm mt-1 hidden sm:block">Manage your tour offerings</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchTours}
              className="p-2 md:px-4 md:py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={18} />
              <span className="hidden md:inline ml-2">Refresh</span>
            </button>
            <button
              onClick={() => { setEditingTour(null); setShowForm(true); }}
              className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Tour</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex md:hidden items-center gap-2 w-full p-3 bg-white rounded-xl border border-gray-100"
      >
        <Menu size={18} />
        <span className="text-sm">Filters & Search</span>
        {(searchQuery || categoryFilter !== 'all' || statusFilter !== 'all') && (
          <span className="ml-auto bg-primary text-white text-xs px-2 py-0.5 rounded-full">
            Active
          </span>
        )}
      </button>

      {/* Filters - Collapsible on mobile */}
      <div className={`${showFilters ? 'block' : 'hidden'} md:block bg-white rounded-2xl border border-gray-100 p-4 space-y-4 md:space-y-0 md:flex md:flex-row md:gap-4`}>
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
        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="flex-1 md:flex-none px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-primary bg-gray-50 text-sm"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 md:flex-none px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-primary bg-gray-50 text-sm"
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-3 md:p-4">
          <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">Total</p>
          <p className="text-xl md:text-2xl font-serif mt-1">{dbTours.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-3 md:p-4">
          <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">Active</p>
          <p className="text-xl md:text-2xl font-serif mt-1 text-green-600">{dbTours.filter(t => t.is_active).length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-3 md:p-4">
          <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">Featured</p>
          <p className="text-xl md:text-2xl font-serif mt-1 text-amber-600">{dbTours.filter(t => t.is_featured).length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-3 md:p-4">
          <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">Safaris</p>
          <p className="text-xl md:text-2xl font-serif mt-1 text-purple-600">{dbTours.filter(t => t.is_safari).length}</p>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {filteredTours.map((tour) => (
          <div 
            key={tour.id} 
            className={`bg-white rounded-2xl border overflow-hidden group transition-all hover:shadow-lg ${
              !tour.is_active ? 'opacity-60 border-gray-200' : 'border-gray-100'
            }`}
          >
            {/* Image */}
            <div className="relative aspect-video">
              {tour.image_url ? (
                <img 
                  src={tour.image_url} 
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <MapPin size={32} className="text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
                {tour.is_featured && (
                  <span className="flex items-center gap-1 bg-amber-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                    <Star size={10} fill="currentColor" /> Featured
                  </span>
                )}
                {tour.is_safari && (
                  <span className="bg-purple-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                    Safari
                  </span>
                )}
                {!tour.is_active && (
                  <span className="bg-gray-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                    Inactive
                  </span>
                )}
              </div>

              {/* Category */}
              <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-medium">
                {tour.category}
              </span>

              {/* Price */}
              <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-full font-serif text-sm shadow-lg">
                {formatCurrency(tour.price)}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-serif text-base md:text-lg text-gray-900 mb-1 line-clamp-1">{tour.title}</h3>
              <p className="text-gray-500 text-xs md:text-sm mb-3 line-clamp-2">{tour.description}</p>
              
              <div className="flex items-center gap-3 text-[10px] md:text-xs text-gray-400 mb-3">
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {tour.location?.split(',')[0]}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {tour.duration}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 pt-3 border-t border-gray-100">
                <button
                  onClick={() => { setEditingTour(tour); setShowForm(true); }}
                  className="flex-1 flex items-center justify-center gap-1 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Edit size={14} /> Edit
                </button>
                <button
                  onClick={() => toggleFeatured(tour.id, tour.is_featured)}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 text-xs rounded-lg transition-colors ${
                    tour.is_featured 
                      ? 'text-amber-600 hover:bg-amber-50' 
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                  title={tour.is_featured ? 'Remove from featured' : 'Add to featured'}
                >
                  <Star size={14} fill={tour.is_featured ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={() => toggleTourStatus(tour.id, tour.is_active)}
                  className={`flex-1 py-2 text-xs rounded-lg transition-colors ${
                    tour.is_active 
                      ? 'text-red-500 hover:bg-red-50' 
                      : 'text-green-600 hover:bg-green-50'
                  }`}
                >
                  {tour.is_active ? 'Disable' : 'Enable'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(tour.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTours.length === 0 && (
        <div className="text-center py-12 md:py-16 bg-white rounded-2xl border border-gray-100">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin size={24} className="text-gray-400" />
          </div>
          <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">No tours found</h3>
          <p className="text-gray-500 text-sm mb-6 px-4">
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
          tour={editingTour ? transformDbTour(editingTour) : null}
          onSubmit={editingTour ? handleUpdateTour : handleCreateTour}
          onClose={() => { setShowForm(false); setEditingTour(null); }}
          isLoading={isLoading}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
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
