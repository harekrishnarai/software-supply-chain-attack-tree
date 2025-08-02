import React, { useState } from 'react'
import { SearchIcon, ShieldIcon } from 'lucide-react'

// Sample safeguards data
const safeguards = [
  {
    id: 'SG001',
    name: 'Multi-Factor Authentication',
    category: 'Access Control',
    effectiveness: 'High',
    description: 'Require additional authentication factors beyond passwords to access critical systems and accounts.',
    implementation: ['Enable MFA on all developer accounts', 'Use hardware security keys', 'Implement backup authentication methods'],
    mitigatedAttacks: ['Compromised Developer Account', 'Credential Theft', 'Phishing Attacks'],
    references: ['NIST SP 800-63B', 'OWASP Authentication Cheat Sheet']
  },
  {
    id: 'SG002',
    name: 'Code Signing',
    category: 'Integrity',
    effectiveness: 'High',
    description: 'Digitally sign code and packages to ensure authenticity and detect tampering.',
    implementation: ['Implement signing in CI/CD pipeline', 'Use Hardware Security Modules', 'Verify signatures at runtime'],
    mitigatedAttacks: ['Malicious Package Upload', 'Package Tampering', 'Supply Chain Injection'],
    references: ['SLSA Framework', 'Sigstore project documentation']
  },
  {
    id: 'SG003',
    name: 'Dependency Scanning',
    category: 'Vulnerability Management',
    effectiveness: 'Medium',
    description: 'Automated scanning of dependencies for known vulnerabilities and malicious packages.',
    implementation: ['Integrate into CI/CD pipeline', 'Use multiple scanning tools', 'Regular dependency updates'],
    mitigatedAttacks: ['Malicious Dependencies', 'Known Vulnerabilities', 'Dependency Confusion'],
    references: ['OWASP Dependency Check', 'GitHub Security Advisories']
  },
  {
    id: 'SG004',
    name: 'Build Environment Isolation',
    category: 'Infrastructure',
    effectiveness: 'High',
    description: 'Isolate build environments to prevent cross-contamination and unauthorized access.',
    implementation: ['Use containerized builds', 'Implement network segmentation', 'Regular environment refresh'],
    mitigatedAttacks: ['Build System Compromise', 'Cross-build Contamination', 'Persistent Access'],
    references: ['SLSA Build Requirements', 'Container Security Best Practices']
  }
]

const categories = ['All', 'Access Control', 'Integrity', 'Vulnerability Management', 'Infrastructure', 'Monitoring']
const effectivenessLevels = ['All', 'High', 'Medium', 'Low']

export default function Safeguards() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedEffectiveness, setSelectedEffectiveness] = useState('All')
  const [selectedSafeguard, setSelectedSafeguard] = useState(null)

  const filteredSafeguards = safeguards.filter(safeguard => {
    const matchesSearch = safeguard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         safeguard.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || safeguard.category === selectedCategory
    const matchesEffectiveness = selectedEffectiveness === 'All' || safeguard.effectiveness === selectedEffectiveness
    
    return matchesSearch && matchesCategory && matchesEffectiveness
  })

  const getEffectivenessColor = (effectiveness) => {
    switch (effectiveness) {
      case 'High': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Security Safeguards</h1>
            <p className="text-sm text-gray-600 mt-1">
              Countermeasures and best practices for supply chain security
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search safeguards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-64"
              />
            </div>
            
            {/* Filters */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input w-48"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedEffectiveness}
              onChange={(e) => setSelectedEffectiveness(e.target.value)}
              className="input w-32"
            >
              {effectivenessLevels.map(effectiveness => (
                <option key={effectiveness} value={effectiveness}>{effectiveness}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex">
        {/* Safeguards list */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid gap-6">
            {filteredSafeguards.map((safeguard) => (
              <div
                key={safeguard.id}
                className="card hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={() => setSelectedSafeguard(safeguard)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <ShieldIcon className="h-5 w-5 text-green-500" />
                      <h3 className="text-lg font-semibold text-gray-900">{safeguard.name}</h3>
                      <span className="text-sm text-gray-500">({safeguard.id})</span>
                    </div>
                    
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-sm text-gray-600">{safeguard.category}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEffectivenessColor(safeguard.effectiveness)}`}>
                        {safeguard.effectiveness} Effectiveness
                      </span>
                    </div>
                    
                    <p className="mt-3 text-gray-700 line-clamp-2">{safeguard.description}</p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Mitigates {safeguard.mitigatedAttacks.length} attack types
                      </div>
                      <div className="text-sm text-primary-600 hover:text-primary-700">
                        View implementation →
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredSafeguards.length === 0 && (
              <div className="text-center py-12">
                <ShieldIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No safeguards found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search criteria or filters.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Details panel */}
        {selectedSafeguard && (
          <div className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedSafeguard.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{selectedSafeguard.id}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{selectedSafeguard.category}</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEffectivenessColor(selectedSafeguard.effectiveness)}`}>
                    {selectedSafeguard.effectiveness}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-sm text-gray-700">{selectedSafeguard.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Implementation Steps</h3>
                <ul className="space-y-1">
                  {selectedSafeguard.implementation.map((step, index) => (
                    <li key={index} className="text-sm text-gray-700">• {step}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Mitigated Attacks</h3>
                <ul className="space-y-1">
                  {selectedSafeguard.mitigatedAttacks.map((attack, index) => (
                    <li key={index} className="text-sm text-gray-700">• {attack}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">References</h3>
                <ul className="space-y-1">
                  {selectedSafeguard.references.map((reference, index) => (
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