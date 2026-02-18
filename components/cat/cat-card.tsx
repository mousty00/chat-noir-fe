import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Cat } from "@/types/cat";
import { RiDownload2Fill, RiEyeLine } from "react-icons/ri";
import { useState } from "react";

interface CatCardProps {
  cat: Cat;
  onDownload: (id: string) => void;
  onView: (id: string) => void;
  isDownloading: boolean;
}

export const CatCard = ({ cat, onDownload, onView, isDownloading }: CatCardProps) => {
  const [imageError, setImageError] = useState(false);

  if (!cat) return <div>No cat</div>;

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const handleDownload = () => onDownload(cat.id);
  const handleView = () => onView(cat.id);

  const handleImageError = () => {
    setImageError(true);
  };

  const imageSrc = imageError || !cat.image
    ? '/images/no-image.png'
    : cat.image;

  return (
    <Card className="relative border-0 mx-auto w-full max-w-sm pt-0 overflow-hidden group">
      <div className="relative w-full aspect-square">
        <img
          src={imageSrc}
          alt={cat.name}
          className="w-full h-full object-cover rounded-xl"
          onError={handleImageError}
          onContextMenu={handleContextMenu}
        />

        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="h-14 w-14 md:h-16 md:w-16 rounded-full cursor-pointer text-white bg-violet-600/90 hover:bg-violet-600 shadow-lg transform hover:scale-110 transition-transform"
            onClick={handleView}
            disabled={isDownloading}
            title="View media"
          >
            <RiEyeLine className="h-6 w-6 md:h-8 md:w-8" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-14 w-14 md:h-16 md:w-16 rounded-full cursor-pointer text-white bg-violet-600/90 hover:bg-violet-600 shadow-lg transform hover:scale-110 transition-transform"
            onClick={handleDownload}
            disabled={isDownloading}
            title="Download media"
          >
            {isDownloading ? (
              <div className="h-6 w-6 md:h-8 md:w-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <RiDownload2Fill className="h-6 w-6 md:h-8 md:w-8" />
            )}
          </Button>
        </div>
      </div>

      <CardHeader className="w-full flex items-center justify-between px-4">
        <CardTitle className="text-lg md:text-xl">{cat.name}</CardTitle>
        <CardDescription className="text-sm">
          <Badge className="bg-violet-600 text-xs text-white">
            {cat.category?.name || 'Unknown'}
          </Badge>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};