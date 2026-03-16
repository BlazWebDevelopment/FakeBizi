import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import StatusBadge from "@/components/StatusBadge";
import CompanyLogo from "@/components/CompanyLogo";
import companies from "@/data/companies.json";
import type { Company } from "@/data/types";

const allCompanies = companies as Company[];

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const company = allCompanies.find((c) => c.id === id);
  if (!company) return { title: "Company Not Found" };
  return {
    title: company.name,
    description: `${company.name} — ${company.entityType} registered in ${company.stateOfFormation}. ${company.description}`,
  };
}

export function generateStaticParams() {
  return allCompanies.map((c) => ({ id: c.id }));
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        {value}
      </dd>
    </div>
  );
}

export default async function CompanyPage({ params }: PageProps) {
  const { id } = await params;
  const company = allCompanies.find((c) => c.id === id);

  if (!company) notFound();

  const fullAddress = `${company.address.street}, ${company.address.city}, ${company.address.state} ${company.address.zip}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link
          href="/"
          className="hover:text-gray-700 transition-colors"
        >
          Home
        </Link>
        <svg
          className="w-3.5 h-3.5"
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
        <Link
          href="/search"
          className="hover:text-gray-700 transition-colors"
        >
          Search
        </Link>
        <svg
          className="w-3.5 h-3.5"
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
        <span className="text-gray-900 font-medium truncate">
          {company.name}
        </span>
      </nav>

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <CompanyLogo name={company.name} logo={company.logo} size="lg" />
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900">
                  {company.name}
                </h1>
                {company.lastUpdated && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-full px-2.5 py-1 ring-1 ring-inset ring-blue-600/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Updated {company.lastUpdated}
                  </span>
                )}
              </div>
              {company.dba !== company.name && (
                <p className="text-sm text-gray-500 mt-1">
                  DBA: {company.dba}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">{company.description}</p>
            </div>
          </div>
          <StatusBadge status={company.status} />
        </div>
      </div>

      {/* Details */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entity Information */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            Entity Information
          </h2>
          <dl className="divide-y divide-gray-100">
            <InfoRow label="Entity Type" value={company.entityType} />
            <InfoRow label="State of Formation" value={company.stateOfFormation} />
            <InfoRow
              label="Registration Date"
              value={new Date(company.registrationDate).toLocaleDateString(
                "en-US",
                { month: "long", day: "numeric", year: "numeric" }
              )}
            />
            <InfoRow label="EIN" value={company.ein} />
            <InfoRow label="Industry" value={company.industry} />
            <InfoRow label="Registered Agent" value={company.registeredAgent} />
          </dl>
        </div>

        {/* Owner & Contact */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Owner &amp; Contact
          </h2>
          <dl className="divide-y divide-gray-100">
            <InfoRow label="Owner / Principal" value={company.owner} />
            <InfoRow label="Email" value={company.email} />
            <InfoRow label="Address" value={fullAddress} />
            <InfoRow label="Website" value={company.website} />
          </dl>
        </div>
      </div>

      {/* Financial */}
      <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Financial Overview
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
              Annual Revenue
            </p>
            <p className="text-xl font-bold text-gray-900 mt-1">
              {company.annualRevenue}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
              Employees
            </p>
            <p className="text-xl font-bold text-gray-900 mt-1">
              {typeof company.employees === "number" ? company.employees.toLocaleString() : company.employees}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
              Status
            </p>
            <p className="mt-1">
              <StatusBadge status={company.status} />
            </p>
          </div>
        </div>
      </div>

      {/* Back */}
      <div className="mt-6 flex items-center gap-3">
        <Link
          href="/search"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Search
        </Link>
      </div>
    </div>
  );
}
