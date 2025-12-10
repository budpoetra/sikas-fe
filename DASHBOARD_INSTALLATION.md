# Dashboard Module Installation Guide

## Overview
Dashboard module telah berhasil diimplementasikan dengan komponen berikut:
- **DashboardCard**: Menampilkan summary cards untuk Total Products, Total Stock, dan Today Transactions
- **StockChart**: Bar chart untuk visualisasi stock menggunakan Recharts
- **LowStockTable**: Tabel untuk menampilkan low stock items dengan status warning
- **Dashboard**: Halaman utama dashboard yang mengintegrasikan semua komponen

## File Structure Created

```
src/
├── services/
│   └── dashboardService.ts          # API service untuk dashboard
├── components/
│   └── dashboard/
│       ├── DashboardCard.tsx        # Reusable card component
│       ├── StockChart.tsx           # Chart component dengan Recharts
│       └── LowStockTable.tsx        # Table component untuk low stock
└── pages/
    └── Dashboard/
        └── Dashboard.tsx            # Main dashboard page
```

## Installation Steps

### 1. Install Recharts Library

Karena PowerShell execution policy, silakan install recharts secara manual menggunakan salah satu cara berikut:

#### Option 1: Menggunakan Git Bash atau Command Prompt (bukan PowerShell)
```bash
npm install recharts
```

#### Option 2: Menggunakan PowerShell dengan Bypass
```powershell
powershell -ExecutionPolicy Bypass -Command "npm install recharts"
```

#### Option 3: Set PowerShell Execution Policy (Permanent)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
npm install recharts
```

### 2. Verify Installation
Setelah instalasi, pastikan `recharts` muncul di `package.json`:
```json
"dependencies": {
  "recharts": "^2.x.x"
}
```

## API Endpoint Required

Dashboard memerlukan endpoint API berikut:

```
GET http://localhost:8080/api/v1/dashboard/summary
```

### Expected Response Format:
```json
{
  "success": true,
  "message": "Dashboard summary retrieved successfully",
  "data": {
    "totalProducts": 100,
    "totalStock": 5000,
    "todayTransactions": 25,
    "lowStockItems": [
      {
        "id": 1,
        "productName": "Product Name",
        "stock": 5,
        "category": "Category Name (optional)"
      }
    ]
  }
}
```

## Features Implemented

### 1. **Summary Cards**
- Total Products dengan Product Icon
- Total Stock dengan Stock Icon  
- Today Transactions dengan Transaction Icon
- Gradient background (indigo/sky/cyan)
- Responsive grid (3 columns desktop, 1 column mobile)
- Smooth hover effects

### 2. **Stock Chart**
- Bar chart menggunakan Recharts
- Gradient fill (indigo to sky blue)
- Smooth animations
- Responsive container
- Tooltip dengan custom styling
- Shows top 10 low stock items

### 3. **Low Stock Table**
- Clean table design dengan Tailwind
- Color-coded status badges:
  - **Critical** (red): stock ≤ 5
  - **Low** (yellow): stock ≤ 10
  - **Normal** (green): stock > 10
- Hover effects
- Warning background untuk critical items
- Responsive overflow

### 4. **Loading & Error States**
- Loading spinner saat fetch data
- Error message dengan retry button
- User-friendly error handling

## Design Features

### Color Scheme
- Primary: Indigo (#6366f1)
- Secondary: Sky Blue (#0ea5e9)
- Accent: Cyan (#06b6d4)
- Text: Gray shades
- Backgrounds: White / Dark mode support

### Styling
- Rounded corners (rounded-xl)
- Shadow effects (shadow-lg)
- Gradient backgrounds
- Smooth transitions
- Dark mode support

## Usage

1. Navigate to `/dashboard` route
2. Data akan di-fetch otomatis dari API
3. Summary cards akan menampilkan data agregat
4. Chart akan menampilkan 10 produk dengan stock terendah
5. Table akan menampilkan semua low stock items

## Routing

Dashboard sudah ditambahkan ke routing di `App.tsx`:
```tsx
<Route path="/dashboard" element={<Dashboard />} />
```

## Testing

Untuk menguji dashboard:

```bash
# 1. Install dependencies (termasuk recharts)
npm install recharts

# 2. Pastikan backend API running di http://localhost:8080
# 3. Start development server
npm run dev

# 4. Login dan navigate ke /dashboard
```

## Troubleshooting

### Jika Chart tidak muncul:
1. Pastikan `recharts` sudah terinstall
2. Check console untuk error messages
3. Verify API response structure sesuai format yang diharapkan

### Jika API error:
1. Pastikan backend server running
2. Check endpoint URL di `dashboardService.ts`
3. Verify token authentication

### Jika styling tidak sesuai:
1. Pastikan Tailwind CSS sudah configured
2. Check dark mode settings
3. Clear cache dan rebuild: `npm run build`

## Next Steps

Fitur tambahan yang bisa dikembangkan:
- Date range filter untuk transactions
- Export data ke PDF/Excel
- Real-time updates dengan WebSocket
- More chart types (Line, Pie, etc.)
- Advanced filtering & search

## Notes

- Dashboard menggunakan TypeScript untuk type safety
- Semua komponen fully responsive
- Dark mode fully supported
- Icons menggunakan SVG inline (dapat diganti dengan icon library seperti react-icons)
- API calls menggunakan axios dengan authentication interceptor
