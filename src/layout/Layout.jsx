import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#f9fafb]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
