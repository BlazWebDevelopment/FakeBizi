import type { Metadata } from "next";
import Link from "next/link";
import CompanyLogo from "@/components/CompanyLogo";
import companies from "@/data/companies.json";
import type { Company } from "@/data/types";

const allCompanies = companies as Company[];

export const metadata: Metadata = {
  title: "Archive — Dissolved & Inactive Entities",
  description:
    "Browse archived US business entities that have been dissolved or are currently inactive.",
};

const archived = allCompanies
  .filter((c) => c.status === "Dissolved" || c.status === "Inactive")
  .sort(
    (a, b) =>
      new Date(b.registrationDate).getTime() -
      new Date(a.registrationDate).getTime()
  );

const dissolved = archived.filter((c) => c.status === "Dissolved");
const inactive = archived.filter((c) => c.status === "Inactive");

export default function ArchivePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-gray-700 transition-colors">
            Home
          </Link>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium">Archive</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900">Entity Archive</h1>
        <p className="text-sm text-gray-500 mt-1">
          Dissolved and inactive business entities on record
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <p className="text-2xl font-bold text-gray-900">{archived.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total Archived</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <p className="text-2xl font-bold text-red-600">{dissolved.length}</p>
          <p className="text-xs text-gray-500 mt-1">Dissolved</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <p className="text-2xl font-bold text-yellow-600">{inactive.length}</p>
          <p className="text-xs text-gray-500 mt-1">Inactive</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Company Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  State
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Registered
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Owner
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {archived.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <CompanyLogo name={c.name} logo={c.logo} size="sm" />
                      <div>
                        <Link
                          href={`/company/${c.id}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {c.name}
                        </Link>
                        <p className="text-xs text-gray-400">{c.industry}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                        c.status === "Dissolved"
                          ? "bg-red-50 text-red-700 ring-red-600/20"
                          : "bg-yellow-50 text-yellow-700 ring-yellow-600/20"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">
                    {c.stateOfFormation}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                    {c.entityType}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                    {new Date(c.registrationDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                    {c.owner}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
