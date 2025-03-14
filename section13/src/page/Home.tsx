import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";

const Home = () => {
  return (
    <div>
      <Header
        title={"2025년 3월"}
        leftChild={<Button text={"<"} />}
        rightChild={<Button text={">"} />}
      ></Header>
      <DiaryList />
    </div>
  );
};

export default Home;
