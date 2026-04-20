"use client";

import Image from "next/image";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useMySubmissions } from "@/hooks/cat/useMySubmissions";
import { usePendingSubmissions } from "@/hooks/cat/usePendingSubmissions";
import { useReviewSubmission } from "@/hooks/cat/useReviewSubmission";
import { CatSubmission, SubmissionStatus } from "@/types/submission";
import { PaginationControls } from "@/components/layout/pagination-control";
import { Button } from "@/components/ui/button";
import {
    RiCheckLine,
    RiCloseLine,
    RiLoader4Line,
    RiTimeLine,
    RiSendPlaneLine,
} from "react-icons/ri";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useSubmissionNotifications } from "@/hooks/useSubmissionNotifications";
import { useNotificationStore } from "@/hooks/useNotificationStore";
import { useEffect } from "react";

const statusConfig: Record<SubmissionStatus, { label: string; className: string }> = {
    PENDING: { label: "Pending", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
    APPROVED: { label: "Approved", className: "bg-green-500/10 text-green-600 border-green-500/20" },
    REJECTED: { label: "Rejected", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

function StatusBadge({ status }: { status: SubmissionStatus }) {
    const config = statusConfig[status];
    return (
        <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border", config.className)}>
            {config.label}
        </span>
    );
}

function SubmissionCard({
    submission,
    onApprove,
    onReject,
    isAdmin,
    loading,
}: {
    submission: CatSubmission;
    onApprove?: (id: string) => void;
    onReject?: (id: string) => void;
    isAdmin: boolean;
    loading: boolean;
}) {
    return (
        <div className="group rounded-xl border border-border bg-background/60 overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
            <div className="relative aspect-square w-full overflow-hidden border-b border-border/50 bg-muted/30">
                {submission.image ? (
                    <Image
                        src={submission.image}
                        alt={submission.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        <RiSendPlaneLine className="w-6 h-6 text-muted-foreground/40" />
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">No Image</span>
                    </div>
                )}

                {/* Status Badge Overlay */}
                <div className="absolute top-3 right-3 drop-shadow-sm">
                    <StatusBadge status={submission.status} />
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex-1 flex flex-col space-y-4">
                <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-[15px] font-semibold leading-tight text-foreground truncate">{submission.name}</p>
                    </div>
                    {submission.color && (
                        <p className="text-[12px] text-muted-foreground font-medium">{submission.color}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px] text-muted-foreground">
                    {submission.category && (
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] uppercase tracking-wider font-medium opacity-60 text-foreground/70">Category</span>
                            <span className="text-foreground/90 font-medium truncate">{submission.category.name}</span>
                        </div>
                    )}
                    {submission.sourceName && (
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] uppercase tracking-wider font-medium opacity-60 text-foreground/70">Source</span>
                            <span className="text-foreground/90 font-medium truncate">{submission.sourceName}</span>
                        </div>
                    )}
                    {submission.createdAt && (
                        <div className="flex flex-col gap-0.5 col-span-2">
                            <span className="text-[10px] uppercase tracking-wider font-medium opacity-60 text-foreground/70">Submitted On</span>
                            <span className="flex items-center gap-1.5 text-foreground/90 font-medium">
                                <RiTimeLine className="w-3 h-3 opacity-60" />
                                {new Date(submission.createdAt).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    )}
                </div>

                {submission.notes && (
                    <div className="space-y-1.5 pt-3 border-t border-border/50">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-foreground/40">Notes</span>
                        <p className="text-[12px] text-muted-foreground/90 leading-relaxed italic line-clamp-3">
                            &quot;{submission.notes}&quot;
                        </p>
                    </div>
                )}

                {submission.status === "REJECTED" && submission.rejectionReason && (
                    <div className="bg-destructive/5 rounded-lg p-2.5 border border-destructive/10">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-destructive/70 block mb-0.5">Rejection Reason</span>
                        <p className="text-[12px] text-destructive leading-relaxed">
                            {submission.rejectionReason}
                        </p>
                    </div>
                )}

                <div className="mt-auto pt-2">
                    {isAdmin && submission.status === "PENDING" && (
                        <div className="flex gap-2.5 pt-3 border-t border-border/50">
                            <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 h-9 gap-1.5 text-[12px] font-medium text-green-600 border-green-500/20 hover:bg-green-500/10 hover:border-green-500/30 transition-colors"
                                disabled={loading}
                                onClick={() => onApprove?.(submission.id)}
                            >
                                {loading ? <RiLoader4Line className="w-3.5 h-3.5 animate-spin" /> : <RiCheckLine className="w-3.5 h-3.5" />}
                                Approve
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 h-9 gap-1.5 text-[12px] font-medium text-destructive border-destructive/20 hover:bg-destructive/10 hover:border-destructive/30 transition-colors"
                                disabled={loading}
                                onClick={() => onReject?.(submission.id)}
                            >
                                {loading ? <RiLoader4Line className="w-3.5 h-3.5 animate-spin" /> : <RiCloseLine className="w-3.5 h-3.5" />}
                                Reject
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function SubmissionCardSkeleton() {
    return (
        <div className="rounded-xl border border-border bg-background/60 overflow-hidden flex flex-col h-full animate-pulse">
            <div className="aspect-video w-full bg-muted/40" />
            <div className="p-4 space-y-4">
                <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-muted/40 rounded" />
                    <div className="h-3 w-1/4 bg-muted/30 rounded" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <div className="h-2 w-1/2 bg-muted/20 rounded" />
                        <div className="h-3 w-3/4 bg-muted/30 rounded" />
                    </div>
                    <div className="space-y-1">
                        <div className="h-2 w-1/2 bg-muted/20 rounded" />
                        <div className="h-3 w-3/4 bg-muted/30 rounded" />
                    </div>
                </div>
                <div className="pt-3 border-t border-border/50">
                    <div className="h-12 w-full bg-muted/20 rounded" />
                </div>
            </div>
        </div>
    );
}

export default function SubmissionsPage() {
    const { user } = useAuthStore();
    const isAdmin = user?.isAdmin ?? false;

    const {
        submissions: mySubmissions,
        pagination: myPagination,
        loading: myLoading,
        handlePageChange: myPageChange,
    } = useMySubmissions();

    const {
        submissions: pendingSubmissions,
        pagination: pendingPagination,
        loading: pendingLoading,
        refetch: refetchPending,
        handlePageChange: pendingPageChange,
    } = usePendingSubmissions();

    const { approve, reject, loading: reviewLoading } = useReviewSubmission();
    const { clear: clearNotifications } = useNotificationStore();

    useSubmissionNotifications(mySubmissions);

    useEffect(() => {
        clearNotifications();
    }, [clearNotifications]);

    const handleApprove = async (id: string) => {
        const ok = await approve(id);
        if (ok) {
            toast.success("Submission approved — cat added to the catalog.");
            refetchPending();
        } else {
            toast.error("Failed to approve submission.");
        }
    };

    const handleReject = async (id: string) => {
        const reason = window.prompt("Reason for rejection (optional):");
        const ok = await reject(id, reason ?? undefined);
        if (ok) {
            toast.success("Submission rejected.");
            refetchPending();
        } else {
            toast.error("Failed to reject submission.");
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Submissions</h1>
                <p className="text-[13px] text-muted-foreground mt-1">
                    {isAdmin
                        ? "Review and manage pending cat submissions from users."
                        : "Track the status of your cat submissions."}
                </p>
            </div>

            {isAdmin && (
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[15px] font-semibold">Pending review</h2>
                        {pendingPagination && (
                            <span className="text-[12px] text-muted-foreground">
                                {pendingPagination.totalItems} pending
                            </span>
                        )}
                    </div>

                    {pendingLoading ? (
                        <div className="grid gap-3 sm:grid-cols-2">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <SubmissionCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : pendingSubmissions.length === 0 ? (
                        <div className="rounded-xl border border-border bg-background/60 p-8 text-center text-[13px] text-muted-foreground">
                            No pending submissions.
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {pendingSubmissions.map((s) => (
                                    <SubmissionCard
                                        key={s.id}
                                        submission={s}
                                        isAdmin
                                        loading={reviewLoading}
                                        onApprove={handleApprove}
                                        onReject={handleReject}
                                    />
                                ))}
                            </div>
                            {pendingPagination && (pendingPagination.hasNext || pendingPagination.hasPrevious) && (
                                <PaginationControls
                                    currentPage={pendingPagination.currentPage}
                                    totalPages={pendingPagination.totalPages}
                                    hasPrevious={pendingPagination.hasPrevious}
                                    hasNext={pendingPagination.hasNext}
                                    onPageChange={pendingPageChange}
                                />
                            )}
                        </>
                    )}
                </section>
            )}

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-[15px] font-semibold">
                        {isAdmin ? "All user submissions" : "My submissions"}
                    </h2>
                    {myPagination && (
                        <span className="text-[12px] text-muted-foreground">
                            {myPagination.totalItems} total
                        </span>
                    )}
                </div>

                {myLoading ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <SubmissionCardSkeleton key={i} />
                        ))}
                    </div>
                ) : mySubmissions.length === 0 ? (
                    <div className="rounded-xl border border-border bg-background/60 p-8 text-center space-y-2">
                        <RiSendPlaneLine className="w-8 h-8 text-muted-foreground mx-auto" />
                        <p className="text-[13px] text-muted-foreground">No submissions yet.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {mySubmissions.map((s) => (
                                <SubmissionCard
                                    key={s.id}
                                    submission={s}
                                    isAdmin={false}
                                    loading={false}
                                />
                            ))}
                        </div>
                        {myPagination && (myPagination.hasNext || myPagination.hasPrevious) && (
                            <PaginationControls
                                currentPage={myPagination.currentPage}
                                totalPages={myPagination.totalPages}
                                hasPrevious={myPagination.hasPrevious}
                                hasNext={myPagination.hasNext}
                                onPageChange={myPageChange}
                            />
                        )}
                    </>
                )}
            </section>
        </div>
    );
}
