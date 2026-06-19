"use client";

import { useState } from "react";
import { Building2, DollarSign, Users, BarChart3, CheckCircle2, ArrowRight, Mail, Phone, Globe } from "lucide-react";

const tiers = [
  {
    name: "Basic",
    price: "Free",
    period: "",
    description: "Get listed on Texas Rent Finder with basic visibility",
    features: [
      "Standard listing placement",
      "Up to 3 photos",
      "Basic analytics (views)",
      "Contact form integration",
      "Google Reviews display",
    ],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "Stand out with premium placement and enhanced listing",
    features: [
      "Everything in Basic",
      "Up to 20 photos",
      "Priority placement in search",
      "Featured on city pages",
      "Lead tracking dashboard",
      "Monthly performance report",
      "Verified badge",
    ],
    cta: "Start Pro Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Full platform access for property management companies",
    features: [
      "Everything in Pro",
      "Unlimited photos",
      "API access for bulk updates",
      "Custom branding options",
      "Dedicated account manager",
      "Tenant review management",
      "Competitor analysis",
      "Priority support",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const stats = [
  { icon: Users, value: "12K+", label: "Monthly Visitors" },
  { icon: BarChart3, value: "5,600+", label: "Listed Properties" },
  { icon: DollarSign, value: "73%", label: "Avg. Lead Conversion" },
  { icon: Building2, value: "150+", label: "Property Partners" },
];

export default function PartnerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Partner with Texas Rent Finder</h1>
          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            Reach thousands of renters searching for apartments across Texas. List your properties and connect with qualified leads.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-emerald-200" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-emerald-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">Choose Your Plan</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Start free and upgrade as your portfolio grows. All plans include Google Reviews integration.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 border ${
                  tier.highlight
                    ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 ring-2 ring-emerald-500"
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                }`}
              >
                {tier.highlight && (
                  <span className="inline-block bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{tier.price}</span>
                  {tier.period && <span className="text-gray-500 dark:text-gray-400 text-sm">{tier.period}</span>}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{tier.description}</p>
                <ul className="space-y-2.5 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    tier.highlight
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Create Account", desc: "Sign up as a property manager and verify your listing ownership." },
              { step: "2", title: "Add Properties", desc: "Upload photos, set pricing, and add amenity details for each property." },
              { step: "3", title: "Get Leads", desc: "Receive inquiries directly through the platform and track performance." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{item.step}</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">Get in Touch</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
            Interested in partnering? Fill out the form below and we&apos;ll get back to you within 24 hours.
          </p>

          {submitted ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Thank you!</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                We&apos;ve received your inquiry. Our team will contact you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  placeholder="Tell us about your properties and how we can help..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition-colors"
              >
                Send Inquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
