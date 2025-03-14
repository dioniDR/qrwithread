import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white shadow-inner py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} QR Scanner App
        </div>
      </footer>
    </div>
  );
};

export default Layout;
