'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  ChevronRight,
  Home,
  Users,
  Building2,
  UserCircle,
  BookOpen,
  Menu,
  X
} from 'lucide-react'

const BASE_PATH = '/Yardr-Doc'

type Section = 'overview' | 'admin' | 'company' | 'customer'

const sections = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'admin', label: 'Admin Panel', icon: Users },
  { id: 'company', label: 'Company Panel', icon: Building2 },
  { id: 'customer', label: 'Customer Panel', icon: UserCircle },
] as const

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState<Section>('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 mr-6">
            <Image src={`${BASE_PATH}/yardrlogo.svg`} alt="YARDR" width={32} height={32} />
            <span className="font-bold text-lg">YARDR Docs</span>
          </Link>
          <button
            className="md:hidden ml-auto p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <nav className="hidden md:flex items-center gap-6 ml-auto">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Back to App
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed md:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-background transition-transform md:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <nav className="p-4 space-y-2">
            <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              Documentation
            </div>
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id as Section)
                    setMobileMenuOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                  {activeSection === section.id && (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] p-6 md:p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            {activeSection === 'overview' && <OverviewSection />}
            {activeSection === 'admin' && <AdminSection />}
            {activeSection === 'company' && <CompanySection />}
            {activeSection === 'customer' && <CustomerSection />}
          </div>
        </main>
      </div>
    </div>
  )
}

function OverviewSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">YARDR Documentation</h1>
        <p className="text-xl text-muted-foreground">
          Welcome to the YARDR Equipment Rental Platform documentation. This guide will help you understand how to use the platform.
        </p>
      </div>

      <div className="rounded-lg overflow-hidden border border-border">
        <Image
          src={`${BASE_PATH}/docs/screenshots/landing-page.png`}
          alt="YARDR Landing Page"
          width={1200}
          height={675}
          className="w-full"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg border border-border bg-card">
          <h3 className="text-lg font-semibold mb-2">What is YARDR?</h3>
          <p className="text-muted-foreground">
            YARDR is a comprehensive equipment rental platform connecting customers with equipment rental companies in Kuwait.
            The platform enables seamless equipment rental through a modern, user-friendly interface.
          </p>
        </div>
        <div className="p-6 rounded-lg border border-border bg-card">
          <h3 className="text-lg font-semibold mb-2">Key Features</h3>
          <ul className="text-muted-foreground space-y-1">
            <li>• Browse and rent heavy equipment</li>
            <li>• Company management dashboard</li>
            <li>• Real-time order tracking</li>
            <li>• Wallet system for payments</li>
            <li>• Operator management</li>
          </ul>
        </div>
      </div>

      <div className="p-6 rounded-lg border border-border bg-card">
        <h3 className="text-lg font-semibold mb-4">User Roles</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-muted">
            <h4 className="font-medium mb-1">Admin</h4>
            <p className="text-sm text-muted-foreground">
              Platform administrators who manage companies, listings, and users.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted">
            <h4 className="font-medium mb-1">Company</h4>
            <p className="text-sm text-muted-foreground">
              Equipment providers who list and rent out their equipment.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted">
            <h4 className="font-medium mb-1">Customer</h4>
            <p className="text-sm text-muted-foreground">
              End users who browse and rent equipment for their projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Admin Panel</h1>
        <p className="text-xl text-muted-foreground">
          The Admin Panel provides complete control over the platform, including company approvals, listing management, and user oversight.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="text-muted-foreground">
          The admin dashboard shows key metrics including total revenue, active companies, total listings, and orders.
        </p>
        <div className="rounded-lg overflow-hidden border border-border">
          <Image
            src={`${BASE_PATH}/docs/screenshots/page-2025-12-16T19-30-01-878Z.png`}
            alt="Admin Dashboard"
            width={1200}
            height={675}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Orders Management</h2>
        <p className="text-muted-foreground">
          View and manage all orders across the platform. Filter by status and search for specific orders.
        </p>
        <div className="rounded-lg overflow-hidden border border-border">
          <Image
            src={`${BASE_PATH}/docs/screenshots/admin-02-orders.png`}
            alt="Admin Orders"
            width={1200}
            height={675}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Company Approvals</h2>
        <p className="text-muted-foreground">
          Review and approve company registrations. Companies need admin approval before they can start listing equipment.
        </p>
        <div className="rounded-lg overflow-hidden border border-border">
          <Image
            src={`${BASE_PATH}/docs/screenshots/admin-03-companies.png`}
            alt="Admin Company Approvals"
            width={1200}
            height={675}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Listings Management</h2>
        <p className="text-muted-foreground">
          View, approve, and manage all equipment listings. Filter by company, category, and status.
        </p>
        <div className="rounded-lg overflow-hidden border border-border">
          <Image
            src={`${BASE_PATH}/docs/screenshots/admin-04-listings.png`}
            alt="Admin Listings"
            width={1200}
            height={675}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">PIM - Categories</h2>
        <p className="text-muted-foreground">
          Manage equipment categories. Add, edit, or reorder categories to organize the equipment catalog.
        </p>
        <div className="rounded-lg overflow-hidden border border-border">
          <Image
            src={`${BASE_PATH}/docs/screenshots/admin-05-categories.png`}
            alt="Admin Categories"
            width={1200}
            height={675}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">PIM - Service Types</h2>
        <p className="text-muted-foreground">
          Manage service types with variants, pricing options, and custom fields for each equipment type.
        </p>
        <div className="rounded-lg overflow-hidden border border-border">
          <Image
            src={`${BASE_PATH}/docs/screenshots/admin-06-service-types.png`}
            alt="Admin Service Types"
            width={1200}
            height={675}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Users - Companies</h2>
        <p className="text-muted-foreground">
          Manage registered companies on the platform. View company details, listings count, and status.
        </p>
        <div className="rounded-lg overflow-hidden border border-border">
          <Image
            src={`${BASE_PATH}/docs/screenshots/admin-07-users-companies.png`}
            alt="Admin Users - Companies"
            width={1200}
            height={675}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Users - Customers</h2>
        <p className="text-muted-foreground">
          Manage registered customers. View customer details, order history, and total spent.
        </p>
        <div className="rounded-lg overflow-hidden border border-border">
          <Image
            src={`${BASE_PATH}/docs/screenshots/admin-08-users-customers.png`}
            alt="Admin Users - Customers"
            width={1200}
            height={675}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}

