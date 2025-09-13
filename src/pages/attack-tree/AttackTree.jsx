import React, { useState, useEffect, useRef, useMemo } from 'react'
import * as d3 from 'd3'
import { ZoomInIcon, ZoomOutIcon, HomeIcon, SearchIcon, InfoIcon, ShieldIcon } from 'lucide-react'
import { getCompleteAttackTree, searchNodes, findNodeById, getTreeStatistics } from '../../data/attackTreeUtils'

export default function AttackTree() {
  const svgRef = useRef()
  const [selectedNode, setSelectedNode] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [highlightedNodeId, setHighlightedNodeId] = useState(null)
  
  // Load the complete attack tree data
  const attackTreeData = useMemo(() => getCompleteAttackTree(), [])
  const treeStats = useMemo(() => getTreeStatistics(attackTreeData), [attackTreeData])
  
  // Handle search
  useEffect(() => {
    if (searchTerm.trim()) {
      const results = searchNodes(attackTreeData, searchTerm)
      setSearchResults(results)
    } else {
      setSearchResults([])
      setHighlightedNodeId(null)
    }
  }, [searchTerm, attackTreeData])

  useEffect(() => {
    if (!svgRef.current) return

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3.select(svgRef.current)
    const width = 1600
    const height = 1000
    const margin = { top: 50, right: 50, bottom: 50, left: 50 }

    svg.attr("width", width).attr("height", height)

    // Create a group for the tree that can be zoomed and panned
    const g = svg.append("g")

    // Create the tree layout with more space for larger tree
    const tree = d3.tree().size([height - margin.top - margin.bottom, width - margin.left - margin.right])

    // Create hierarchy from data
    const root = d3.hierarchy(attackTreeData)
    const treeData = tree(root)

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom)

    // Initial transform
    const initialTransform = d3.zoomIdentity.translate(margin.left, margin.top).scale(0.8)
    svg.call(zoom.transform, initialTransform)

    // Add links
    const links = g.selectAll('.link')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x)
      )
      .style('fill', 'none')
      .style('stroke', '#cbd5e0')
      .style('stroke-width', 2)

    // Add nodes
    const nodes = g.selectAll('.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        setSelectedNode(d.data)
      })

    // Add node rectangles with dynamic sizing
    nodes.append('rect')
      .attr('width', d => {
        const textLength = d.data.name.length * 7 + 30
        return Math.max(120, Math.min(300, textLength))
      })
      .attr('height', 45)
      .attr('x', d => {
        const textLength = d.data.name.length * 7 + 30
        return -Math.max(120, Math.min(300, textLength)) / 2
      })
      .attr('y', -22.5)
      .attr('rx', 8)
      .style('fill', d => {
        // Highlight searched nodes
        if (highlightedNodeId === d.data.id) {
          return '#fbbf24' // Yellow highlight
        }
        
        switch (d.data.type) {
          case 'goal': return '#dc2626'
          case 'attack': return '#ea580c'
          case 'technique': return '#d97706'
          case 'method': return '#65a30d'
          default: return '#6b7280'
        }
      })
      .style('stroke', d => highlightedNodeId === d.data.id ? '#f59e0b' : '#ffffff')
      .style('stroke-width', d => highlightedNodeId === d.data.id ? 3 : 2)
      .style('opacity', 0.9)

    // Add node text with better wrapping
    nodes.append('text')
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .style('font-weight', 'bold')
      .style('font-size', '11px')
      .style('pointer-events', 'none')
      .each(function(d) {
        const text = d3.select(this)
        const name = d.data.name
        const maxWidth = Math.max(120, Math.min(300, name.length * 7 + 30)) - 20
        
        // Simple text wrapping
        if (name.length > 20) {
          const words = name.split(' ')
          let line = ''
          let lineNumber = 0
          const lineHeight = 1.1
          
          text.text(null)
          
          for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' '
            if (testLine.length * 7 > maxWidth && line !== '') {
              text.append('tspan')
                .attr('x', 0)
                .attr('dy', lineNumber === 0 ? '0em' : `${lineHeight}em`)
                .text(line.trim())
              line = words[i] + ' '
              lineNumber++
              if (lineNumber > 1) break // Max 2 lines
            } else {
              line = testLine
            }
          }
          
          if (line.trim()) {
            text.append('tspan')
              .attr('x', 0)
              .attr('dy', lineNumber === 0 ? '0em' : `${lineHeight}em`)
              .text(line.trim())
          }
        } else {
          text.text(name)
        }
      })

    // Add hover effects
    nodes
      .on('mouseenter', function(event, d) {
        d3.select(this).select('rect')
          .transition()
          .duration(200)
          .style('opacity', 1)
          .style('stroke-width', 3)
      })
      .on('mouseleave', function(event, d) {
        if (highlightedNodeId !== d.data.id) {
          d3.select(this).select('rect')
            .transition()
            .duration(200)
            .style('opacity', 0.9)
            .style('stroke-width', 2)
        }
      })

    return () => {
      // Cleanup
      svg.selectAll("*").remove()
    }
  }, [attackTreeData, highlightedNodeId])

  const handleZoomIn = () => {
    d3.select(svgRef.current)
      .transition()
      .duration(300)
      .call(d3.zoom().scaleBy, 1.5)
  }

  const handleZoomOut = () => {
    d3.select(svgRef.current)
      .transition()
      .duration(300)
      .call(d3.zoom().scaleBy, 0.67)
  }

  const handleResetZoom = () => {
    const svg = d3.select(svgRef.current)
    const margin = { top: 50, right: 50, bottom: 50, left: 50 }
    const initialTransform = d3.zoomIdentity.translate(margin.left, margin.top)
    
    svg
      .transition()
      .duration(500)
      .call(d3.zoom().transform, initialTransform)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SAP Attack Tree Visualization</h1>
            <p className="text-sm text-gray-600 mt-1">
              Complete software supply chain attack taxonomy with {treeStats.totalNodes} attack vectors
            </p>
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
              <span>{treeStats.goals} goals</span>
              <span>{treeStats.attacks} attacks</span>
              <span>{treeStats.techniques} techniques</span>
              <span>{treeStats.methods} methods</span>
              <span>{treeStats.nodesWithSafeguards} with safeguards</span>
            </div>
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
                className="input pl-10 w-80"
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        setHighlightedNodeId(result.id)
                        setSelectedNode(result)
                        setSearchTerm('')
                        setSearchResults([])
                      }}
                    >
                      <div className="font-medium text-sm text-gray-900">{result.name}</div>
                      <div className="text-xs text-gray-500 capitalize">{result.type} • {result.id}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-2">
              <button onClick={handleZoomIn} className="btn-secondary p-2">
                <ZoomInIcon className="h-4 w-4" />
              </button>
              <button onClick={handleZoomOut} className="btn-secondary p-2">
                <ZoomOutIcon className="h-4 w-4" />
              </button>
              <button onClick={handleResetZoom} className="btn-secondary p-2">
                <HomeIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Tree visualization */}
        <div className="flex-1 bg-gray-50 relative overflow-hidden">
          <svg ref={svgRef} className="w-full h-full" />
          
          {/* Legend */}
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Legend</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-600 rounded"></div>
                <span className="text-xs text-gray-700">Goal</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-600 rounded"></div>
                <span className="text-xs text-gray-700">Attack</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-amber-600 rounded"></div>
                <span className="text-xs text-gray-700">Technique</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-lime-600 rounded"></div>
                <span className="text-xs text-gray-700">Method</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                <span className="text-xs text-gray-700">Highlighted</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                {treeStats.totalNodes} total nodes • Click to select • Search to highlight
              </p>
            </div>
          </div>
        </div>

        {/* Side panel */}
        {selectedNode && (
          <div className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Attack Vector Details</h2>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Name</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedNode.name}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Type</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    selectedNode.type === 'goal' ? 'bg-red-100 text-red-800' :
                    selectedNode.type === 'attack' ? 'bg-orange-100 text-orange-800' :
                    selectedNode.type === 'technique' ? 'bg-amber-100 text-amber-800' :
                    'bg-lime-100 text-lime-800'
                  }`}>
                    {selectedNode.type}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">ID</h3>
                  <span className="text-xs text-gray-500 font-mono">{selectedNode.id}</span>
                </div>
              </div>

              {selectedNode.description && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 flex items-center">
                    <InfoIcon className="h-4 w-4 mr-1" />
                    Description
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>
              )}

              {selectedNode.impact && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Impact</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    {selectedNode.impact}
                  </p>
                </div>
              )}

              {selectedNode.safeguards && selectedNode.safeguards.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 flex items-center">
                    <ShieldIcon className="h-4 w-4 mr-1" />
                    Mapped Safeguards ({selectedNode.safeguards.length})
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedNode.safeguards.map((safeguard, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800"
                      >
                        {safeguard.sgId}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedNode.children && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Sub-elements ({selectedNode.children.length})</h3>
                  <ul className="mt-1 space-y-1">
                    {selectedNode.children.map((child, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        <button
                          onClick={() => {
                            setSelectedNode(child)
                            setHighlightedNodeId(child.id)
                          }}
                          className="text-left hover:text-blue-600 hover:underline w-full"
                        >
                          • {child.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Click on other nodes to explore the attack tree structure and relationships.
                  Use search to quickly find specific attack vectors.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}