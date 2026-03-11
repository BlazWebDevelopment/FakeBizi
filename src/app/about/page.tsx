import type { Metadata } from "next";
import Link from "next/link";
import companies from "@/data/companies.json";

export const metadata: Metadata = {
  title: "About BizLedger",
  description:
    "Learn about BizLedger, a US business entity search and verification platform.",
};

const total = companies.length;

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700 transition-colors">
          Home
        </Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-medium">About</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-xl p-8 sm:p-12">
        <h1 className="text-3xl font-bold text-gray-900">About BizLedger</h1>
        <div className="mt-6 prose prose-gray max-w-none text-gray-600 space-y-4 text-sm leading-relaxed">
          <p>
            BizLedger is a public business entity search platform that provides
            access to registration records for companies across the United States.
            Our database currently contains <strong>{total.toLocaleString()}</strong>{" "}
            business entities spanning all 50 states and the District of Columbia.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">Our Mission</h2>
          <p>
            We believe business transparency builds trust. BizLedger makes it easy
            for anyone to look up a company&apos;s registration details, verify its
            status, and access publicly available filing information — all in one
            clean, searchable interface.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">What You Can Find</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Company name, DBA (Doing Business As), and entity type</li>
            <li>Filing status — Active, Inactive, or Dissolved</li>
            <li>State of formation and registration date</li>
            <li>Owner or principal officer information</li>
            <li>Registered agent details</li>
            <li>Business address and contact information</li>
            <li>Industry classification</li>
            <li>EIN (Employer Identification Number)</li>
            <li>Reported revenue and employee count</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">Data Sources</h2>
          <p>
            BizLedger aggregates publicly available business registration data from
            state-level filing offices, Secretary of State databases, and other
            government-maintained public records. Our data is refreshed on a regular
            basis to ensure accuracy and currency.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">Disclaimer</h2>
          <p className="text-xs text-gray-400">
            BizLedger is provided for informational and research purposes only. The
            data presented on this platform is sourced from public records and may
            not reflect the most current filing status of any given entity. BizLedger
            does not guarantee the accuracy, completeness, or timeliness of any
            information on this site. Users should verify all information independently
            before making business decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
