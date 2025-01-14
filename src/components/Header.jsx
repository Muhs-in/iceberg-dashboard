// import { useAuth } from '../context/AuthContext';

// import { Layout,  Avatar, Space, Button, Tooltip } from 'antd';
// import {  LogoutOutlined,  } from '@ant-design/icons';

// const Header = () => {
//   const { user, logout } = useAuth()

//   const getInitials = (displayName) => {
//     const name = displayName.trim().split(' ');
//     if (name.length === 1) return `${name[0].charAt(0)}`;
//     return `${name[0].charAt(0)}${name[name.length - 1].charAt(0)}`;
//   };

//   const displayName = user?.displayName || 'Guest';
//   const email = user?.email || 'No Email Available';
//   const profilePicture = user?.profilePicture;

//   return (
//     <Layout.Header className="bg-white px-4 h-16 flex justify-between items-center shadow">
//       <div className="flex-1 max-w-md">
//         Welcome, {displayName}
//       </div>

//       <Space size={24} className="ml-4">
//         <Space size={12} className="items-center">
//           {profilePicture ? (
//             <Avatar 
            
//               src={user ? user?.avatar_url : ''} 
//               size={32}
//               className="shadow-sm"
//             />
//           ) : (
//             <Avatar 
//               size={32} 
//               className="bg-blue-500 shadow-sm"
//             >
//               {getInitials(displayName)}
//             </Avatar>
//           )}
//           <div className="hidden sm:block">
//             <div className="text-sm font-medium text-gray-800">
//               {displayName}
//             </div>
//             <div className="text-xs text-gray-500">
//               {email}
//             </div>
//           </div>
//         </Space>

//         <Tooltip title="Logout">
//           <Button 
//            onClick={logout}

//             type="text" 
//             icon={<LogoutOutlined />} 
//             className="flex items-center hover:text-blue-600"
//           >
//             <span className="hidden sm:inline ml-1">Logout</span>
//           </Button>
//         </Tooltip>
//       </Space>
//     </Layout.Header>
//   );
// };

// export default Header;


import { MdExitToApp } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white p-2 px-4 shadow flex justify-between items-center">
        <h2>Welcome</h2>

      <div className="flex items-center space-x-6">
        {user && (
          <div className="flex items-center space-x-2">
            <img
              src={user? user?.avatar_url : 'https://via.placeholder.com/150'}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-800">
                {user.fullname}
              </p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
          title="Logout"
        >
          <MdExitToApp className="text-lg" />
          <span className="text-sm hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;