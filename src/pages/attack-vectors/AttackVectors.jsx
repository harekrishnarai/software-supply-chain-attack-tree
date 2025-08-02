import React, { useState } from 'react'
import { SearchIcon, FilterIcon, AlertTriangleIcon } from 'lucide-react'

// Sample attack vectors data
const attackVectors = [
  {
    id: 'AV001',
    name: 'Dependency Confusion',
    category: 'Package Management',
    severity: 'High',
    description: 'Attack that exploits the way package managers resolve dependencies to trick them into installing malicious packages.',
    realWorldExamples: ['Alex Birsan\'s attack on Microsoft, Apple, Tesla', 'PyPI typosquatting campaigns'],
    safeguards: ['Private package registries', 'Package verification', 'Dependency pinning'],
    references: ['CVE-2021-43798', 'Research paper by Birsan 2021']
  },
  {
    id: 'AV002',
    name: 'Compromised Developer Account',
    category: 'Access Control',
    severity: 'Critical',
    description: 'Unauthorized access to developer accounts through credential theft, phishing, or other social engineering techniques.',
    realWorldExamples: ['SolarWinds breach', 'Codecov incident', 'Various GitHub account compromises'],
    safeguards: ['Multi-factor authentication', 'Regular access reviews', 'Privileged access management'],
    references: ['NIST SP 800-63B', 'OWASP Authentication Cheat Sheet']
  },
  {
    id: 'AV003',
    name: 'Malicious Package Upload',
    category: 'Package Management',
    severity: 'High',
    description: 'Direct upload of malicious packages to public or private repositories, often disguised as legitimate software.',
    realWorldExamples: ['NPM event-stream incident', 'PyPI malicious packages', 'RubyGems compromises'],
    safeguards: ['Package scanning', 'Repository monitoring', 'Code signing'],
    references: ['The State of the Software Supply Chain Report', 'Sonatype research']
  },
  {
    id: 'AV004',
    name: 'Build System Compromise',
    category: 'CI/CD',
    severity: 'Critical',
    description: 'Attacks targeting continuous integration and deployment systems to inject malicious code during the build process.',
    realWorldExamples: ['Jenkins vulnerabilities', 'TeamCity compromises', 'Travis CI token exposures'],
    safeguards: ['Build environment isolation', 'Pipeline security scanning', 'Secrets management'],
    references: ['SLSA Framework', 'NIST SSDF guidelines']
  }
]

const categories = ['All', 'Package Management', 'Access Control', 'CI/CD', 'Code Repository', 'Distribution']
const severityLevels = ['All', 'Critical', 'High', 'Medium', 'Low']

export default function AttackVectors() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSeverity, setSelectedSeverity] = useState('All')
  const [selectedVector, setSelectedVector] = useState(null)

  const filteredVectors = attackVectors.filter(vector => {
    const matchesSearch = vector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vector.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || vector.category === selectedCategory
    const matchesSeverity = selectedSeverity === 'All' || vector.severity === selectedSeverity
    
    return matchesSearch && matchesCategory && matchesSeverity
  })

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800'
      case 'High': return 'bg-orange-100 text-orange-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attack Vectors</h1>
            <p className="text-sm text-gray-600 mt-1">
              Comprehensive database of software supply chain attack vectors
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search attack vectors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-64"
              />
            </div>
            
            {/* Filters */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input w-40"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="input w-32"
            >
              {severityLevels.map(severity => (
                <option key={severity} value={severity}>{severity}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex">
        {/* Attack vectors list */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid gap-6">
            {filteredVectors.map((vector) => (
              <div
                key={vector.id}
                className="card hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={() => setSelectedVector(vector)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <AlertTriangleIcon className="h-5 w-5 text-orange-500" />
                      <h3 className="text-lg font-semibold text-gray-900">{vector.name}</h3>
                      <span className="text-sm text-gray-500">({vector.id})</span>
                    </div>
                    
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-sm text-gray-600">{vector.category}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(vector.severity)}`}>
                        {vector.severity}
                      </span>
                    </div>
                    
                    <p className="mt-3 text-gray-700 line-clamp-2">{vector.description}</p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {vector.realWorldExamples.length} real-world examples
                      </div>
                      <div className="text-sm text-primary-600 hover:text-primary-700">
                        View details →
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredVectors.length === 0 && (
              <div className="text-center py-12">
                <AlertTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No attack vectors found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search criteria or filters.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Details panel */}
        {selectedVector && (
          <div className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedVector.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{selectedVector.id}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{selectedVector.category}</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(selectedVector.severity)}`}>
                    {selectedVector.severity}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-sm text-gray-700">{selectedVector.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Real-world Examples</h3>
                <ul className="space-y-1">
                  {selectedVector.realWorldExamples.map((example, index) => (
                    <li key={index} className="text-sm text-gray-700">• {example}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Recommended Safeguards</h3>
                <ul className="space-y-1">
                  {selectedVector.safeguards.map((safeguard, index) => (
                    <li key={index} className="text-sm text-gray-700">• {safeguard}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">References</h3>
                <ul className="space-y-1">
                  {selectedVector.references.map((reference, index) => (
                    <li key={index} className="text-sm text-gray-700">• {reference}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}