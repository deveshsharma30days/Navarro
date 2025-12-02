import React from 'react';
import { Package, FileText, CheckSquare, Calculator, DollarSign, Ship, Box } from 'lucide-react';

export default function GlobalTradeTools() {
  const tools = [
    {
      title: "CBM Calculator",
      description: "Calculate cubic meters for shipping containers and optimize your cargo space efficiently.",
      icon: Package,
      link: "#cbm-calculator"
    },
    {
      title: "Packing List and Invoice Templates",
      description: "Download professional templates for packing lists and commercial invoices for international shipping.",
      icon: FileText,
      link: "#templates"
    },
    {
      title: "Documentation Check",
      description: "Verify your shipping documentation is complete and compliant with international trade regulations.",
      icon: CheckSquare,
      link: "#doc-check"
    },
    {
      title: "Duty Calculation",
      description: "Calculate import duties and taxes for goods entering different countries worldwide.",
      icon: Calculator,
      link: "#duty-calc"
    },
    {
      title: "Landing Cost Calculator",
      description: "Calculate the landed costs and sell pricing of imported goods to make smarter decisions.",
      icon: DollarSign,
      link: "#landing-cost"
    },
    {
      title: "Vessel Tracking",
      description: "Track vessels in real-time across global shipping routes with live AIS data.",
      icon: Ship,
      link: "https://www.marinetraffic.com/en/ais/home/centerx:2.7/centery:51.2/zoom:6",
      external: true
    },
    {
      title: "Container Tracking",
      description: "Track your shipping containers across carriers and get real-time status updates.",
      icon: Box,
      link: "#container-tracking"
    }
  ];

  return (
    <main className="min-h-screen py-20 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Global Trade <span className="text-cyan-400">Tools</span>
          </h1>
          <p className="text-xl text-gray-700 mb-4 font-medium">
            Quickly find the best Global Trade Tools. Curated by Navarro shipping experts.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-primary-500 mx-auto rounded-full"></div>
        </div>

        {/* Featured Software Label */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-500 tracking-wider uppercase">Featured Tools</h2>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            const isExternal = tool.external;
            
            return (
              <a
                key={index}
                href={tool.link}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : ""}
                className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-8 shadow-xl border-2 border-cyan-200 hover:shadow-2xl hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              >
                <div className="flex items-start mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {tool.title}
                    </h3>
                  </div>
                </div>
                <p className="text-base text-gray-700 leading-relaxed font-medium">
                  {tool.description}
                </p>
                {isExternal && (
                  <div className="mt-4 flex items-center text-cyan-400 text-sm font-semibold">
                    <span>Visit Tool</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                )}
              </a>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-16">
          <p className="text-gray-600 text-lg">
            Would you like to add your own product for review?{' '}
            <a href="#suggest" className="text-cyan-400 font-semibold hover:underline">
              Suggest a solution.
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}