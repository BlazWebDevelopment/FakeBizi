import Link from "next/link";
import type { Company } from "@/data/types";
import CompanyLogo from "./CompanyLogo";

export default function CompanyCard({ company }: { company: Company }) {
  const statusColor =
    company.status === "Active"
      ? "bg-green-50 text-green-700 ring-green-600/20"
      : company.status === "Inactive"
        ? "bg-yellow-50 text-yellow-700 ring-yellow-600/20"
        : "bg-red-50 text-red-700 ring-red-600/20";

  return (
    <Link href={`/company/${company.id}`} className="block group">
      <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all">
        <div className="flex items-start gap-3">
          <CompanyLogo name={company.name} logo={company.logo} size="sm" />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                {company.name}
              </h3>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset shrink-0 ${statusColor}`}
              >
                {company.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{company.dba}</p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
              Type
            </p>
            <p className="text-xs text-gray-700">{company.entityType}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
              State
            </p>
            <p className="text-xs text-gray-700">{company.stateOfFormation}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
              Industry
            </p>
            <p className="text-xs text-gray-700">{company.industry}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
              Registered
            </p>
            <p className="text-xs text-gray-700">
              {new Date(company.registrationDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            <span className="font-medium text-gray-600">{company.owner}</span>
          </p>
          <svg
            className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
