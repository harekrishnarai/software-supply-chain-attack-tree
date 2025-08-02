import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { ZoomInIcon, ZoomOutIcon, HomeIcon, SearchIcon } from 'lucide-react'

// Sample attack tree data - in a real application, this would come from an API
const attackTreeData = {
  name: "Compromise Software Supply Chain",
  type: "goal",
  children: [
    {
      name: "Compromise Source Code",
      type: "attack",
      children: [
        {
          name: "Direct Repository Access",
          type: "technique",
          children: [
            { name: "Stolen Developer Credentials", type: "method" },
            { name: "Compromised Developer Account", type: "method" },
            { name: "Insider Threat", type: "method" }
          ]
        },
        {
          name: "Code Injection",
          type: "technique",
          children: [
            { name: "Pull Request Injection", type: "method" },
            { name: "Commit Signing Bypass", type: "method" }
          ]
        }
      ]
    },
    {
      name: "Compromise Build Process",
      type: "attack",
      children: [
        {
          name: "CI/CD Pipeline Compromise",
          type: "technique",
          children: [
            { name: "Build Server Access", type: "method" },
            { name: "Pipeline Configuration Tampering", type: "method" }
          ]
        },
        {
          name: "Dependency Confusion",
          type: "technique",
          children: [
            { name: "Package Name Squatting", type: "method" },
            { name: "Typosquatting", type: "method" }
          ]
        }
      ]
    },
    {
      name: "Compromise Distribution",
      type: "attack",
      children: [
        {
          name: "Package Repository Compromise",
          type: "technique",
          children: [
            { name: "Registry Account Takeover", type: "method" },
            { name: "Package Replacement", type: "method" }
          ]
        },
        {
          name: "Update Mechanism Abuse",
          type: "technique",
          children: [
            { name: "Update Server Compromise", type: "method" },
            { name: "Certificate Authority Compromise", type: "method" }
          ]
        }
      ]
    }
  ]
}

export default function AttackTree() {
  const svgRef = useRef()
  const [selectedNode, setSelectedNode] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!svgRef.current) return

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3.select(svgRef.current)
    const width = 1200
    const height = 800
    const margin = { top: 50, right: 50, bottom: 50, left: 50 }

    svg.attr("width", width).attr("height", height)

    // Create a group for the tree that can be zoomed and panned
    const g = svg.append("g")

    // Create the tree layout
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
    const initialTransform = d3.zoomIdentity.translate(margin.left, margin.top)
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

    // Add node circles/rectangles based on type
    nodes.append('rect')
      .attr('width', d => {
        const textLength = d.data.name.length * 8 + 20
        return Math.max(100, textLength)
      })
      .attr('height', 40)
      .attr('x', d => {
        const textLength = d.data.name.length * 8 + 20
        return -Math.max(100, textLength) / 2
      })
      .attr('y', -20)
      .attr('rx', 8)
      .style('fill', d => {
        switch (d.data.type) {
          case 'goal': return '#dc2626'
          case 'attack': return '#ea580c'
          case 'technique': return '#d97706'
          case 'method': return '#65a30d'
          default: return '#6b7280'
        }
      })
      .style('stroke', '#ffffff')
      .style('stroke-width', 2)
      .style('opacity', 0.9)

    // Add node text
    nodes.append('text')
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .style('font-weight', 'bold')
      .style('font-size', '12px')
      .text(d => {
        // Truncate long names
        return d.data.name.length > 15 ? d.data.name.substring(0, 15) + '...' : d.data.name
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
        d3.select(this).select('rect')
          .transition()
          .duration(200)
          .style('opacity', 0.9)
          .style('stroke-width', 2)
      })

    return () => {
      // Cleanup
      svg.selectAll("*").remove()
    }
  }, [])

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
            <h1 className="text-2xl font-bold text-gray-900">Attack Tree Visualization</h1>
            <p className="text-sm text-gray-600 mt-1">
              Interactive visualization of software supply chain attack vectors
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search nodes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-64"
              />
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
            </div>
          </div>
        </div>

        {/* Side panel */}
        {selectedNode && (
          <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Node Details</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Name</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedNode.name}</p>
              </div>
              
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
                <h3 className="text-sm font-medium text-gray-700">Description</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {selectedNode.type === 'goal' && "The ultimate objective of compromising the software supply chain to achieve unauthorized access or control."}
                  {selectedNode.type === 'attack' && "A broad category of attack methods targeting specific components of the supply chain."}
                  {selectedNode.type === 'technique' && "Specific technical approaches used to execute attacks against supply chain components."}
                  {selectedNode.type === 'method' && "Concrete implementation methods for executing the attack technique."}
                </p>
              </div>

              {selectedNode.children && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Sub-elements</h3>
                  <ul className="mt-1 space-y-1">
                    {selectedNode.children.map((child, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        • {child.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Click on other nodes to explore the attack tree structure and relationships.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}