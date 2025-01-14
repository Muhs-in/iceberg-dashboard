import moment from 'moment';
import Layout from '../layout/Layout';
import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { TfiSearch } from 'react-icons/tfi';
import { BsFilterRight } from 'react-icons/bs';
import { FaSort } from 'react-icons/fa6';
import { Popover } from 'antd';
import axios from 'axios';
import DeleteApi from '../modals/delete/deleteApi';
import AddApi from '../modals/add/addApi';
import UpdateApi from '../modals/update/UpdateApi';
import usePagination from '../hooks/usePagination';
import Paginate from '../components/Paginate';

const Apis = () => {
  const [apis, setApis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({
    method: '',
    status: '',
    subscription_type: '',
  });
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(8);
  const { currentPage } = usePagination();

  useEffect(() => {
    const fetchApis = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/api_configs?page=${currentPage}&limit=${limit}`
        );
        const data = response.data;
        setApis(data.apis || []);
        setTotalItems(data.pagination?.total);
        setLimit(data.pagination.limit);
      } catch (error) {
        console.error('Error fetching APIs:', error);
      }
    };

    fetchApis();
  }, [currentPage, limit]);

  const filteredApis = apis
    .filter((api) => {
      const matchesSearch = api.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus = !filters.status || api.status === filters.status;
      const matchesSubscription =
        !filters.subscription_type ||
        api.subscription_type === filters.subscription_type;

      return matchesSearch && matchesStatus && matchesSubscription;
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

  const statuses = [...new Set(apis.map((api) => api.status))];
  const subscriptionTypes = [
    ...new Set(apis.map((api) => api.subscription_type)),
  ];

  const filterContent = (
    <div className="w-64 p-2">
      <div className="space-y-4">
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
            Subscription Type
          </label>
          <select
            className="block w-full rounded-md border border-gray-300 p-2"
            value={filters.subscription_type}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                subscription_type: e.target.value,
              }))
            }
          >
            <option value="">All</option>
            {subscriptionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() =>
            setFilters({ method: '', status: '', subscription_type: '' })
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
        {['name', 'method', 'status', 'createdAt'].map((key) => (
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

  //   return (
  //     <Layout>
  //       <div className="flex justify-between">
  //         <h2>Apis</h2>
  //         <div className="flex gap-6 items-center px-4">
  //           <AddApi />
  //         </div>
  //       </div>

  //       <div className="bg-white mt-4 p-4 rounded-lg">
  //         <div className="flex justify-between">
  //           <div className="relative w-full max-w-sm">
  //             <input
  //               type="search"
  //               placeholder="Search by API name"
  //               className="w-full px-12 py-2 rounded border border-[#c8c8c8] opacity-100"
  //               value={searchTerm}
  //               onChange={(e) => setSearchTerm(e.target.value)}
  //             />
  //             <TfiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
  //             {searchTerm && (
  //               <button
  //                 onClick={() => setSearchTerm('')}
  //                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
  //               >
  //                 <FiX className="w-4 h-4" />
  //               </button>
  //             )}
  //           </div>
  //           <div className="flex gap-4">
  //             <Popover
  //               content={filterContent}
  //               trigger="click"
  //               placement="bottomRight"
  //               overlayClassName="filter-popover"
  //             >
  //               <button className="py-2 flex gap-2 items-center border border-[#c8c8c8] px-4 rounded hover:bg-gray-50">
  //                 <BsFilterRight />
  //                 Filter
  //               </button>
  //             </Popover>

  //             <Popover
  //               content={sortContent}
  //               trigger="click"
  //               placement="bottomRight"
  //               overlayClassName="sort-popover"
  //             >
  //               <button className="py-2 flex gap-2 items-center border border-[#c8c8c8] px-4 rounded hover:bg-gray-50">
  //                 <FaSort />
  //                 Sort
  //               </button>
  //             </Popover>
  //           </div>
  //         </div>

  //         {filteredApis.length > 0 ? (
  //           <table className="mt-8 w-full border-collapse">
  //             <thead>
  //               <tr className="bg-[#f0f0f0] text-[#6b6b6b] text-sm font-normal">
  //                 <th className="p-4 text-left">Name</th>
  //                 <th className="p-4 text-left">Method</th>
  //                 <th className="p-4 text-left">Subscription type</th>
  //                 <th className="p-4 text-left">Subscription date</th>

  //                 <th className="p-4 text-left">Status</th>
  //                 <th className="p-4 text-left">Created at</th>
  //                 <th className="p-4 text-left">Last checked</th>
  //                 <th className="p-4 text-left">Actions</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {filteredApis.map((api) => (
  //                 <tr key={api.name} className="border-b hover:bg-gray-50">
  //                   <td className="p-4">{api.name}</td>
  //                   <td className="p-4 text-[#858585]">{api.method}</td>
  //                   <td className="p-4 text-[#858585]">
  //                     {api.subscription_type}
  //                   </td>
  //                   <td className="p-4 text-[#858585]">
  //                     {api.subscription_date
  //                       ? moment(api.subscription_date).format('ddd Do MMM, YYYY')
  //                       : 'N/A'}
  //                   </td>

  //                   <td className="p-4 text-[#858585]">{api.status}</td>
  //                   <td className="p-4 text-[#858585]">
  //                     {api.createdAt
  //                       ? moment(api.createdAt).format('ddd Do MMM, YYYY')
  //                       : 'N/A'}
  //                   </td>
  //                   <td className="p-4 text-[#858585]">
  //                     {api.lastChecked
  //                       ? moment(api.lastChecked).format('ddd Do MMM, h:mm A')
  //                       : 'No data available'}
  //                   </td>
  //                   <td className="p-4">
  //   <div className="flex gap-3">
  //     <UpdateApi configId={api.id} />
  //     <DeleteApi configId={api.id} />
  //   </div>
  // </td>

  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         ) : (
  //           <div className="text-center py-12 text-gray-500">
  //             <p className="text-lg">No APIs found</p>
  //             <p className="text-sm mt-2">Try adjusting your search or filters</p>
  //           </div>
  //         )}
  //       </div>

  //       <Paginate totalItems={totalItems} itemsPerPage={limit}/>
  //     </Layout>
  //   );
  return (
    <Layout>
      <div className="flex justify-between">
        <h2>Apis</h2>
        <div className="flex gap-6 items-center px-4">
          <AddApi />
        </div>
      </div>

      <div className="bg-white mt-4 p-4 rounded-lg flex flex-col min-h-[calc(100vh-10rem)]">
        {/* Search and Filter Section */}
        <div className="flex justify-between">
          <div className="relative w-full max-w-sm">
            <input
              type="search"
              placeholder="Search by API name"
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

        {/* Table Section */}
        {filteredApis.length > 0 ? (
          <table className="mt-8 w-full border-collapse">
            <thead>
              <tr className="bg-[#f0f0f0] text-[#6b6b6b] text-sm font-normal">
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Method</th>
                <th className="p-4 text-left">Subscription type</th>
                <th className="p-4 text-left">Subscription date</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Created at</th>
                <th className="p-4 text-left">Last checked</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApis.map((api) => (
                <tr key={api.name} className="border-b hover:bg-gray-50">
                  <td className="p-4">{api.name}</td>
                  <td className="p-4 text-[#858585]">{api.method}</td>
                  <td className="p-4 text-[#858585]">
                    {api.subscription_type}
                  </td>
                  <td className="p-4 text-[#858585]">
                    {api.subscription_date
                      ? moment(api.subscription_date).format('ddd Do MMM, YYYY')
                      : 'N/A'}
                  </td>
                  <td className="p-4 text-[#858585]">{api.status}</td>
                  <td className="p-4 text-[#858585]">
                    {api.createdAt
                      ? moment(api.createdAt).format('ddd Do MMM, YYYY')
                      : 'N/A'}
                  </td>
                  <td className="p-4 text-[#858585]">
                    {api.lastChecked
                      ? moment(api.lastChecked).format('ddd Do MMM, h:mm A')
                      : 'No data available'}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <UpdateApi configId={api.id} />
                      <DeleteApi configId={api.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12 text-gray-500 flex-grow">
            <p className="text-lg">No APIs found</p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Pagination Section */}
        <div className="mt-auto flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {Math.min((currentPage - 1) * limit + 1, totalItems)}-
            {Math.min(currentPage * limit, totalItems)} of {totalItems} apis
          </p>

          <Paginate totalItems={totalItems} itemsPerPage={limit} />
        </div>
      </div>
    </Layout>
  );
};

export default Apis;
