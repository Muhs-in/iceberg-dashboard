import moment from 'moment';
import Layout from '../layout/Layout';
import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { TfiSearch } from 'react-icons/tfi';
import { BsFilterRight } from 'react-icons/bs';
import { FaSort } from 'react-icons/fa6';
import { Popover } from 'antd';
import axios from 'axios';
import AddUser from '../modals/add/AddUser';
import UpdateUser from '../modals/update/UpdateUser';
import DeleteUser from '../modals/delete/DeleteUser';
import usePagination from '../hooks/usePagination';
import Paginate from '../components/Paginate';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    notification_method: '',
  });
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(8);
  const { currentPage } = usePagination();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users?page=${currentPage}&limit=${limit}`
        );
        const data = response.data;
        setUsers(data.users || []);
        setTotalItems(data.pagination?.total);
        setLimit(data.pagination.limit);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [currentPage, limit]);

  // Filter users based on search term and filters
  const filteredUsers = users
    .filter((user) => {
      const matchesSearch = user.fullname
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRole = !filters.role || user.role === filters.role;
      const matchesStatus = !filters.status || user.status === filters.status;
      const matchesNotification =
        !filters.notification_method ||
        user.notification_method === filters.notification_method;

      return (
        matchesSearch && matchesRole && matchesStatus && matchesNotification
      );
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;

      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Get unique values for filters
  const roles = [...new Set(users.map((user) => user.role))];
  const statuses = [...new Set(users.map((user) => user.status))];
  const notificationMethods = [
    ...new Set(users.map((user) => user.notification_method)),
  ];

  // Filter content
  const filterContent = (
    <div className="w-64 p-2">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            className="block w-full rounded-md border border-gray-300 p-2"
            value={filters.role}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, role: e.target.value }))
            }
          >
            <option value="">All</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            className="block w-full rounded-md border border-gray-300 p-2"
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option value="">All</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notification Method
          </label>
          <select
            className="block w-full rounded-md border border-gray-300 p-2"
            value={filters.notification_method}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                notification_method: e.target.value,
              }))
            }
          >
            <option value="">All</option>
            {notificationMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() =>
            setFilters({ role: '', status: '', notification_method: '' })
          }
          className="w-full mt-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );

  // Sort content
  const sortContent = (
    <div className="w-48 p-2">
      <div className="space-y-1">
        {['fullname', 'role', 'status', 'createdAt'].map((key) => (
          <button
            key={key}
            onClick={() => handleSort(key)}
            className={`w-full px-4 py-2 text-left text-sm rounded hover:bg-gray-100 ${
              sortConfig.key === key
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700'
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
            {sortConfig.key === key && (
              <span className="ml-2">
                {sortConfig.direction === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="flex justify-between">
        <h2>Users</h2>
        <div className="flex gap-6 items-center px-4">
          <AddUser />
        </div>
      </div>

      {/* <div className="bg-white mt-4 p-4 rounded-lg"> */}
    <div className="bg-white mt-4 p-4 rounded-lg flex flex-col min-h-[calc(100vh-10rem)]">

        <div className="flex justify-between">
          <div className="relative w-full max-w-sm">
            <input
              type="search"
              placeholder="Search by User name"
              className="w-full px-12 py-2 rounded border border-[#c8c8c8] opacity-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TfiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex gap-4">
            <Popover
              content={filterContent}
              trigger="click"
              placement="bottomRight"
              overlayClassName="filter-popover"
            >
              <button className="py-2 flex gap-2 items-center border border-[#c8c8c8] px-4 rounded hover:bg-gray-50">
                <BsFilterRight />
                Filter
              </button>
            </Popover>

            <Popover
              content={sortContent}
              trigger="click"
              placement="bottomRight"
              overlayClassName="sort-popover"
            >
              <button className="py-2 flex gap-2 items-center border border-[#c8c8c8] px-4 rounded hover:bg-gray-50">
                <FaSort />
                Sort
              </button>
            </Popover>
          </div>
        </div>

        {filteredUsers.length > 0 ? (
          <table className="mt-8 w-full border-collapse">
            <thead>
              <tr className="bg-[#f0f0f0] text-[#6b6b6b] text-sm font-normal">
                {/* <th className="p-4">
                  <input type="checkbox" className="w-6 h-6 text-[#434343]" />
                </th> */}
                <th className="p-4 text-left">Full Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Notification Method</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Created At</th>
                <th className="p-4 text-left">Updated At</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  {/* <td className="p-4">
                    <input type="checkbox" className="w-6 h-6 text-[#434343]" />
                  </td> */}
                  <td className="p-4">{user.fullname}</td>
                  <td className="p-4 text-[#858585]">{user.email}</td>
                  <td className="p-4 text-[#858585]">{user.role}</td>
                  <td className="p-4 text-[#858585]">
                    {user.notification_method}
                  </td>
                  <td className="p-4 text-[#858585]">{user.status}</td>
                  <td className="p-4 text-[#858585]">
                    {moment(user.createdAt).format('ddd Do MMM, YYYY')}
                  </td>
                  <td className="p-4 text-[#858585]">
                    {moment(user.UpdatedAt).format('ddd Do MMM, YYYY')}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      {/* <button
                        className="px-3 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-200"
                        title="Update User"
                      >
                        Update
                      </button> */}
                      <UpdateUser configId={user?.id}/>
                      {/* <button className="py-2 bg-red-600 text-white flex gap-2 items-center border border-[#c8c8c8] px-4 rounded hover:bg-red-700">
                        Delete
                      </button> */}
                      <DeleteUser />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12 text-gray-500 flex-grow">
            <p className="text-lg">No Users found</p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}

             {/* Pagination Section */}
      {/* Pagination Section */}
      <div className="mt-auto flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Showing {Math.min((currentPage - 1) * limit + 1, totalItems)}-
          {Math.min(currentPage * limit, totalItems)} of {totalItems} users
        </p>
        <Paginate totalItems={totalItems} itemsPerPage={limit} />
      </div>
      </div>

 
    </Layout>
  );
};

export default Users;
