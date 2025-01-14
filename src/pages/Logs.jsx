import moment from 'moment';
import Layout from '../layout/Layout';
import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { TfiSearch } from 'react-icons/tfi';
import { BsFilterRight } from 'react-icons/bs';
import { FaSort } from 'react-icons/fa6';
import { Button, Modal, Popover } from 'antd';
import axios from 'axios';
import usePagination from '../hooks/usePagination';
import Paginate from '../components/Paginate';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({
    action: '',
  });
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(8);
  const { currentPage } = usePagination();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const showModal = (details) => {
    setModalContent(details);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/apilogs?page=${currentPage}&limit=${limit}`
        );
        const data = response.data;
        setLogs(data.logs || []);
        setTotalItems(data.pagination?.total);
        setLimit(data.pagination.limit);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, [currentPage, limit]);

  const filteredLogs = logs
    .filter((log) => {
      const matchesSearch = log.action
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRole = !filters.action || log.action === filters.action;
      const matchesStatus = !filters.status || log.status === filters.status;
      const matchesNotification =
        !filters.notification_method ||
        log.notification_method === filters.notification_method;

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

  const actions = [...new Set(logs.map((log) => log.action))];

  const filterContent = (
    <div className="w-64 p-2">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Action
          </label>
          <select
            className="block w-full rounded-md border border-gray-300 p-2"
            value={filters.action}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, action: e.target.value }))
            }
          >
            <option value="">Action</option>
            {actions.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setFilters({ action: '' })}
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
        {['action', 'createdAt'].map((key) => (
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
      <h2>Logs</h2>

      <div className="bg-white mt-4 p-4 rounded-lg flex flex-col min-h-[calc(100vh-10rem)]">

        <div className="flex justify-between">
          <div className="relative w-full max-w-sm">
            <input
              type="search"
              placeholder="Search by log action" //add option for api
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

        {filteredLogs.length > 0 ? (
          <table className="mt-8 w-full border-collapse">
            <thead>
              <tr className="bg-[#f0f0f0] text-[#6b6b6b] text-sm font-normal">
                <th className="p-4 text-left">model name</th>
                <th className="p-4 text-left">Api id</th>
                <th className="p-4 text-left">Action</th>
                <th className="p-4 text-left">Details</th>
                <th className="p-4 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{log.model_name}</td>
                  <td className="p-4 text-[#858585]">{log.record_id}</td>
                  <td className="p-4 text-[#858585]">{log.action}</td>
                  <td className="p-4 text-[#858585]">
                    <Button type="link" onClick={() => showModal(log.details)}>
                      View Details
                    </Button>
                  </td>
                  <td className="p-4 text-[#858585]">
                    {moment(log.createdAt).format('ddd Do MMM, YYYY')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No logs found</p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        <div className="mt-auto flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {Math.min((currentPage - 1) * limit + 1, totalItems)}-
            {Math.min(currentPage * limit, totalItems)} of {totalItems} logs
          </p>

          <Paginate totalItems={totalItems} itemsPerPage={limit} />
        </div>
      </div>

      <Modal
        title="Log Details"
        visible={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            Close
          </Button>,
        ]}
      >
        <p>{modalContent}</p>
      </Modal>
    </Layout>
  );
};

export default Logs;
