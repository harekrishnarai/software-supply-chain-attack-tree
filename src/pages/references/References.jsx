import React, { useState } from 'react'
import { SearchIcon, BookOpenIcon, ExternalLinkIcon } from 'lucide-react'

// Sample references data
const references = [
  {
    id: 'REF001',
    title: 'Attacks on Package Managers',
    authors: ['Alex Birsan'],
    year: 2021,
    type: 'Research Paper',
    tags: ['Dependency Confusion', 'Package Management', 'Supply Chain'],
    abstract: 'This paper presents a novel attack vector targeting package managers through dependency confusion, demonstrating how attackers can compromise software supply chains.',
    url: 'https://example.com/dependency-confusion-attack',
    relatedAttacks: ['Dependency Confusion', 'Package Name Squatting'],
    relatedSafeguards: ['Private Package Registries', 'Package Verification']
  },
  {
    id: 'REF002',
    title: 'SolarWinds Supply Chain Attack Analysis',
    authors: ['FireEye Research Team'],
    year: 2020,
    type: 'Incident Report',
    tags: ['SolarWinds', 'APT', 'Supply Chain', 'Nation State'],
    abstract: 'Comprehensive analysis of the SolarWinds supply chain attack, including attack vectors, impact assessment, and lessons learned.',
    url: 'https://example.com/solarwinds-analysis',
    relatedAttacks: ['Build System Compromise', 'Code Injection'],
    relatedSafeguards: ['Code Signing', 'Build Environment Isolation']
  },
  {
    id: 'REF003',
    title: 'SLSA: Supply-chain Levels for Software Artifacts',
    authors: ['Google Security Team'],
    year: 2021,
    type: 'Framework',
    tags: ['SLSA', 'Framework', 'Supply Chain Security', 'Best Practices'],
    abstract: 'SLSA is a security framework that provides a common vocabulary for describing and increasing supply chain security.',
    url: 'https://slsa.dev/',
    relatedAttacks: ['Build System Compromise', 'Package Tampering'],
    relatedSafeguards: ['Code Signing', 'Build Attestation', 'Provenance Verification']
  },
  {
    id: 'REF004',
    title: 'The State of the Software Supply Chain Report 2023',
    authors: ['Sonatype'],
    year: 2023,
    type: 'Industry Report',
    tags: ['Industry Report', 'Statistics', 'Malware', 'Open Source'],
    abstract: 'Annual report analyzing trends in software supply chain attacks, including statistics on malicious packages and security practices.',
    url: 'https://example.com/sonatype-report-2023',
    relatedAttacks: ['Malicious Package Upload', 'Typosquatting'],
    relatedSafeguards: ['Dependency Scanning', 'Package Monitoring']
  }
]

const types = ['All', 'Research Paper', 'Incident Report', 'Framework', 'Industry Report', 'Best Practices', 'Technical Documentation']
const years = ['All', '2023', '2022', '2021', '2020', '2019', '2018']

export default function References() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedYear, setSelectedYear] = useState('All')
  const [selectedReference, setSelectedReference] = useState(null)

  const filteredReferences = references.filter(reference => {
    const matchesSearch = reference.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reference.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         reference.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === 'All' || reference.type === selectedType
    const matchesYear = selectedYear === 'All' || reference.year.toString() === selectedYear
    
    return matchesSearch && matchesType && matchesYear
  })

  const getTypeColor = (type) => {
    switch (type) {
      case 'Research Paper': return 'bg-blue-100 text-blue-800'
      case 'Incident Report': return 'bg-red-100 text-red-800'
      case 'Framework': return 'bg-green-100 text-green-800'
      case 'Industry Report': return 'bg-purple-100 text-purple-800'
      case 'Best Practices': return 'bg-yellow-100 text-yellow-800'
      case 'Technical Documentation': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Research References</h1>
            <p className="text-sm text-gray-600 mt-1">
              Curated collection of research papers, reports, and documentation
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search references..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-64"
              />
            </div>
            
            {/* Filters */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input w-48"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="input w-24"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex">
        {/* References list */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid gap-6">
            {filteredReferences.map((reference) => (
              <div
                key={reference.id}
                className="card hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={() => setSelectedReference(reference)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <BookOpenIcon className="h-5 w-5 text-blue-500" />
                      <h3 className="text-lg font-semibold text-gray-900">{reference.title}</h3>
                      <span className="text-sm text-gray-500">({reference.id})</span>
                    </div>
                    
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-sm text-gray-600">
                        {reference.authors.join(', ')} • {reference.year}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(reference.type)}`}>
                        {reference.type}
                      </span>
                    </div>
                    
                    <p className="mt-3 text-gray-700 line-clamp-2">{reference.abstract}</p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {reference.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                            {tag}
                          </span>
                        ))}
                        {reference.tags.length > 3 && (
                          <span className="text-xs text-gray-500">+{reference.tags.length - 3} more</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <a
                          href={reference.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Open <ExternalLinkIcon className="ml-1 h-3 w-3" />
                        </a>
                        <div className="text-sm text-primary-600 hover:text-primary-700">
                          View details →
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredReferences.length === 0 && (
              <div className="text-center py-12">
                <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No references found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search criteria or filters.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Details panel */}
        {selectedReference && (
          <div className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedReference.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{selectedReference.id}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {selectedReference.authors.join(', ')} • {selectedReference.year}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(selectedReference.type)}`}>
                    {selectedReference.type}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Abstract</h3>
                <p className="text-sm text-gray-700">{selectedReference.abstract}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedReference.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Related Attack Vectors</h3>
                <ul className="space-y-1">
                  {selectedReference.relatedAttacks.map((attack, index) => (
                    <li key={index} className="text-sm text-gray-700">• {attack}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Related Safeguards</h3>
                <ul className="space-y-1">
                  {selectedReference.relatedSafeguards.map((safeguard, index) => (
                    <li key={index} className="text-sm text-gray-700">• {safeguard}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <a
                  href={selectedReference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center"
                >
                  Open Reference
                  <ExternalLinkIcon className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}