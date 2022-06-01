import HashLoader from "react-spinners/HashLoader";

export default function Loading(props) {
  const { loading } = props;
  return (
    <div className="loading">
      <HashLoader color={"#0000ff"} loading={loading} size={50} />
    </div>
  );
}