function CompanySection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Company Panel</h1>
        <p className="text-xl text-muted-foreground">
          The Company Panel allows equipment rental companies to manage their listings, orders, operators, and wallet.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="text-muted-foreground">
          The company dashboard shows active listings, broadcasts, orders, and wallet balance at a glance.
        </p>
        <div className="rounded-lg overflow-hidden border border-border">
          <Image
            src={`${BASE_PATH}/docs/screenshots/company-01-dashboard.png`}
            alt="Company Dashboard"
            width={1200}
            height={675}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">My Listings</h2>
        <p className="text-muted-foreground">
          Manage your equipment listings. Add new listings, update pricing, and track listing status.
        </p>
        <div className="rounded-lg overflow-hidden border border-border">
          <Image
            src={`${BASE_PATH}/docs/screenshots/company-02-listings.png`}
            alt="Company Listings"
            width={1200}
            height={675}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Orders</h2>
        <p className="text-muted-foreground">
          Manage rental orders. Accept broadcasts, track deliveries, and complete orders.
        </p>
        <div className="rounded-lg overflow-hidden border border-border">
          <Image
            src={`${BASE_PATH}/docs/screenshots/company-03-orders.png`}
            alt="Company Orders"
            width={1200}
            height={675}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Wallet</h2>
        <p className="text-muted-foreground">
          Track your earnings, view transaction history, and request withdrawals.
        </p>
        <div className="rounded-lg overflow-hidden border border-border">
          <Image
            src={`${BASE_PATH}/docs/screenshots/company-04-wallet.png`}
            alt="Company Wallet"
            width={1200}
            height={675}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Operators</h2>
        <p className="text-muted-foreground">
          Manage your equipment operators. Add operators and assign them to orders.
        </p>
        <div className="rounded-lg overflow-hidden border border-border">
          <Image
            src={`${BASE_PATH}/docs/screenshots/company-05-operators.png`}
            alt="Company Operators"
            width={1200}
            height={675}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}

function CustomerSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Customer Panel</h1>
        <p className="text-xl text-muted-foreground">
          The Customer Panel allows users to browse equipment, place orders, and manage their rentals.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Browse Equipment</h2>
        <p className="text-muted-foreground">
          Browse available equipment by category. Find excavators, cranes, generators, and more.
        </p>
        <div className="rounded-lg overflow-hidden border border-border">
          <Image
            src={`${BASE_PATH}/docs/screenshots/customer-01-browse.png`}
            alt="Customer Browse"
            width={1200}
            height={675}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">My Orders</h2>
        <p className="text-muted-foreground">
          Track your rental orders. View order status, details, and history.
        </p>
        <div className="rounded-lg overflow-hidden border border-border">
          <Image
            src={`${BASE_PATH}/docs/screenshots/customer-02-orders.png`}
            alt="Customer Orders"
            width={1200}
            height={675}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Wallet</h2>
        <p className="text-muted-foreground">
          Manage your wallet balance. Top up, view transactions, and track spending.
        </p>
        <div className="rounded-lg overflow-hidden border border-border">
          <Image
            src={`${BASE_PATH}/docs/screenshots/customer-03-wallet.png`}
            alt="Customer Wallet"
            width={1200}
            height={675}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
