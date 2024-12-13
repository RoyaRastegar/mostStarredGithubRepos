import { useEffect, useState } from 'react';
import { IoSettingsSharp } from 'react-icons/io5';
import { IoStar } from 'react-icons/io5';
import Pagination from '../pagination/Pagination';
import RepoCard from '../repocard/RepoCard';
const Home = () => {
  const [date, setDate] = useState({ today: '', tenDaysAgo: '' });
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const reposPerPage = 30;
  // get current date
  const getDate = () => {
    const today = new Date();
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(today.getDate() - 10);
    const formatDate = (date) => date.toISOString().split('T')[0];
    return {
      today: formatDate(today),
      tenDaysAgo: formatDate(tenDaysAgo),
    };
    // const formatDate = (date) => {
    //   const month = date.getMonth() + 1;
    //   const day = date.getDate();
    //   const year = date.getFullYear();
    //   return `${month < 10 ? '0' + month : month}/${
    //     day < 10 ? '0' + day : day
    //   }/${year}`;
    // };
  };

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        // `https://api.github.com/search/repositories?q=created:>${date.tenDaysAgo}&sort=stars&order=desc`
        `https://api.github.com/search/repositories?q=created:>${date.tenDaysAgo}&sort=stars&order=desc&page=${page}&per_page=${reposPerPage}`
      );
      const data = await response.json();
      console.log(data);
      setRepos(data.items); // ذخیره کردن رپوزیتوری‌ها
      setTotalPages(Math.ceil(data.total_count / reposPerPage)); // محاسبه تعداد صفحات
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setDate(getDate());
  }, []);
  useEffect(() => {
    if (date.tenDaysAgo) {
      fetchData(currentPage);
    }
  }, [currentPage, date]);
  return (
    <div className='bg-white  rounded-md h-full  grid grid-rows-[100px_1fr_100px] sm:grid-rows-[90px_1fr_90px]'>
      <div className='bg-gray-200   flex items-center justify-center'>
        <p className='text-xl font-bold'>Today: {date.today}</p>
      </div>

      <div className='bg-green-200  flex items-center justify-center'>
        <h1>lss</h1>
      </div>

      <div className='bg-gray-200 flex items-center  justify-around'>
        <span className='flex flex-col items-center text-blue-700'>
          <IoStar className='text-3xl ' />
          Trending
        </span>
        <span className='flex flex-col items-center text-xl text-gray-500'>
          {' '}
          <IoSettingsSharp className='text-3xl' />
          Setting
        </span>
      </div>
    </div>
  );
};
export default Home;
