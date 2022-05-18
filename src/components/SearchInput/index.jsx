import "./styles.css";

export const InputSearch = ({ handleChange, searchValue }) => {
  return (
    <input
      className="input-search"
      type="search"
      onChange={handleChange}
      value={searchValue}
      placeholder="Type title card..."
    />
  );
};
