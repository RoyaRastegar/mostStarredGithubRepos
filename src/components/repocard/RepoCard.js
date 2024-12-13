import { IoStar } from 'react-icons/io5';
const RepoCard = ({ repo, key }) => {
  return (
    <div
      key={key}
      className='bg-white rounded-lg shadow-lg px-5 py-5 border-b-2 w-full  mx-auto '
    >
      <div className='mb-4'>
        <h2 className='text-xl font-semibold text-gray-800'>{repo.name}</h2>
        <p className='text-gray-600 text-sm'>{repo.description}</p>
      </div>
      <div className='flex justify-between'>
        {' '}
        <div className='flex items-center mb-4'>
          <img
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            className='w-12 h-12 rounded-full'
          />
          <a
            href={repo.owner.html_url}
            target='_blank'
            rel='noopener noreferrer'
            className='ml-3 text-lg text-blue-500 hover:underline'
          >
            {repo.owner.login}
          </a>
        </div>
        <div className='flex  items-center text-gray-500'>
          <span className='flex items-center'>
            <IoStar />
            {repo.stargazers_count}
          </span>
        </div>
      </div>
    </div>
  );
};
export default RepoCard;
