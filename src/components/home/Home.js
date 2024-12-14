import { useEffect, useState, useCallback } from 'react';
import RepoCard from '../repocard/RepoCard';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Pagination } from 'flowbite-react';
import { Spinner } from 'flowbite-react';
const Home = () => {
  //#regionconst
  const [date, setDate] = useState({ today: '', tenDaysAgo: '' });
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const reposPerPage = 30;
  //#endregion
  // #regionhook
  const onPageChange = (page) => setCurrentPage(page);
  const fetchData = useCallback(
    async (page) => {
      if (!date.tenDaysAgo) return;

      setLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/search/repositories?q=created:>${date.tenDaysAgo}&sort=stars&order=desc&page=${page}&per_page=${reposPerPage}`
        );
        const data = await response.json();
        setRepos(data.items || []);
        setTotalPages(Math.ceil(data.total_count / reposPerPage));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    },
    [date.tenDaysAgo]
  );

  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData, currentPage]);

  useEffect(() => {
    const getDate = () => {
      const today = new Date();
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(today.getDate() - 10);
      const formatDate = (date) => date.toISOString().split('T')[0];
      return {
        today: formatDate(today),
        tenDaysAgo: formatDate(tenDaysAgo),
      };
    };
    setDate(getDate());
  }, []);
  // #endregionhook
  return (
    <div className='h-screen flex flex-col lg:w-1/2 m-auto lg:border'>
      <Header today={date.today} />
      <div className=' flex-1 overflow-y-auto  items-center justify-center'>
        {loading ? (
          <div className='text-center'>
            <Spinner
              className='text-9xl mt-96 lg:mt-56'
              aria-label='Center-aligned spinner example'
            />
          </div>
        ) : (
          <>
            <div>
              {repos.map((repo) => (
                <RepoCard repo={repo} />
              ))}
            </div>
            <div className='flex overflow-x-auto sm:justify-center'>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                showIcons
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default Home;
