import { useLocation, useNavigate, useSearchParams } from "react-router";

const SearchComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleKeyPress = (e) => {
    const query = e.target.value;
    if (e.key === "Enter" && query) {
      if (location.pathname === "/posts") {
        setSearchParams({ ...Object.fromEntries(searchParams), search: query });
      } else {
        navigate(`/posts?search=${query}`);
      }
    }
  };

  return (
    <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <title>ionicons-v5-f</title>
          <path
            d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z"
            style={{
              fill: "none",
              stroke: "#9e9e9e",
              strokeMiterlimit: 10,
              strokeWidth: "32px",
            }}
          />
          <line
            x1="338.29"
            y1="338.29"
            x2="448"
            y2="448"
            style={{
              fill: "none",
              stroke: "#9e9e9e",
              strokeLinecap: "round",
              strokeMiterlimit: 10,
              strokeWidth: "32px",
            }}
          />
        </g>
      </svg>
      <input
        type="text"
        placeholder="search a post..."
        className=" bg-transparent outline-0"
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default SearchComponent;
