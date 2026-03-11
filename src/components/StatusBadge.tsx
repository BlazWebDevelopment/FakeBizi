export default function StatusBadge({ status }: { status: string }) {
  const config =
    status === "Active"
      ? "bg-green-50 text-green-700 ring-green-600/20"
      : status === "Inactive"
        ? "bg-yellow-50 text-yellow-700 ring-yellow-600/20"
        : "bg-red-50 text-red-700 ring-red-600/20";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset ${config}`}
    >
      <span
        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
          status === "Active"
            ? "bg-green-500"
            : status === "Inactive"
              ? "bg-yellow-500"
              : "bg-red-500"
        }`}
      />
      {status}
    </span>
  );
}
