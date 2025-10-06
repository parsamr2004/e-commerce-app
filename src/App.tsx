// import { Badge } from "./components/ui/badge";
import { ThemeProvider } from "./components/ui/darkmode/theme-provider";
import Layout from "./Layout";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <div>
          <h1>صفحه اصلی</h1>
        </div>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
