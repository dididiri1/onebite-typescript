import { useParams } from "react-router-dom";

const Detail = () => {
  const params = useParams();

  return <div>Detail {params.id}</div>;
};

export default Detail;
