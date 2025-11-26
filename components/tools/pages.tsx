"use client";

import React, { useState } from 'react';
import { Package, FileText, CheckSquare, DollarSign, Calculator, Ship, Container, ArrowRight, Sparkles, Badge } from 'lucide-react';

export default function GlobalTradeTools() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const tools = [
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "CBM Calculator",
      description: "Calculate cubic meter volume for shipping containers and cargo space optimization.",
      color: "from-violet-500 to-purple-600",
      bgPattern: "bg-violet-50",
      link: "/tools/insideTools/CBM_Calculator",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Packing List & Invoice Templates",
      description: "Professional templates for packing lists and commercial invoices for international trade.",
      color: "from-blue-500 to-cyan-600",
      bgPattern: "bg-blue-50"
    },
    {
      icon: <CheckSquare className="w-8 h-8" />,
      title: "Documentation Check",
      description: "Verify all required export/import documentation is complete and compliant.",
      color: "from-emerald-500 to-teal-600",
      bgPattern: "bg-emerald-50"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Duty Calculation",
      description: "Calculate customs duties, taxes, and tariffs for imported goods accurately.",
      color: "from-amber-500 to-orange-600",
      bgPattern: "bg-amber-50"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Landing Cost Calculator",
      description: "Calculate the landed costs and sell pricing of imported goods to make smarter decisions.",
      color: "from-rose-500 to-pink-600",
      bgPattern: "bg-rose-50"
    },
    {
      icon: <Ship className="w-8 h-8" />,
      title: "Vessel Tracking",
      description: "Track vessels in real-time worldwide with live AIS data and port information.",
      color: "from-sky-500 to-blue-600",
      bgPattern: "bg-sky-50",
      link: "https://www.marinetraffic.com/en/ais/home/centerx:2.7/centery:51.2/zoom:6",
      badge: "Live"
    },
    {
      icon: <Container className="w-8 h-8" />,
      title: "Container Tracking",
      description: "Monitor your shipping containers across carriers and get real-time status updates.",
      color: "from-indigo-500 to-purple-600",
      bgPattern: "bg-indigo-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-600">Curated by IncoDocs Experts</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Global Trade Tools
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Streamline your international shipping operations with our comprehensive suite of professional tools
          </p>
          
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
            Suggest a Solution
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${tool.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`}></div>
              
              {/* Card */}
              <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
                {/* Badge */}
                {tool.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs font-medium text-green-600">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      {tool.badge}
                    </span>
                  </div>
                
                )}

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${tool.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {tool.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-cyan-600 transition-all">
                  {tool.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {tool.description}
                </p>

                {/* Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  {tool.link ? (
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${tool.color} bg-clip-text text-transparent hover:gap-3 transition-all`}
                    >
                      Launch Tool
                      <ArrowRight className={`w-4 h-4 ${hoveredCard === index ? 'translate-x-1' : ''} transition-transform`} style={{color: 'currentColor'}} />
                    </a>
                  ) : (
                    <button className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${tool.color} bg-clip-text text-transparent hover:gap-3 transition-all`}>
                      Explore Tool
                      <ArrowRight className={`w-4 h-4 ${hoveredCard === index ? 'translate-x-1' : ''} transition-transform`} style={{color: 'currentColor'}} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 hover:shadow-lg transition-all">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              7+
            </div>
            <div className="text-gray-600 text-sm">Essential Tools</div>
          </div>
          
          <div className="text-center p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 hover:shadow-lg transition-all">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-gray-600 text-sm">Available Access</div>
          </div>
          
          <div className="text-center p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 hover:shadow-lg transition-all">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              100%
            </div>
            <div className="text-gray-600 text-sm">Trade Compliant</div>
          </div>
        </div>
      </div>
    </div>
  );
}