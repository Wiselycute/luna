export default function Loading() {
  return (
    <div className="container-page py-10" role="status" aria-busy="true" aria-label="Loading product">
      <div className="grid animate-pulse gap-8 md:grid-cols-2 lg:gap-14">
        <div className="aspect-square rounded-2xl bg-soft" />
        <div className="space-y-4">
          <div className="h-5 w-24 rounded-full bg-soft" />
          <div className="h-12 w-3/4 rounded bg-soft" />
          <div className="h-8 w-28 rounded bg-soft" />
          <div className="h-24 w-full rounded bg-soft" />
          <div className="h-12 w-full rounded-full bg-soft" />
        </div>
      </div>
    </div>
  );
}
