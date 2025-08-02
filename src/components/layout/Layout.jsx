import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  HomeIcon, 
  TreePineIcon, 
  ShieldIcon, 
  AlertTriangleIcon, 
  BookOpenIcon,
  MenuIcon,
  XIcon
} from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Attack Tree', href: '/attack-tree', icon: TreePineIcon },
  { name: 'Attack Vectors', href: '/attack-vectors', icon: AlertTriangleIcon },
  { name: 'Safeguards', href: '/safeguards', icon: ShieldIcon },
  { name: 'References', href: '/references', icon: BookOpenIcon },
]

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`${sidebarOpen ? 'fixed inset-0 z-40 md:hidden' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white shadow-lg">
          <div className="flex items-center justify-between h-16 px-4 bg-primary-600">
            <h1 className="text-white font-bold text-lg">Supply Chain Explorer</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={`${
                      isActive ? 'text-primary-700' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 h-5 w-5`}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 px-4 bg-primary-600">
            <h1 className="text-white font-bold text-lg">Supply Chain Explorer</h1>
          </div>
          
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200`}
                >
                  <item.icon
                    className={`${
                      isActive ? 'text-primary-700' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 h-5 w-5`}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          
          <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              <p>Modern Risk Explorer</p>
              <p>Built with Vite + React</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top bar for mobile */}
        <div className="md:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Supply Chain Explorer</h1>
            <div className="w-6" /> {/* Spacer */}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  )
}