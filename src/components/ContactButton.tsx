"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { ContactModal } from "./ContactModal";

interface ContactButtonProps {
  placeName: string;
}

export function ContactButton({ placeName }: ContactButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition-colors"
      >
        Contact Us
      </button>
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} apartmentName={placeName} />
    </>
  );
}
