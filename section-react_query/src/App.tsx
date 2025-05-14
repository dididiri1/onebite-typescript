import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Detail from "./page/Detail";
import New from "./page/New";
import Edit from "./page/Edit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
