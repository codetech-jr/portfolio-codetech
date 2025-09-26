"use client";

import { useState, useEffect } from 'react';
import { FaFilter, FaTimes, FaCalendar, FaSort, FaTag } from 'react-icons/fa';

export default function AdvancedFilters({ 
  categories = [], 
  tags = [], 
  onFiltersChange,
  className = "" 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    tags: [],
    dateRange: '',
    sortBy: 'newest',
    searchQuery: ''
  });

  const sortOptions = [
    { value: 'newest', label: 'Más recientes' },
    { value: 'oldest', label: 'Más antiguos' },
    { value: 'popular', label: 'Más populares' },
    { value: 'title', label: 'Por título A-Z' },
  ];

  const dateRanges = [
    { value: '', label: 'Todas las fechas' },
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Esta semana' },
    { value: 'month', label: 'Este mes' },
    { value: 'year', label: 'Este año' },
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleTagToggle = (tag) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    handleFilterChange('tags', newTags);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      tags: [],
      dateRange: '',
      sortBy: 'newest',
      searchQuery: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = filters.category || filters.tags.length > 0 || filters.dateRange || filters.sortBy !== 'newest';

  return (
    <div className={`bg-[#1B1F3B] rounded-lg border border-[#003B8D] ${className}`}>
      {/* Header de filtros */}
      <div className="p-4 border-b border-[#003B8D]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FaFilter className="text-[#00C6FF] w-4 h-4" />
            <h3 className="text-lg font-semibold text-[#00C6FF]">Filtros Avanzados</h3>
            {hasActiveFilters && (
              <span className="px-2 py-1 bg-[#00C6FF] text-[#0C0C2C] text-xs font-semibold rounded-full">
                {filters.tags.length + (filters.category ? 1 : 0) + (filters.dateRange ? 1 : 0)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-[#A3A8CC] hover:text-[#00C6FF] transition-colors"
              >
                Limpiar
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#A3A8CC] hover:text-[#00C6FF] transition-colors"
            >
              {isOpen ? <FaTimes className="w-4 h-4" /> : <FaFilter className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Contenido de filtros */}
      {isOpen && (
        <div className="p-4 space-y-6">
          {/* Categorías */}
          <div>
            <label className="block text-sm font-medium text-[#00C6FF] mb-3">
              Categorías
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleFilterChange('category', '')}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  filters.category === '' 
                    ? 'bg-[#00C6FF] text-[#0C0C2C]' 
                    : 'bg-[#0C0C2C] text-[#A3A8CC] hover:text-white'
                }`}
              >
                Todas
              </button>
              {categories
                // Filtramos para ignorar categorías sin slug y evitar errores
                .filter(category => category.slug && category.slug.current) 
                .map((category) => (
                  <button
                    key={category._id}
                    // Usamos category.slug.current para la lógica del filtro
                    onClick={() => handleFilterChange('category', category.slug.current)}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      // Comparamos con category.slug.current para el estilo activo
                      filters.category === category.slug.current
                        ? 'bg-[#00C6FF] text-[#0C0C2C]' 
                        : 'bg-[#0C0C2C] text-[#A3A8CC] hover:text-white'
                    }`}
                  >
                    {category.title}
                  </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <label className="text-sm font-medium text-[#00C6FF] mb-3 flex items-center">
                <FaTag className="w-3 h-3 mr-2" />
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag._id}
                    onClick={() => handleTagToggle(tag.title)}
                    className={`px-3 py-1 text-xs rounded-full transition-all ${
                      filters.tags.includes(tag.title)
                        ? `${tag.color || 'bg-[#00C6FF]'} text-[#0C0C2C] font-semibold`
                        : 'bg-[#0C0C2C] text-[#A3A8CC] hover:text-white border border-[#003B8D]'
                    }`}
                  >
                    {tag.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Rango de fechas */}
          <div>
            <label className="text-sm font-medium text-[#00C6FF] mb-3 flex items-center">
              <FaCalendar className="w-3 h-3 mr-2" />
              Rango de fechas
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full px-3 py-2 bg-[#0C0C2C] border border-[#003B8D] rounded-lg text-[#A3A8CC] focus:outline-none focus:border-[#00C6FF]"
            >
              {dateRanges.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Ordenamiento */}
          <div>
            <label className="text-sm font-medium text-[#00C6FF] mb-3 flex items-center">
              <FaSort className="w-3 h-3 mr-2" />
              Ordenar por
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full px-3 py-2 bg-[#0C0C2C] border border-[#003B8D] rounded-lg text-[#A3A8CC] focus:outline-none focus:border-[#00C6FF]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}