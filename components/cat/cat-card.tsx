import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useFavoriteStore } from "@/hooks/useFavoriteStore";
import { useToggleFavorite } from "@/hooks/favorites/useToggleFavorite";
import { Cat } from "@/types/cat";
import { useState } from "react";
import {
  RiDeleteBin6Line,
  RiDownload2Fill,
  RiEdit2Line,
  RiEyeLine,
  RiHeartFill,
  RiHeartLine,
} from "react-icons/ri";

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
  danger?: boolean;
}

export const CatCard = ({
  cat,
  onDownload,
  onView,
  onEdit,
  onDelete,
  onDetails,
  isDownloading,
}: CatCardProps) => {
  const [imageError, setImageError] = useState(false);
  const { user } = useAuthStore();
  const favorited = useFavoriteStore((s) => s.isFavorite(cat?.id ?? ""));
  const { toggleFavorite, loading: toggling } = useToggleFavorite();

  if (!cat) return null;

  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
  const canEdit = user?.isAdmin;
  const imageSrc = imageError || !cat.image ? "/images/no-image.png" : cat.image;

  const buttonActions: ButtonAction[] = [
    {
      label: "View",
      icon: <RiEyeLine className="h-3.5 w-3.5" />,
      action: () => onView(cat.id),
    },
    {
      label: "Download",
      icon: <RiDownload2Fill className="h-3.5 w-3.5" />,
      action: () => onDownload(cat.id),
      disabled: isDownloading,
    },
    {
      label: favorited ? "Unfavorite" : "Favorite",
      icon: favorited ? (
        <RiHeartFill className="h-3.5 w-3.5" />
      ) : (
        <RiHeartLine className="h-3.5 w-3.5" />
      ),
      action: () => toggleFavorite(cat.id),
      disabled: toggling,
      danger: favorited,
    },
    {
      label: "Edit",
      icon: <RiEdit2Line className="h-3.5 w-3.5" />,
      action: () => onEdit(cat.id),
      hidden: !canEdit,
    },
    {
      label: "Delete",
      icon: <RiDeleteBin6Line className="h-3.5 w-3.5" />,
      action: () => onDelete(cat.id),
      hidden: !canEdit,
      danger: true,
    },
  ];

  const visibleActions = buttonActions.filter((a) => !a.hidden);

  return (
    <article
      className="group flex flex-col w-full cursor-pointer"
      onClick={() => onDetails(cat.id)}
    >
      {/* Image container */}
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-muted transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-black/50 dark:group-hover:shadow-secondary/5">
        <img
          src={imageSrc}
          alt={cat.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          onError={() => setImageError(true)}
          onContextMenu={handleContextMenu}
          draggable={false}
          loading="lazy"
          decoding="async"
        />

        {/* Desktop hover overlay */}
        <div className="hidden md:flex absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Action buttons */}
          <div className="absolute bottom-0 inset-x-0 flex items-center justify-center gap-1.5 pb-4">
            {visibleActions.map((action) => (
              <Button
                key={action.label}
                aria-label={action.label}
                title={action.label}
                onClick={(e) => {
                  e.stopPropagation();
                  action.action();
                }}
                disabled={action.disabled}
                variant={action.danger ? "danger" : "outline"}
                size="icon-xs"
                className={cn(
                  "rounded-xl",
                  !action.danger && "bg-white/10 border-white/20 text-white hover:bg-white/20"
                )}
              >
                {action.icon}
              </Button>
            ))}
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-2.5 left-2.5">
          <span className="inline-flex items-center h-[18px] px-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-[9px] font-medium tracking-[0.14em] uppercase">
            {cat.category?.name || "Noir"}
          </span>
        </div>

        {/* Favorite indicator */}
        {favorited && (
          <div className="absolute top-2.5 right-2.5">
            <div className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-black/40 backdrop-blur-md border border-red-400/30">
              <RiHeartFill className="h-2.5 w-2.5 text-red-400" />
            </div>
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="pt-2.5 pb-1 px-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[13px] font-semibold tracking-tight text-foreground leading-snug line-clamp-1">
            {cat.name}
          </h3>
          {(cat.color || cat.sourceName) && (
            <span className="shrink-0 text-[10px] text-muted-foreground/60 font-mono mt-[1px] capitalize">
              {cat.color || cat.sourceName}
            </span>
          )}
        </div>

        {/* Mobile actions */}
        <div className="flex md:hidden items-center gap-1.5 mt-2.5">
          {visibleActions.map((action) => (
            <Button
              key={action.label}
              aria-label={action.label}
              title={action.label}
              onClick={(e) => {
                e.stopPropagation();
                action.action();
              }}
              disabled={action.disabled}
              variant={action.danger ? "danger" : "outline"}
              size="icon-xs"
              className="rounded-xl"
            >
              {action.icon}
            </Button>
          ))}
        </div>
      </div>
    </article>
  );
};
