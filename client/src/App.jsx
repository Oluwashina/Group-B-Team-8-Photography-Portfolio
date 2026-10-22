import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MainContent from "./components/MainContent";
import AuthProvider from "./context/AuthProvider.jsx";

export default function App() {
  return (
    <AuthProvider>
      <Header />
      <Hero />
      <MainContent />
      <Footer />
    </AuthProvider>
  );
}
