import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Common questions about using BizLedger to search and verify US business entities.",
};

const faqs = [
  {
    q: "What is BizLedger?",
    a: "BizLedger is a free business entity lookup platform that allows you to search, verify, and explore public registration records for companies across the United States. We aggregate data from public sources so you can find the information you need in one place.",
  },
  {
    q: "How do I search for a company?",
    a: 'Use the search bar on the homepage or the dedicated Search page. You can search by company name, owner name, state, city, industry, or EIN. You can also filter results by entity type, status, state, and industry using the sidebar filters.',
  },
  {
    q: "What does entity status mean?",
    a: '"Active" means the entity is currently registered and in good standing. "Inactive" means the entity exists but is not currently in good standing, often due to missed filings or unpaid fees. "Dissolved" means the entity has been formally terminated and is no longer a legal entity.',
  },
  {
    q: "What is a Registered Agent?",
    a: "A registered agent is a person or business designated to receive legal documents and official government correspondence on behalf of a company. Every formally registered business entity is required to maintain a registered agent in the state where it is formed.",
  },
  {
    q: "What is an EIN?",
    a: "An Employer Identification Number (EIN) is a unique nine-digit number assigned by the IRS to business entities for tax filing and identification purposes. It functions like a Social Security Number but for businesses.",
  },
  {
    q: "What types of entities are listed?",
    a: "BizLedger includes LLCs, Corporations, S-Corporations, PLLCs, Partnerships, Sole Proprietorships, Cooperatives, Non-Profits, and other entity types registered at the state level.",
  },
  {
    q: "How current is the data?",
    a: "Our database is refreshed regularly from publicly available government sources. However, there may be delays between when a filing occurs at the state level and when it appears in our system. Always verify critical information directly with the relevant Secretary of State office.",
  },
  {
    q: "Can I use this data for background checks or due diligence?",
    a: "BizLedger data can be a useful starting point for business verification and due diligence. However, we recommend cross-referencing with the official state filing office and other authoritative sources for critical decisions. This platform is for informational purposes only.",
  },
  {
    q: "What is the difference between a Company Name and DBA?",
    a: '"Company Name" is the legal name under which the entity is registered. "DBA" (Doing Business As) is a trade name or assumed name that the company operates under publicly. A company may have multiple DBAs.',
  },
  {
    q: "How do I report incorrect information?",
    a: "If you find incorrect or outdated information, please contact us through our Contact page. We take data accuracy seriously and will review and update records as needed.",
  },
  {
    q: "Is BizLedger free to use?",
    a: "Yes, BizLedger is completely free for basic business entity searches and lookups. We believe in open access to public business registration data.",
  },
  {
    q: "What states are covered?",
    a: "BizLedger covers business entities from all 50 US states and the District of Columbia. You can browse our coverage by visiting the Browse by State page.",
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700 transition-colors">
          Home
        </Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-medium">FAQ</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h1>
      <p className="text-sm text-gray-500 mt-1 mb-8">
        Common questions about searching and using BizLedger
      </p>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer px-6 py-4 hover:bg-gray-50 transition-colors list-none">
              <span className="text-sm font-semibold text-gray-900 pr-4">
                {faq.q}
              </span>
              <svg
                className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div className="px-6 pb-4">
              <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          </details>
        ))}
      </div>

      <div className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
        <h2 className="text-base font-semibold text-gray-900">Still have questions?</h2>
        <p className="text-sm text-gray-500 mt-1">
          We&apos;re here to help. Reach out to our team for assistance.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
