import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: typeof LucideIcon;
  path: string;
}

export default function ServiceCard({ title, description, icon: Icon, path }: ServiceCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(path)}
      className="glass-card p-6 rounded-2xl cursor-pointer group"
    >
      <div className="flex items-start space-x-4">
        <div className="service-icon group-hover:scale-110 group-hover:rotate-3">
          <Icon size={24} className="text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white/90 mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
          <p className="text-white/60 group-hover:text-white/70 transition-colors">{description}</p>
        </div>
      </div>
    </div>
  );
}