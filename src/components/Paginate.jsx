import { Pagination } from 'antd';
import usePagination from '../hooks/usePagination'; 

const Paginate = ({ totalItems, itemsPerPage = 10 }) => {
  const { currentPage, updatePage } = usePagination();

  const handleChange = (page) => {
    updatePage(page);
  };

  return (
   <div className='mt-2'>
     <Pagination
      current={currentPage}
      total={totalItems}
      pageSize={itemsPerPage}
      onChange={handleChange}
      showSizeChanger={false} 
      showQuickJumper
    />
   </div>
  );
};

export default Paginate;
