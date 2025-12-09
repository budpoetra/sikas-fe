import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfile/UserProfiles";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProductEntry from "./pages/ProductEntry/ProductEntry";
import ProductEntryReport from "./pages/ReportPage/ProductEntryReport";
import Dashboard from "./pages/Dashboard/Dashboard";
import CategoryList from "./pages/category/CategoryList";
import CategoryForm from "./components/category/CategoryForm";
import ProductList from "./pages/product/ProductList";
import ProductForm from "./components/product/ProductForm";
import UsersPage from "./pages/Users/UsersPage";
import TransactionPage from "./pages/Transaction/TransactionPage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes - Redirect to dashboard if already logged in */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/" element={<PublicRoute><SignIn /></PublicRoute>} />
          <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path="/*" element={<PublicRoute><SignIn /></PublicRoute>} />

          {/* Protected Routes - Require authentication */}
          <Route element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product-entry" element={<ProductEntry />} />
            <Route path="/report/transaction" element={<TransactionPage />} />
            <Route path="/report/product-entry" element={<ProductEntryReport />} />
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/category" element={<CategoryList />} />
            <Route path="/category/create" element={<CategoryForm />} />
            <Route path="/category/edit/:id" element={<CategoryForm />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/product/create" element={<ProductForm />} />
            <Route path="/product/edit/:id" element={<ProductForm />} />
            <Route path="/transaction" element={<TransactionPage />} />
            <Route path="/users" element={<UsersPage />} />

            {/* Default Template Route */}
            {/* <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/form-elements" element={<FormElements />} />
            <Route path="/basic-tables" element={<BasicTables />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} /> */}
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
