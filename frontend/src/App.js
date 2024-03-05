import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import Header from "./components/header/Header";
import { useLoading } from "./hooks/useLoading";
import Loading from "./components/Loading/Loading";
import setLoadingInterceptor from "./interceptors/loadingInterceptor";

function App() {
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, []);

  return (
    <>
      <Loading />
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;
