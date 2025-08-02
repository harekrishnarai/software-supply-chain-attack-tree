import React from 'react'
import { Link } from 'react-router-dom'
import { 
  TreePineIcon, 
  ShieldIcon, 
  AlertTriangleIcon, 
  BookOpenIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from 'lucide-react'

const features = [
  {
    name: 'Interactive Attack Tree',
    description: 'Explore a hierarchical visualization of 100+ attack vectors and techniques targeting software supply chains.',
    icon: TreePineIcon,
    href: '/attack-tree',
    color: 'bg-primary-500'
  },
  {
    name: 'Attack Vectors Database',
    description: 'Browse detailed descriptions, real-world examples, and references for all documented attack vectors.',
    icon: AlertTriangleIcon,
    href: '/attack-vectors',
    color: 'bg-danger-500'
  },
  {
    name: 'Security Safeguards',
    description: 'Discover countermeasures and best practices that mitigate supply chain security risks.',
    icon: ShieldIcon,
    href: '/safeguards',
    color: 'bg-success-500'
  },
  {
    name: 'Research References',
    description: 'Access 300+ curated resources including scientific papers, reports, and industry publications.',
    icon: BookOpenIcon,
    href: '/references',
    color: 'bg-warning-500'
  }
]

const highlights = [
  'Comprehensive taxonomy of supply chain attacks',
  'Real-world incident mappings and examples',
  'Evidence-based research and analysis',
  'Modern, responsive interface design',
  'Interactive visualization capabilities',
  'Educational and training material'
]

export default function Home() {
  return (
    <div className="min-h-full">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Software Supply Chain
              <span className="block text-primary-200">Risk Explorer</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-primary-100">
              A modern, interactive tool to explore attack vectors, security risks, and countermeasures 
              in software supply chains. Built with contemporary web technologies for enhanced performance and user experience.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Link
                to="/attack-tree"
                className="btn-primary text-lg px-8 py-3"
              >
                Explore Attack Tree
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/attack-vectors"
                className="btn-secondary bg-white text-primary-700 hover:bg-gray-50 text-lg px-8 py-3"
              >
                Browse Attack Vectors
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Comprehensive Supply Chain Security Analysis
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
              Explore our comprehensive database of attack vectors, security safeguards, and research references 
              compiled from real-world incidents and scientific literature.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link
                key={feature.name}
                to={feature.href}
                className="group relative bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className={`inline-flex p-3 rounded-lg ${feature.color}`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 group-hover:text-primary-600">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center text-primary-600 group-hover:text-primary-700">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Highlights section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Why Use This Tool?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Our risk explorer provides a comprehensive, evidence-based approach to understanding 
                and mitigating software supply chain security risks.
              </p>
              
              <div className="mt-8 space-y-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="flex-shrink-0 h-6 w-6 text-success-500 mt-0.5" />
                    <span className="ml-3 text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Research Foundation
                </h3>
                <p className="text-gray-600 mb-6">
                  This tool is based on extensive research analyzing real-world incidents, 
                  scientific literature, and industry best practices in supply chain security.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-600">100+</div>
                    <div className="text-sm text-gray-500">Attack Vectors</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-600">300+</div>
                    <div className="text-sm text-gray-500">References</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-600">50+</div>
                    <div className="text-sm text-gray-500">Real Incidents</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-600">25+</div>
                    <div className="text-sm text-gray-500">Safeguards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to Explore Supply Chain Risks?
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Start with our interactive attack tree to visualize potential threats.
            </p>
            <div className="mt-8">
              <Link
                to="/attack-tree"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Get Started
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}