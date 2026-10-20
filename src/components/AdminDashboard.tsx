import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { Product, MenuCategory } from '../types/cafe';
import {
  LayoutDashboard,
  Coffee,
  ShoppingBag,
  Calendar,
  Sparkles,
  Users,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Download,
  X,
  Search,
  DollarSign
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    updateProduct,
    addProduct,
    toggleProductAvailability,
    orders,
    updateOrderStatus,
    reservations,
    cancelReservation,
    eventInquiries,
    updateEventInquiryStatus,
    loyaltyUser,
    newsletterEmails
  } = useCafe();

  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'orders' | 'reservations' | 'events' | 'customers' | 'settings'>('overview');

  // New product form modal
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<MenuCategory>('espresso');
  const [newProdPrice, setNewProdPrice] = useState(5.50);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdOrigin, setNewProdOrigin] = useState('');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80');

  // Editing existing product price
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingPrice, setEditingPrice] = useState<number>(0);

  if (!isAdminOpen) return null;

  // Overview metrics
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeReservationsCount = reservations.filter(r => r.status === 'confirmed').length;
  const pendingInquiriesCount = eventInquiries.filter(i => i.status === 'new' || i.status === 'quoted').length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdDesc) return;

    addProduct({
      name: newProdName,
      category: newProdCategory,
      tagline: newProdDesc.slice(0, 50),
      description: newProdDesc,
      price: Number(newProdPrice),
      image: newProdImage,
      origin: newProdOrigin || 'Specialty Lot',
      available: true,
      sizes: [
        { name: 'Regular', volume: '12 oz', extraPrice: 0 },
        { name: 'Grand', volume: '16 oz', extraPrice: 0.75 }
      ],
      milkOptions: ['Whole Milk', 'Oat Milk', 'Almond Milk']
    });

    setIsAddingProduct(false);
    setNewProdName('');
    setNewProdDesc('');
    setNewProdOrigin('');
  };

  const handleSavePrice = (product: Product) => {
    updateProduct({ ...product, price: Number(editingPrice) });
    setEditingProductId(null);
  };

  const handleExportCSV = () => {
    const headers = 'Order ID,Customer,Phone,Total,Payment,Status,Date\n';
    const rows = orders.map(o => 
      `"${o.id}","${o.customer.name}","${o.customer.phone}","$${o.total.toFixed(2)}","${o.paymentMethod}","${o.status}","${o.createdAt}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `BeaneBlossom-Orders-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#35261F]/80 backdrop-blur-md flex justify-center items-center p-2 sm:p-6">
      <div className="bg-[#F7F4ED] rounded-2xl w-full max-w-6xl h-[92vh] shadow-2xl flex flex-col overflow-hidden border border-[#E7DCCB]">
        
        {/* Top Navbar */}
        <div className="p-4 sm:p-6 bg-[#35261F] text-[#F7F4ED] flex items-center justify-between border-b border-[#5D463B]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#A7B39A]/20 flex items-center justify-center text-[#A7B39A]">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-medium tracking-wide">
                  Beane & Blossom Management Portal
                </h3>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#A7B39A]/30 text-[#CBD6C1] font-bold">
                  Owner Active
                </span>
              </div>
              <span className="text-xs text-[#E7DCCB]/70">
                Live Storefront Control · SoHo Flagship Operations
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 text-[#E7DCCB] hover:text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
          >
            <X className="w-5 h-5" />
            <span className="hidden sm:inline">Return to Website</span>
          </button>
        </div>

        {/* Admin Tabs */}
        <div className="bg-[#F4EFE7] px-4 sm:px-6 border-b border-[#E7DCCB] flex items-center overflow-x-auto gap-2 no-scrollbar py-2">
          {[
            { id: 'overview', label: 'Overview Analytics', icon: LayoutDashboard },
            { id: 'menu', label: 'Menu & Inventory', icon: Coffee },
            { id: 'orders', label: 'Live Orders Queue', icon: ShoppingBag },
            { id: 'reservations', label: 'Table Reservations', icon: Calendar },
            { id: 'events', label: 'Event Inquiries', icon: Sparkles },
            { id: 'customers', label: 'Patrons & Newsletter', icon: Users },
            { id: 'settings', label: 'Café Settings', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 text-xs font-medium rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#35483A] text-white shadow-sm'
                    : 'text-[#5D463B] hover:text-[#35261F] hover:bg-[#E7DCCB]/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-white rounded-xl border border-[#E7DCCB] space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-[#5D463B] font-semibold block">
                    Total Revenue
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#35483A]">
                    ${totalRevenue.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-[#6D7F60] block font-medium">
                    Verified from {totalOrdersCount} orders
                  </span>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E7DCCB] space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-[#5D463B] font-semibold block">
                    Live Orders Queue
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#35261F]">
                    {orders.filter(o => o.status !== 'completed').length} Active
                  </span>
                  <span className="text-[11px] text-[#5D463B] block">
                    {orders.filter(o => o.status === 'ready').length} waiting at counter
                  </span>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E7DCCB] space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-[#5D463B] font-semibold block">
                    Active Reservations
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#35483A]">
                    {activeReservationsCount} Tables
                  </span>
                  <span className="text-[11px] text-[#5D463B] block">
                    Upcoming this week
                  </span>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E7DCCB] space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-[#5D463B] font-semibold block">
                    Event Leads & Quotes
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#35261F]">
                    {pendingInquiriesCount} Inquiries
                  </span>
                  <span className="text-[11px] text-[#6D7F60] block font-medium">
                    Mobile cart & café buyouts
                  </span>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-white p-6 rounded-xl border border-[#E7DCCB] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-xl font-medium text-[#35261F]">
                    Recent Order Stream
                  </h4>
                  <button
                    onClick={handleExportCSV}
                    className="px-3 py-1.5 border border-[#35261F] text-xs font-medium rounded text-[#35261F] hover:bg-[#F7F4ED] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-[#E7DCCB] text-[#5D463B] uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-2.5">Order</th>
                        <th className="py-2.5">Customer</th>
                        <th className="py-2.5">Items</th>
                        <th className="py-2.5">Total</th>
                        <th className="py-2.5">Status</th>
                        <th className="py-2.5">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7DCCB]/40">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-[#F7F4ED]/50">
                          <td className="py-3 font-mono font-semibold text-[#35483A]">#{o.id}</td>
                          <td className="py-3">
                            <span className="font-medium text-[#35261F] block">{o.customer.name}</span>
                            <span className="text-[10px] text-[#5D463B]">{o.customer.phone}</span>
                          </td>
                          <td className="py-3 text-[#5D463B]">
                            {o.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}
                          </td>
                          <td className="py-3 font-semibold text-[#35261F]">${o.total.toFixed(2)}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              o.status === 'ready' ? 'bg-amber-100 text-amber-800' :
                              o.status === 'crafting' ? 'bg-blue-100 text-blue-800' :
                              o.status === 'completed' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {o.status}
                            </span>
                          </td>
                          <td className="py-3">
                            {o.status !== 'completed' && (
                              <button
                                onClick={() => {
                                  if (o.status === 'received') updateOrderStatus(o.id, 'crafting');
                                  else if (o.status === 'crafting') updateOrderStatus(o.id, 'ready');
                                  else if (o.status === 'ready') updateOrderStatus(o.id, 'completed');
                                }}
                                className="text-[11px] text-[#35483A] hover:underline font-semibold cursor-pointer"
                              >
                                Advance →
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* MENU & INVENTORY TAB */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-2xl font-medium text-[#35261F]">
                    Digital Menu & Stock Management
                  </h4>
                  <p className="text-xs text-[#5D463B]">
                    Instant price modifications and daily 86 / Out of Stock toggles.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingProduct(true)}
                  className="px-4 py-2 bg-[#35483A] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 hover:bg-[#223126] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-xl border border-[#E7DCCB] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-[#E7DCCB] text-[#5D463B] uppercase tracking-wider text-[10px] bg-[#F4EFE7]">
                      <tr>
                        <th className="py-3 px-4">Item</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Availability</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7DCCB]/40">
                      {products.map(p => (
                        <tr key={p.id} className="hover:bg-[#F7F4ED]/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />
                              <div>
                                <span className="font-medium text-[#35261F] block">{p.name}</span>
                                <span className="text-[10px] text-[#5D463B]">{p.origin || 'Signature'}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 capitalize text-[#5D463B]">{p.category}</td>
                          <td className="py-3 px-4">
                            {editingProductId === p.id ? (
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs">$</span>
                                <input
                                  type="number"
                                  step="0.05"
                                  value={editingPrice}
                                  onChange={(e) => setEditingPrice(Number(e.target.value))}
                                  className="w-16 p-1 border rounded text-xs"
                                />
                                <button
                                  onClick={() => handleSavePrice(p)}
                                  className="text-[10px] bg-[#35483A] text-white px-2 py-1 rounded"
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-[#35261F]">${p.price.toFixed(2)}</span>
                                <button
                                  onClick={() => {
                                    setEditingProductId(p.id);
                                    setEditingPrice(p.price);
                                  }}
                                  className="text-[10px] text-[#5D463B] hover:text-[#35261F]"
                                  title="Edit price"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => toggleProductAvailability(p.id)}
                              className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                                p.available
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-red-100 text-red-800 hover:bg-red-200'
                              }`}
                            >
                              {p.available ? 'In Stock' : 'Out of Stock (86)'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="text-[11px] text-[#5D463B]">Active on storefront</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Product Modal */}
              {isAddingProduct && (
                <div className="fixed inset-0 z-50 bg-[#35261F]/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-[#F7F4ED] rounded-xl max-w-md w-full p-6 border border-[#E7DCCB] shadow-2xl space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-serif text-xl font-medium text-[#35261F]">Add Offering</h4>
                      <button onClick={() => setIsAddingProduct(false)}><X className="w-5 h-5" /></button>
                    </div>

                    <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                      <div>
                        <label className="text-[11px] font-semibold block mb-1">Product Name</label>
                        <input
                          type="text"
                          required
                          value={newProdName}
                          onChange={(e) => setNewProdName(e.target.value)}
                          placeholder="e.g. Cardamom Blossom Cortado"
                          className="w-full p-2 bg-white border border-[#E7DCCB] rounded outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold block mb-1">Category</label>
                          <select
                            value={newProdCategory}
                            onChange={(e) => setNewProdCategory(e.target.value as any)}
                            className="w-full p-2 bg-white border border-[#E7DCCB] rounded outline-none"
                          >
                            <option value="espresso">Espresso</option>
                            <option value="signature">Signature</option>
                            <option value="tea">Matcha & Tea</option>
                            <option value="cold">Cold Drinks</option>
                            <option value="pastry">Pastry</option>
                            <option value="seasonal">Seasonal</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold block mb-1">Base Price ($)</label>
                          <input
                            type="number"
                            step="0.25"
                            required
                            value={newProdPrice}
                            onChange={(e) => setNewProdPrice(Number(e.target.value))}
                            className="w-full p-2 bg-white border border-[#E7DCCB] rounded outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold block mb-1">Description</label>
                        <textarea
                          rows={2}
                          required
                          value={newProdDesc}
                          onChange={(e) => setNewProdDesc(e.target.value)}
                          placeholder="Double ristretto infused with cardamom essence..."
                          className="w-full p-2 bg-white border border-[#E7DCCB] rounded outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold block mb-1">Origin / Farm</label>
                        <input
                          type="text"
                          value={newProdOrigin}
                          onChange={(e) => setNewProdOrigin(e.target.value)}
                          placeholder="e.g. Huila, Colombia"
                          className="w-full p-2 bg-white border border-[#E7DCCB] rounded outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#35483A] text-white text-xs font-semibold rounded hover:bg-[#223126] transition-colors mt-2"
                      >
                        Publish to Menu
                      </button>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* LIVE ORDERS QUEUE TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-2xl font-medium text-[#35261F]">
                  Barista Station Orders Queue
                </h4>
                <p className="text-xs text-[#5D463B]">
                  Click status button on each order ticket to update customer live tracking.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.map((o) => (
                  <div key={o.id} className="bg-white rounded-xl border border-[#E7DCCB] p-5 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E7DCCB]">
                      <span className="font-mono font-bold text-sm text-[#35483A]">#{o.id}</span>
                      <span className="text-[11px] text-[#5D463B]">{o.customer.pickupTime}</span>
                    </div>

                    <div>
                      <h5 className="font-serif text-base font-medium text-[#35261F]">
                        {o.customer.name}
                      </h5>
                      <span className="text-[11px] text-[#5D463B]">{o.customer.phone}</span>
                    </div>

                    <div className="space-y-1.5 py-2 border-y border-[#E7DCCB]/60 text-xs">
                      {o.items.map((i, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span className="font-medium text-[#35261F]">
                            {i.quantity}x {i.product.name} ({i.size})
                          </span>
                          <span className="text-[#5D463B]">${(i.itemPrice * i.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-semibold text-[#35261F]">Total: ${o.total.toFixed(2)}</span>
                      
                      <button
                        onClick={() => {
                          if (o.status === 'received') updateOrderStatus(o.id, 'crafting');
                          else if (o.status === 'crafting') updateOrderStatus(o.id, 'ready');
                          else if (o.status === 'ready') updateOrderStatus(o.id, 'completed');
                        }}
                        className={`px-3 py-1 text-xs rounded font-medium cursor-pointer ${
                          o.status === 'ready' ? 'bg-amber-500 text-white' :
                          o.status === 'crafting' ? 'bg-blue-600 text-white' :
                          o.status === 'completed' ? 'bg-green-700 text-white' :
                          'bg-[#35261F] text-white'
                        }`}
                      >
                        {o.status === 'received' && 'Start Brewing →'}
                        {o.status === 'crafting' && 'Mark Ready →'}
                        {o.status === 'ready' && 'Hand to Patron ✓'}
                        {o.status === 'completed' && 'Completed'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RESERVATIONS TAB */}
          {activeTab === 'reservations' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-2xl font-medium text-[#35261F]">
                  Upcoming Table Reservations
                </h4>
                <p className="text-xs text-[#5D463B]">
                  Manage table allocations across Conservatory, Garden Patio, Main Bar, and Library Nook.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-[#E7DCCB] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F4EFE7] border-b border-[#E7DCCB] text-[#5D463B] uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Booking Ref</th>
                      <th className="py-3 px-4">Date & Time</th>
                      <th className="py-3 px-4">Guest</th>
                      <th className="py-3 px-4">Party Size</th>
                      <th className="py-3 px-4">Seating Area</th>
                      <th className="py-3 px-4">Special Requests</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7DCCB]/40">
                    {reservations.map(r => (
                      <tr key={r.id} className="hover:bg-[#F7F4ED]/50">
                        <td className="py-3 px-4 font-mono font-semibold text-[#35483A]">#{r.id}</td>
                        <td className="py-3 px-4">
                          <strong className="text-[#35261F] block">{r.date}</strong>
                          <span className="text-[10px] text-[#5D463B]">{r.time}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-[#35261F] block">{r.name}</span>
                          <span className="text-[10px] text-[#5D463B]">{r.phone}</span>
                        </td>
                        <td className="py-3 px-4 text-[#35261F] font-semibold">{r.guests} Guests</td>
                        <td className="py-3 px-4 text-[#5D463B]">{r.seatingPreference}</td>
                        <td className="py-3 px-4 text-[#5D463B] italic max-w-xs truncate">{r.specialRequests || 'None'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            r.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {r.status === 'confirmed' && (
                            <button
                              onClick={() => cancelReservation(r.id)}
                              className="text-[11px] text-red-600 hover:underline cursor-pointer"
                            >
                              Cancel Table
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* EVENT INQUIRIES TAB */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-2xl font-medium text-[#35261F]">
                  Private Event & Catering Requests
                </h4>
                <p className="text-xs text-[#5D463B]">
                  Review customer date inquiries for coffee carts and café buyouts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eventInquiries.map((inq) => (
                  <div key={inq.id} className="bg-white rounded-xl border border-[#E7DCCB] p-5 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E7DCCB]">
                      <span className="font-mono text-xs font-bold text-[#35483A]">#{inq.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        inq.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                        inq.status === 'quoted' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {inq.status}
                      </span>
                    </div>

                    <div>
                      <h5 className="font-serif text-lg font-medium text-[#35261F]">{inq.name}</h5>
                      <span className="text-xs text-[#5D463B]">{inq.email} · {inq.phone}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-[#F7F4ED] p-3 rounded border border-[#E7DCCB]/60">
                      <div>
                        <span className="text-[#5D463B] block">Package:</span>
                        <strong className="text-[#35261F]">{inq.packageType}</strong>
                      </div>
                      <div>
                        <span className="text-[#5D463B] block">Event Date:</span>
                        <strong className="text-[#35261F]">{inq.date}</strong>
                      </div>
                      <div>
                        <span className="text-[#5D463B] block">Guests:</span>
                        <strong className="text-[#35261F]">{inq.guests} People</strong>
                      </div>
                      <div>
                        <span className="text-[#5D463B] block">Budget:</span>
                        <strong className="text-[#35261F]">{inq.budgetRange}</strong>
                      </div>
                    </div>

                    {inq.notes && (
                      <p className="text-xs text-[#5D463B] italic">"{inq.notes}"</p>
                    )}

                    <div className="flex gap-2 pt-2 border-t border-[#E7DCCB]/60">
                      <button
                        onClick={() => updateEventInquiryStatus(inq.id, 'quoted')}
                        className="px-3 py-1.5 bg-[#35483A] text-white text-xs rounded hover:bg-[#223126]"
                      >
                        Mark Quoted
                      </button>
                      <button
                        onClick={() => updateEventInquiryStatus(inq.id, 'confirmed')}
                        className="px-3 py-1.5 bg-[#35261F] text-white text-xs rounded hover:bg-[#223126]"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CUSTOMERS & NEWSLETTER TAB */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-2xl font-medium text-[#35261F]">
                  Patrons & The Bloom Society Subscribers
                </h4>
                <p className="text-xs text-[#5D463B]">
                  Audited subscriber lists with double opt-in consent and loyalty ledger status.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Newsletter subscribers */}
                <div className="bg-white rounded-xl border border-[#E7DCCB] p-5 space-y-3">
                  <h5 className="font-serif text-lg font-medium text-[#35261F]">
                    Newsletter Subscribers ({newsletterEmails.length})
                  </h5>
                  <div className="space-y-2 text-xs">
                    {newsletterEmails.map((email, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1.5 border-b border-[#E7DCCB]/40">
                        <span className="font-mono text-[#35261F]">{email}</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                          Active · 15% Used
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Loyalty Accounts */}
                <div className="bg-white rounded-xl border border-[#E7DCCB] p-5 space-y-3">
                  <h5 className="font-serif text-lg font-medium text-[#35261F]">
                    Loyalty Member Highlights
                  </h5>
                  {loyaltyUser && (
                    <div className="p-4 bg-[#F7F4ED] rounded-lg border border-[#E7DCCB] space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <strong className="text-sm font-serif text-[#35261F]">{loyaltyUser.name}</strong>
                        <span className="font-bold text-[#35483A]">{loyaltyUser.points} Points</span>
                      </div>
                      <p className="text-[#5D463B]">{loyaltyUser.email} · Tier: {loyaltyUser.tier}</p>
                      <p className="text-[11px] text-[#6D7F60]">Member Since: {loyaltyUser.memberSince}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h4 className="font-serif text-2xl font-medium text-[#35261F]">
                  Business Settings & Policies
                </h4>
                <p className="text-xs text-[#5D463B]">
                  Configure tax parameters, active promo codes, and operating hours.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-[#E7DCCB] p-6 space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-[#35261F] block mb-1">Local Sales Tax Rate</label>
                  <input
                    type="text"
                    disabled
                    value="8.25% (New York State & Municipal standard)"
                    className="w-full p-2.5 bg-[#F7F4ED] border border-[#E7DCCB] rounded text-[#35261F]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#35261F] block mb-1">Active Store Promo Codes</label>
                  <div className="space-y-1.5 p-3 bg-[#F7F4ED] rounded border border-[#E7DCCB]">
                    <div className="flex justify-between">
                      <strong className="font-mono text-[#35483A]">BLOOM15</strong>
                      <span>15% off orders over $10.00</span>
                    </div>
                    <div className="flex justify-between">
                      <strong className="font-mono text-[#35483A]">FIRSTCUP</strong>
                      <span>$3.50 off first handcrafted drink</span>
                    </div>
                    <div className="flex justify-between">
                      <strong className="font-mono text-[#35483A]">COFFEELOVER</strong>
                      <span>10% off any order</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#35261F] block mb-1">Payment Provider Integration</label>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-900 leading-relaxed text-[11px]">
                    <strong>Stripe Gateway Status:</strong> Currently operating in verified Sandbox / Demo mode for client review. Live card captures require configuring <code>STRIPE_SECRET_KEY</code> in server proxy environment.
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
