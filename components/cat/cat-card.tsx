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
  label: string;
  icon: React.ReactNode;
  action: () => void;
  hidden?: boolean;
  disabled?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "danger";
  danger?: boolean;
}

export const CatCard = ({ cat, onDownload, onView, onEdit, onDelete, onDetails, isDownloading }: CatCardProps) => {
  const [imageError, setImageError] = useState(false);
  const { user } = useAuthStore();
  const favorited = useFavoriteStore((s) => s.isFavorite(cat?.id ?? ""));
  const { toggleFavorite, loading: toggling } = useToggleFavorite();

  if (!cat) return <div>No cat</div>;

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const handleDownload = () => onDownload(cat.id);
  const handleView = () => onView(cat.id);
  const handleEdit = () => onEdit(cat.id);
  const handleDelete = () => onDelete(cat.id);
  const handleImageError = () => setImageError(true);

  const canEdit = user?.isAdmin;
  const imageSrc = imageError || !cat.image ? '/images/no-image.png' : cat.image;

  const buttonActions: ButtonAction[] = [
    { label: "View", icon: <RiEyeLine className="h-4 w-4" />, action: handleView },
    { label: "Download", icon: <RiDownload2Fill className="h-4 w-4" />, action: handleDownload, disabled: isDownloading },
    {
      label: favorited ? "Remove from favorites" : "Add to favorites",
      icon: favorited ? <RiHeartFill className="h-4 w-4" /> : <RiHeartLine className="h-4 w-4" />,
      action: () => toggleFavorite(cat.id),
      disabled: toggling,
      danger: favorited,
    },
    { label: "Edit", icon: <RiEdit2Line className="h-4 w-4" />, action: handleEdit, hidden: !canEdit },
    { label: "Delete", icon: <RiDeleteBin6Line className="h-4 w-4" />, action: handleDelete, hidden: !canEdit, danger: true },
  ];

  const visibleActions = buttonActions.filter((a) => !a.hidden);

  return (
    <div
      className="group flex flex-col w-full cursor-pointer"
      onClick={() => onDetails(cat.id)}
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-muted shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-black/15 dark:group-hover:shadow-black/40">
        <img
          src={imageSrc}
          alt={cat.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={handleImageError}
          onContextMenu={handleContextMenu}
          draggable={false}
        />

        <div className="hidden md:flex absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end justify-center pb-5">
          <div className="flex items-center gap-2 px-4">
            {visibleActions.map((action) => (
              <button
                key={action.label}
                aria-label={action.label}
                title={action.label}
                onClick={(e) => { e.stopPropagation(); action.action(); }}
                disabled={action.disabled}
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full
                  backdrop-blur-md border transition-all duration-200 active:scale-90
                  disabled:opacity-40 disabled:cursor-not-allowed
                  ${action.danger
                    ? "bg-red-500/20 border-red-400/40 text-red-300 hover:bg-red-500/40 hover:border-red-400/60"
                    : "bg-white/15 border-white/25 text-white hover:bg-white/30 hover:border-white/40"
                  }
                `}
              >
                {action.icon}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute top-2.5 left-2.5">
          <span className="inline-flex items-center h-5 px-2 rounded-full bg-black/30 backdrop-blur-md border border-white/15 text-white text-[9px] font-mono uppercase tracking-[0.18em]">
            {cat.category?.name || 'Noir'}
          </span>
        </div>

        {favorited && (
          <div className="absolute top-2.5 right-2.5">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black/30 backdrop-blur-md border border-red-400/40">
              <RiHeartFill className="h-3 w-3 text-red-400" />
            </div>
          </div>
        )}
      </div>

      <div className="pt-2.5 pb-1 px-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[13px] font-semibold tracking-tight text-foreground leading-snug line-clamp-1">
            {cat.name}
          </h3>
          {(cat.color || cat.sourceName) && (
            <span className="shrink-0 text-[10px] text-muted-foreground/70 font-mono mt-0.5 capitalize">
              {cat.color || cat.sourceName}
            </span>
          )}
        </div>

        <div className="flex md:hidden items-center gap-1.5 mt-2.5">
          {visibleActions.map((action) => (
            <button
              key={action.label}
              aria-label={action.label}
              title={action.label}
              onClick={(e) => { e.stopPropagation(); action.action(); }}
              disabled={action.disabled}
              className={`
                flex items-center justify-center w-8 h-8 rounded-full
                border transition-all duration-150 active:scale-90
                disabled:opacity-40 disabled:cursor-not-allowed
                ${action.danger
                  ? "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800/60 text-red-500 dark:text-red-400"
                  : "bg-muted/80 border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
                }
              `}
            >
              {action.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
