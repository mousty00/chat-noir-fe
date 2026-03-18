import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useFavoriteStore } from "@/hooks/useFavoriteStore";
import { useToggleFavorite } from "@/hooks/favorites/useToggleFavorite";
import { Cat } from "@/types/cat";
import { useState } from "react";
import { RiDeleteBin6Line, RiDownload2Fill, RiEdit2Line, RiEyeLine, RiHeartFill, RiHeartLine } from "react-icons/ri";

interface CatCardProps {
  cat: Cat;
  onDownload: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDetails: (id: string) => void;
  isDownloading: boolean;
}

interface ButtonAction {
  icon: React.ReactNode;
  action: () => void;
  hidden?: boolean;
  disabled?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "danger";
}

export const CatCard = ({ cat, onDownload, onView, onEdit, onDelete, onDetails, isDownloading }: CatCardProps) => {
  const [imageError, setImageError] = useState(false);
  const { user } = useAuthStore();
  const favorited = useFavoriteStore((s) => s.isFavorite(cat?.id ?? ""));
  const { toggleFavorite, loading: toggling } = useToggleFavorite();

  if (!cat) return <div>No cat</div>; 3

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const handleDownload = () => onDownload(cat.id);
  const handleView = () => onView(cat.id);
  const handleEdit = () => onEdit(cat.id);
  const handleDelete = () => onDelete(cat.id);
  const handleImageError = () => setImageError(true);

  const iconSize: string = "h-6 w-6 md:h-10 md:w-10";
  const buttonSize: string = "h-10 w-10 md:h-16 md:w-16";

  const canEdit = user?.isAdmin;
  const imageSrc = imageError || !cat.image ? '/images/no-image.png' : cat.image;

  const buttonActions: ButtonAction[] = [
    { icon: <RiEyeLine className={iconSize} />, action: handleView, variant: "default" },
    { icon: <RiDownload2Fill className={iconSize} />, action: handleDownload, disabled: isDownloading, variant: "default" },
    {
      icon: favorited
        ? <RiHeartFill className={iconSize} />
        : <RiHeartLine className={iconSize} />,
      action: () => toggleFavorite(cat.id),
      disabled: toggling,
      variant: favorited ? "danger" : "default",
    },
    { icon: <RiEdit2Line className={iconSize} />, action: handleEdit, hidden: !canEdit, variant: "default" },
    { icon: <RiDeleteBin6Line className={iconSize} />, action: handleDelete, hidden: !canEdit, variant: "danger" },
  ];

  return (
    <div
      className="group flex flex-col gap-4 w-full max-w-sm rounded-xl p-2 transition-all hover:bg-secondary/5 cursor-pointer"
      onClick={() => onDetails(cat.id)}
    >
      <div className="relative w-full aspect-square overflow-hidden bg-muted border border-border group-hover:border-secondary transition-all duration-500 rounded-lg">
        <img
          src={imageSrc}
          alt={cat.name}
          className="w-full h-full object-cover  transition-all duration-700 scale-[1.01] group-hover:scale-110"
          onError={handleImageError}
          onContextMenu={handleContextMenu}
        />

        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-wrap items-center justify-center gap-6">
          <div className="grid grid-cols-2 justify-center items-center gap-4">
            {buttonActions.map((action, index) => (
              <Button
                key={index}
                size="icon"
                rounded
                className={buttonSize}
                onClick={(e) => { e.stopPropagation(); action.action(); }}
                hidden={action.hidden}
                disabled={action.disabled}
                variant={action.variant}
              >
                {action.icon}
              </Button>
            ))}
          </div>
        </div>

        <div className="absolute top-3 left-3">
          <Badge className="bg-background/80 backdrop-blur-md border border-border text-[9px] text-foreground rounded-md px-2 py-0.5 font-mono uppercase tracking-[0.2em] group-hover:border-secondary/50 group-hover:text-secondary transition-colors">
            {cat.category?.name || 'Noir'}
          </Badge>
        </div>

        {favorited && (
          <div className="absolute top-3 right-3">
            <div className="p-1.5 rounded-full bg-background/80 backdrop-blur-md border border-secondary/50">
              <RiHeartFill className="h-3 w-3 text-secondary" />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-foreground group-hover:text-secondary transition-colors duration-300">
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