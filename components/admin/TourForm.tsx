"use client";
import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import ImageUpload from "./ImageUpload";
import { Tour, TourInsert, TourCategory } from "@/lib/supabase/types";

interface TourFormProps {
  tour?: Tour | null;
  onSubmit: (data: TourInsert) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

const categoryLabels: Record<TourCategory, string> = {
  Culture: 'Culture',
  Nature: 'Nature',
  Adventure: 'Adventure',
  Wildlife: 'Wildlife',
  Beach: 'Beach',
  Safari: 'Safari',
  Luxury: 'Premium',
};

const categories: TourCategory[] = ['Culture', 'Nature', 'Adventure', 'Wildlife', 'Beach', 'Safari', 'Luxury'];

export default function TourForm({ tour, onSubmit, onClose, isLoading }: TourFormProps) {
  const [formData, setFormData] = useState<TourInsert>({
    slug: '',
    title: '',
    description: '',
    image: '',
    header_image: '',
    gallery: [],
    price: 0,
    price_display: '',
    duration: '',
    group_type: '',
    group_size: '',
    location: '',
    category: 'Culture',
    is_safari: false,
    is_featured: false,
    is_active: true,
    itinerary: [],
    inclusions: [],
    exclusions: [],
  });

  const [newInclusion, setNewInclusion] = useState('');
  const [newExclusion, setNewExclusion] = useState('');
  const [newItinerary, setNewItinerary] = useState({ time: '', event: '' });

  useEffect(() => {
    if (tour) {
      setFormData({
        slug: tour.slug,
        title: tour.title,
        description: tour.description,
        image: tour.image,
        header_image: tour.header_image,
        gallery: (tour.gallery || []).slice(0, 4),
        price: tour.price,
        price_display: tour.price_display,
        duration: tour.duration,
        group_type: tour.group_type,
        group_size: tour.group_size,
        location: tour.location,
        category: tour.category,
        is_safari: tour.is_safari,
        is_featured: tour.is_featured,
        is_active: tour.is_active,
        itinerary: tour.itinerary || [],
        inclusions: tour.inclusions || [],
        exclusions: tour.exclusions || [],
      });
    }
  }, [tour]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  const addInclusion = () => {
    if (newInclusion.trim()) {
      setFormData(prev => ({
        ...prev,
        inclusions: [...(prev.inclusions || []), newInclusion.trim()]
      }));
      setNewInclusion('');
    }
  };

  const removeInclusion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      inclusions: (prev.inclusions || []).filter((_, i) => i !== index)
    }));
  };

  const addExclusion = () => {
    if (newExclusion.trim()) {
      setFormData(prev => ({
        ...prev,
        exclusions: [...(prev.exclusions || []), newExclusion.trim()]
      }));
      setNewExclusion('');
    }
  };

  const removeExclusion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      exclusions: (prev.exclusions || []).filter((_, i) => i !== index)
    }));
  };

  const addItinerary = () => {
    if (newItinerary.time.trim() && newItinerary.event.trim()) {
      setFormData(prev => ({
        ...prev,
        itinerary: [...(prev.itinerary || []), { ...newItinerary }]
      }));
      setNewItinerary({ time: '', event: '' });
    }
  };

  const removeItinerary = (index: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: (prev.itinerary || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = {
      ...formData,
      gallery: (formData.gallery || []).filter(Boolean).slice(0, 4),
    } as TourInsert;
    await onSubmit(cleaned);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-10">
      <div className="bg-white rounded-3xl w-full max-w-4xl mx-4 my-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-serif">{tour ? 'Edit Tour' : 'Create New Tour'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image</label>
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                onRemove={() => setFormData(prev => ({ ...prev, image: '' }))}
                aspectRatio="video"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Header Image</label>
              <ImageUpload
                value={formData.header_image}
                onChange={(url) => setFormData(prev => ({ ...prev, header_image: url }))}
                onRemove={() => setFormData(prev => ({ ...prev, header_image: '' }))}
                aspectRatio="wide"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">Gallery Images (max 4)</label>
              <span className="text-xs text-gray-400">{(formData.gallery || []).filter(Boolean).length}/4</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx}>
                  <ImageUpload
                    value={(formData.gallery || [])[idx] || ''}
                    onChange={(url) => {
                      setFormData(prev => {
                        const next = [...(prev.gallery || [])];
                        next[idx] = url;
                        return { ...prev, gallery: next.slice(0, 4) };
                      });
                    }}
                    onRemove={() => {
                      setFormData(prev => {
                        const next = [...(prev.gallery || [])];
                        next[idx] = '';
                        return { ...prev, gallery: next };
                      });
                    }}
                    aspectRatio="square"
                    label={`Image ${idx + 1}`}
                    folder="tours/gallery"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tour Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={() => !formData.slug && generateSlug()}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="e.g., Stone Town Heritage Walk"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL Slug *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="stone-town-heritage-walk"
                />
                <button
                  type="button"
                  onClick={generateSlug}
                  className="px-4 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 text-sm"
                >
                  Generate
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{categoryLabels[category]}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                placeholder="Describe the tour experience..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (USD) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Display *</label>
              <input
                type="text"
                name="price_display"
                value={formData.price_display}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="From $50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="3 - 4 Hours"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Stone Town, Zanzibar"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Group Type</label>
              <input
                type="text"
                name="group_type"
                value={formData.group_type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Private Tour"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Group Size</label>
              <input
                type="text"
                name="group_size"
                value={formData.group_size}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Up to 6 guests"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_safari"
                checked={formData.is_safari}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium">Safari Tour</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium">Featured Tour</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium">Active (Visible on site)</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Itinerary</label>
            <div className="space-y-2 mb-3">
              {(formData.itinerary || []).map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                  <span className="text-sm font-medium text-primary min-w-[80px]">{item.time}</span>
                  <span className="text-sm flex-1">{item.event}</span>
                  <button type="button" onClick={() => removeItinerary(index)} className="p-1 text-red-500 hover:bg-red-50 rounded">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newItinerary.time}
                onChange={(e) => setNewItinerary(prev => ({ ...prev, time: e.target.value }))}
                placeholder="09:00 AM"
                className="w-28 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
              <input
                type="text"
                value={newItinerary.event}
                onChange={(e) => setNewItinerary(prev => ({ ...prev, event: e.target.value }))}
                placeholder="Event description..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
              <button type="button" onClick={addItinerary} className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Inclusions</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {(formData.inclusions || []).map((item, index) => (
                <span key={index} className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm">
                  {item}
                  <button type="button" onClick={() => removeInclusion(index)} className="hover:text-green-900">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newInclusion}
                onChange={(e) => setNewInclusion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInclusion())}
                placeholder="Add inclusion..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
              <button type="button" onClick={addInclusion} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Exclusions</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {(formData.exclusions || []).map((item, index) => (
                <span key={index} className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1.5 rounded-full text-sm">
                  {item}
                  <button type="button" onClick={() => removeExclusion(index)} className="hover:text-red-900">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newExclusion}
                onChange={(e) => setNewExclusion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExclusion())}
                placeholder="Add exclusion..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
              <button type="button" onClick={addExclusion} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                <Plus size={20} />
              </button>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? 'Saving...' : (tour ? 'Update Tour' : 'Create Tour')}
          </button>
        </div>
      </div>
    </div>
  );
}
