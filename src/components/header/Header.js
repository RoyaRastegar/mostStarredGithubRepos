const Header = ({ today }) => {
  return (
    <div className='bg-gray-200 flex items-center w-full flex-none justify-around text-center h-14 '>
      <p className='text-xl font-bold'>Today: {today}</p>
    </div>
  );
};
export default Header;
