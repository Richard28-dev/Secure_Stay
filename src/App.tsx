import { RouterProvider, useRouter } from './context/RouterContext';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PropertyCompareDrawer from './components/common/PropertyCompareDrawer';

// Pages
import HomePage from './pages/HomePage';
import BuyPage from './pages/BuyPage';
import RentPage from './pages/RentPage';
import SearchPage from './pages/SearchPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import SavedPropertiesPage from './pages/SavedPropertiesPage';
import ListPropertyPage from './pages/ListPropertyPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AgentDashboardPage from './pages/AgentDashboardPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

function AppContent() {
  const { currentPath } = useRouter();

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/buy':
        return <BuyPage />;
      case '/rent':
        return <RentPage />;
      case '/search':
        return <SearchPage />;
      case '/property':
        return <PropertyDetailsPage />;
      case '/saved':
        return <SavedPropertiesPage />;
      case '/list-property':
        return <ListPropertyPage />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      case '/signin':
        return <SignInPage />;
      case '/signup':
        return <SignUpPage />;
      case '/dashboard':
        return <UserDashboardPage />;
      case '/agent-dashboard':
        return <AgentDashboardPage />;
      case '/privacy':
        return <PrivacyPolicyPage />;
      case '/terms':
        return <TermsPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1F2421]">
      <Navbar />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <PropertyCompareDrawer />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <PropertyProvider>
          <AppContent />
        </PropertyProvider>
      </AuthProvider>
    </RouterProvider>
  );
}
