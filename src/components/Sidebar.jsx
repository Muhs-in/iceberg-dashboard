import {
  HiOutlineChevronLeft,
  HiOutlineHome,
  HiOutlineCog,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
  HiOutlineQuestionMarkCircle,
  HiOutlineAdjustmentsHorizontal,
} from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navSections = [
    {
      title: 'GENERAL',
      links: [
        { name: 'Dashboard', icon: <HiOutlineHome />, href: '/' },
        { name: 'Apis', icon: <HiOutlineCog />, href: '/apis' },
        { name: 'Users', icon: <HiOutlineUsers />, href: '/users' },
        { name: 'Logs', icon: <HiOutlineDocumentText />, href: '/logs' },
      ],
    },
    {
      title: 'SUPPORT',
      links: [
        { name: 'Settings', icon: <HiOutlineAdjustmentsHorizontal />, href: '/settings' },
        { name: 'Security', icon: <HiOutlineShieldCheck />, href: '/security' },
        { name: 'Help', icon: <HiOutlineQuestionMarkCircle />, href: '/help' },
      ],
    },
  ];

  return (
    <div className="w-[280px] bg-white text-gray-800 border-r border-gray-200 h-screen">
      <div className="flex justify-between items-center py-3 px-4">
        <h2 className="text-xl font-bold text-[#6d63d4]">Logo</h2>
        {/* <HiOutlineChevronLeft className="text-xl text-gray-400 cursor-pointer" /> */}
      </div>

      {/* <hr className="border-gray-200" /> */}

      {navSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="py-2 px-4">
          <h2 className="py-3 text-sm font-semibold text-gray-500">
            {section.title}
          </h2>
          <ul className="space-y-2">
            {section.links.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 rounded-md py-2 px-2 text-sm ${
                      isActive
                        ? 'bg-gray-100 text-[#6d63d4]' 
                        : 'text-gray-800 hover:bg-gray-100' 
                    }`
                  }
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          {sectionIndex < navSections.length - 1 && (
            <hr className="border-gray-200 my-2" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
