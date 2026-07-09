import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Comment {
    id: number;
    user: { id: number; name: string; is_admin: boolean };
    body: string;
    created_at: string;
}

interface Props {
    comments: Comment[];
    orderId: number;
}

export default function CommentSection({ comments, orderId }: Props) {
    const { auth } = usePage().props as {
        auth: { user: { id: number; name: string } };
    };
    const [body, setBody] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!body.trim()) return;

        setSubmitting(true);
        router.post(
            `/orders/${orderId}/comments`,
            { body },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setBody('');
                    setSubmitting(false);
                },
                onError: () => setSubmitting(false),
            },
        );
    };

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                Comments
            </h3>

            <div className="max-h-72 space-y-3 overflow-y-auto">
                {comments.length === 0 && (
                    <p className="py-4 text-center text-sm text-muted-foreground">
                        No comments yet.
                    </p>
                )}
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="rounded-lg border bg-card p-3"
                    >
                        <div className="mb-1 flex items-center justify-between text-xs">
                            <span
                                className={
                                    'font-semibold ' +
                                    (comment.user.is_admin
                                        ? 'text-emerald-600'
                                        : 'text-sky-600')
                                }
                            >
                                {comment.user.name}
                            </span>
                            <span className="text-muted-foreground">
                                {new Date(
                                    comment.created_at,
                                ).toLocaleString()}
                            </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">
                            {comment.body}
                        </p>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={2}
                    placeholder="Write a comment..."
                    className="min-h-0 flex-1 resize-none rounded border border-input bg-background px-3 py-2 text-sm"
                />
                <button
                    type="submit"
                    disabled={submitting || !body.trim()}
                    className="self-end rounded bg-[#0f172a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? '...' : 'Post'}
                </button>
            </form>
        </div>
    );
}
