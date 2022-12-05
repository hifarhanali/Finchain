import { useEth } from "../../contexts/EthContext";

const Header = () => {
  const { state, tryInit } = useEth();

  const onConnectButtonClickHandler = () => {
    tryInit();
  };

  return (
    <div>
      <header>
        <nav className="bg-amber-500 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 mb-5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Finchain
            </span>

            {state && state.artifact && state.contract ? (
              <div className="flex items-center">
                {/* avatar */}
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="./avatar.png"
                      alt=""
                    />
                  </div>
                  {/* Display Wrapped Logined User Address */}
                  <div className="ml-3 w-14">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate truncate">
                      {state.accounts[0]}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <button
                className="bg-white text-gray-800 dark:text-gray-200 dark:bg-gray-800 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={onConnectButtonClickHandler}
              >
                Connect
              </button>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
