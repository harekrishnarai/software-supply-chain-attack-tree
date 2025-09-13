import attackVectors from './attackvectors.json'
import taxonomy from './taxonomy.json'

/**
 * Creates a lookup map for attack vector details by avId
 */
export function createAttackVectorLookup() {
  const lookup = new Map()
  
  attackVectors.forEach(av => {
    lookup.set(av.avId, av)
  })
  
  return lookup
}

/**
 * Transforms the taxonomy tree by enriching nodes with attack vector details
 */
export function enrichTreeWithAttackVectorData(node, lookup) {
  // Get attack vector details for this node
  const avData = lookup.get(node.avId)
  
  // Create enriched node
  const enrichedNode = {
    name: node.avName,
    id: node.avId,
    type: getNodeType(node.avId),
    ...avData && {
      description: avData.info?.[0]?.Description || '',
      impact: avData.info?.[0]?.Impact || '',
      safeguards: avData.info?.[0]?.['Mapped Safeguard'] || []
    }
  }
  
  // Recursively process children
  if (node.children && node.children.length > 0) {
    enrichedNode.children = node.children.map(child => 
      enrichTreeWithAttackVectorData(child, lookup)
    )
  }
  
  return enrichedNode
}

/**
 * Determines node type based on avId pattern
 */
function getNodeType(avId) {
  if (avId === 'AV-000') return 'goal'
  if (avId.match(/^AV-[0-9]{3}$/)) return 'attack'
  if (avId.match(/^AV-[0-9]{4}$/)) return 'technique'
  return 'method'
}

/**
 * Gets the complete attack tree with enriched data
 */
export function getCompleteAttackTree() {
  const lookup = createAttackVectorLookup()
  return enrichTreeWithAttackVectorData(taxonomy, lookup)
}

/**
 * Searches for nodes by name or description
 */
export function searchNodes(tree, searchTerm) {
  const results = []
  const term = searchTerm.toLowerCase()
  
  function searchRecursive(node) {
    // Check if current node matches
    if (
      node.name.toLowerCase().includes(term) ||
      (node.description && node.description.toLowerCase().includes(term)) ||
      (node.impact && node.impact.toLowerCase().includes(term))
    ) {
      results.push(node)
    }
    
    // Search children
    if (node.children) {
      node.children.forEach(child => searchRecursive(child))
    }
  }
  
  searchRecursive(tree)
  return results
}

/**
 * Finds a specific node by ID
 */
export function findNodeById(tree, targetId) {
  if (tree.id === targetId) {
    return tree
  }
  
  if (tree.children) {
    for (const child of tree.children) {
      const found = findNodeById(child, targetId)
      if (found) return found
    }
  }
  
  return null
}

/**
 * Gets all leaf nodes (nodes without children)
 */
export function getLeafNodes(tree) {
  const leaves = []
  
  function collectLeaves(node) {
    if (!node.children || node.children.length === 0) {
      leaves.push(node)
    } else {
      node.children.forEach(child => collectLeaves(child))
    }
  }
  
  collectLeaves(tree)
  return leaves
}

/**
 * Gets statistics about the tree
 */
export function getTreeStatistics(tree) {
  let totalNodes = 0
  let goals = 0
  let attacks = 0
  let techniques = 0
  let methods = 0
  let nodesWithSafeguards = 0
  
  function countNodes(node) {
    totalNodes++
    
    switch (node.type) {
      case 'goal': goals++; break
      case 'attack': attacks++; break
      case 'technique': techniques++; break
      case 'method': methods++; break
    }
    
    if (node.safeguards && node.safeguards.length > 0) {
      nodesWithSafeguards++
    }
    
    if (node.children) {
      node.children.forEach(child => countNodes(child))
    }
  }
  
  countNodes(tree)
  
  return {
    totalNodes,
    goals,
    attacks,
    techniques,
    methods,
    nodesWithSafeguards,
    leafNodes: getLeafNodes(tree).length
  }
}