"use client";

import { usePaginatedQuery } from "convex/react";
import { Navbar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";
import { api } from "../../../convex/_generated/api";
import { DocumentsTable } from "./documents-table";
import { useSearchParam } from "@/hooks/use-search-param";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Home() {
  const [search] = useSearchParam();
  const {
    results,
    status,
    loadMore
  } = usePaginatedQuery(api.documents.get, { search }, { initialNumItems: 5 });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>

      {/* Spacer for navbar height */}
      <div className="h-16" />

      {/* Main content */}
      <div className="flex-1">
        <TemplatesGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 p-6 text-sm text-gray-600 flex flex-col items-center gap-4">
  {/* Designed By */}
  <div>© {new Date().getFullYear()} Designed & Built by <span className="font-semibold">Lakshay Bansal</span></div>

  {/* Social Links */}
  <div className="flex gap-4">
    <a href="https://github.com/LakshayxBansal" target="_blank" rel="noopener noreferrer">
      <FaGithub className="h-6 w-6 hover:text-black transition" />
    </a>
    <a href="https://instagram.com/onlylakshayji" target="_blank" rel="noopener noreferrer">
      <FaInstagram className="h-6 w-6 hover:text-pink-500 transition" />
    </a>
    <a href="https://x.com/LBansal_123" target="_blank" rel="noopener noreferrer">
      <FaTwitter className="h-6 w-6 hover:text-blue-500 transition" />
    </a>
    <a href="https://www.linkedin.com/in/lakshay-bansal-2b5926250/" target="_blank" rel="noopener noreferrer">
      <FaLinkedin className="h-6 w-6 hover:text-blue-700 transition" />
    </a>
  </div>

  {/* Personal Website */}
  <div>
    <a 
      href="https://lakshayxbansal.com" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="underline hover:text-blue-600 transition"
    >
      Visit My Website
    </a>
  </div>
</footer>

    </div>
  );
}
