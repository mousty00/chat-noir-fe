"use client";

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
        <div className="rounded-xl border border-border bg-background/60 p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
                <div>
                    <p className="text-[14px] font-semibold">{submission.name}</p>
                    {submission.color && (
                        <p className="text-[12px] text-muted-foreground">{submission.color}</p>
                    )}
                </div>
                <StatusBadge status={submission.status} />
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] text-muted-foreground">
                {submission.category && (
                    <span>Category: <span className="text-foreground">{submission.category.name}</span></span>
                )}
                {submission.sourceName && (
                    <span>Source: <span className="text-foreground">{submission.sourceName}</span></span>
                )}
                {submission.createdAt && (
                    <span className="flex items-center gap-1">
                        <RiTimeLine className="w-3 h-3" />
                        {new Date(submission.createdAt).toLocaleDateString()}
                    </span>
                )}
            </div>

            {submission.notes && (
                <p className="text-[12px] text-muted-foreground border-t border-border pt-2">
                    {submission.notes}
                </p>
            )}

            {submission.status === "REJECTED" && submission.rejectionReason && (
                <p className="text-[12px] text-destructive border-t border-border pt-2">
                    Reason: {submission.rejectionReason}
                </p>
            )}

            {isAdmin && submission.status === "PENDING" && (
                <div className="flex gap-2 pt-1 border-t border-border">
                    <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-1.5 text-[12px] text-green-600 border-green-500/30 hover:bg-green-500/10"
                        disabled={loading}
                        onClick={() => onApprove?.(submission.id)}
                    >
                        {loading ? <RiLoader4Line className="w-3.5 h-3.5 animate-spin" /> : <RiCheckLine className="w-3.5 h-3.5" />}
                        Approve
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-1.5 text-[12px] text-destructive border-destructive/30 hover:bg-destructive/10"
                        disabled={loading}
                        onClick={() => onReject?.(submission.id)}
                    >
                        {loading ? <RiLoader4Line className="w-3.5 h-3.5 animate-spin" /> : <RiCloseLine className="w-3.5 h-3.5" />}
                        Reject
                    </Button>
                </div>
            )}
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
                                <div key={i} className="rounded-xl border border-border bg-background/60 p-4 h-[120px] animate-pulse" />
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
                            <div key={i} className="rounded-xl border border-border bg-background/60 p-4 h-[120px] animate-pulse" />
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
