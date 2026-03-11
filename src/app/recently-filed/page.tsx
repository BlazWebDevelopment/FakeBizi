import type { Metadata } from "next";
import Link from "next/link";
import CompanyCard from "@/components/CompanyCard";
import companies from "@/data/companies.json";
import type { Company } from "@/data/types";

const allCompanies = companies as Company[];

export const metadata: Metadata = {
  title: "Recently Filed Entities",
  description:
    "Browse the most recently registered business entities in the BizLedger database.",
};

const recent = [...allCompanies]
  .sort(
    (a, b) =>
      new Date(b.registrationDate).getTime() -
      new Date(a.registrationDate).getTime()
  )
  .slice(0, 48);

const thisYear = recent.filter(
  (c) => new Date(c.registrationDate).getFullYear() >= 2024
);
const lastYear = recent.filter(
  (c) => new Date(c.registrationDate).getFullYear() === 2023
);

export default function RecentlyFiledPage() {
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
          <span className="text-gray-900 font-medium">Recently Filed</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900">Recently Filed Entities</h1>
        <p className="text-sm text-gray-500 mt-1">
          The most recently registered business entities in our database
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <p className="text-2xl font-bold text-blue-600">{recent.length}</p>
          <p className="text-xs text-gray-500 mt-1">Shown Below</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <p className="text-2xl font-bold text-green-600">{thisYear.length}</p>
          <p className="text-xs text-gray-500 mt-1">Filed 2024–Present</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <p className="text-2xl font-bold text-gray-900">{lastYear.length}</p>
          <p className="text-xs text-gray-500 mt-1">Filed 2023</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recent.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/search"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors text-sm"
        >
          Search All Entities
          <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
