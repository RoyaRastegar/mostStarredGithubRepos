import { IoSettingsSharp } from 'react-icons/io5';
import { IoStar } from 'react-icons/io5';

const Footer = () => {
  return (
    <div className='bg-gray-200 flex items-center w-full flex-none justify-around '>
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
  );
};
export default Footer;
