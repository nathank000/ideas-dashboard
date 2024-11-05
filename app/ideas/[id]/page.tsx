import { IdeaDetailWrapper } from "@/components/ideas/idea-detail-wrapper";

export default function IdeaDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <IdeaDetailWrapper id={params.id} />
    </div>
  );
}