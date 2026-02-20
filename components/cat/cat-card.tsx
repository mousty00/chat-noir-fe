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
    <Card className="relative p-0 w-full max-w-sm overflow-hidden group retro-bevel">
      <div className="relative w-full aspect-square">
        <img
          src={imageSrc}
          alt={cat.name}
          className="w-full h-full object-cover"
          onError={handleImageError}
          onContextMenu={handleContextMenu}
        />

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-4">
            <Button
              size="icon"
              variant="secondary"
              className="h-14 w-14 md:h-16 md:w-16 rounded-none retro-button shadow-[4px_4px_0px_#000] hover:scale-105 active:scale-95 transition-all text-black"
              onClick={handleView}
              disabled={isDownloading}
              title="View media"
            >
              <RiEyeLine className="h-6 w-6 md:h-8 md:w-8" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-14 w-14 md:h-16 md:w-16 rounded-none retro-button shadow-[4px_4px_0px_#000] hover:scale-105 active:scale-95 transition-all text-black"
              onClick={handleEdit}
              disabled={isDownloading}
              title="Edit cat"
            >
              <RiEdit2Line className="h-6 w-6 md:h-8 md:w-8" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-14 w-14 md:h-16 md:w-16 rounded-none retro-button shadow-[4px_4px_0px_#000] hover:scale-105 active:scale-95 transition-all text-black border-red-900"
              onClick={handleDelete}
              disabled={isDownloading}
              title="Delete cat"
            >
              <RiDeleteBin6Line className="h-6 w-6 md:h-8 md:w-8 text-red-600" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-14 w-14 md:h-16 md:w-16 rounded-none retro-button shadow-[4px_4px_0px_#000] hover:scale-105 active:scale-95 transition-all text-black"
              onClick={handleDownload}
              disabled={isDownloading}
              title="Download media"
            >
              {isDownloading ? (
                <div className="h-6 w-6 md:h-8 md:w-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <RiDownload2Fill className="h-6 w-6 md:h-8 md:w-8" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <CardHeader className="absolute bottom-0 left-0 right-0 w-full flex-row items-center justify-between px-4 pb-4 pt-12 bg-linear-to-t from-black/90 via-black/40 to-transparent text-white translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out">
        <div className="flex flex-col gap-0.5">
          <CardTitle className="text-sm font-bold uppercase tracking-tight">{cat.name}</CardTitle>
          <span className="text-[10px] font-mono opacity-80 uppercase">ID: {cat.id.slice(0, 8)}</span>
        </div>
        <Badge className="bg-[#000080] border-white/20 border text-[10px] text-white rounded-none px-2 py-0.5 font-mono uppercase tracking-tighter">
          {cat.category?.name || 'GENERIC'}
        </Badge>
      </CardHeader>
    </Card>
  );
};