import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cat } from "@/types/cat";
import { RiDownload2Fill, RiEyeLine, RiEdit2Line, RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";

interface CatCardProps {
  cat: Cat;
  onDownload: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isDownloading: boolean;
}

export const CatCard = ({ cat, onDownload, onView, onEdit, onDelete, isDownloading }: CatCardProps) => {
  const [imageError, setImageError] = useState(false);

  if (!cat) return <div>No cat</div>;

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const handleDownload = () => onDownload(cat.id);
  const handleView = () => onView(cat.id);
  const handleEdit = () => onEdit(cat.id);
  const handleDelete = () => onDelete(cat.id);

  const handleImageError = () => {
    setImageError(true);
  };

  const imageSrc = imageError || !cat.image
    ? '/images/no-image.png'
    : cat.image;

  return (
    <div className="group flex flex-col gap-4 w-full max-w-sm rounded-xl p-2 transition-all hover:bg-white/2">
      <div className="relative w-full aspect-square overflow-hidden bg-muted border border-border group-hover:border-secondary transition-all duration-500 rounded-lg">
        <img
          src={imageSrc}
          alt={cat.name}
          className="w-full h-full object-cover  transition-all duration-700 scale-[1.01] group-hover:scale-110"
          onError={handleImageError}
          onContextMenu={handleContextMenu}
        />

        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-6">
          <div className="flex gap-4">
            <Button
              size="icon"
              variant="outline"
              className="h-12 w-12 rounded-full border-white/20 hover:border-secondary hover:bg-secondary hover:text-white transition-all text-white"
              onClick={handleView}
              disabled={isDownloading}
            >
              <RiEyeLine className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-12 w-12 rounded-full border-white/20 hover:border-secondary hover:bg-secondary hover:text-white transition-all text-white"
              onClick={handleEdit}
            >
              <RiEdit2Line className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex gap-4">
            <Button
              size="icon"
              variant="outline"
              className="h-12 w-12 rounded-full border-white/20 hover:border-red-500 hover:bg-red-500 hover:text-white transition-all text-white"
              onClick={handleDelete}
            >
              <RiDeleteBin6Line className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-12 w-12 rounded-full border-white/20 hover:border-secondary hover:bg-secondary hover:text-white transition-all text-white"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <RiDownload2Fill className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        <div className="absolute top-3 left-3">
          <Badge className="bg-black/80 backdrop-blur-md border border-white/10 text-[9px] text-white rounded-md px-2 py-0.5 font-mono uppercase tracking-[0.2em] group-hover:border-secondary/50 group-hover:text-secondary transition-colors">
            {cat.category?.name || 'Noir'}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-white group-hover:text-secondary transition-colors duration-300">
            {cat.name}
          </h3>
        </div>
        <div className="h-px w-full bg-border group-hover:bg-secondary/50 transition-all duration-500" />
        <div className="flex justify-between items-center mt-1">
          <span className="text-[9px] font-mono text-muted-foreground uppercase">
            Created: {new Date().toLocaleDateString()}
          </span>
          <span className="text-[9px] font-mono text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
            Full Details →
          </span>
        </div>
      </div>
    </div>
  );
};