import { ProSidebarProvider } from 'react-pro-sidebar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/global.css';

export default function App({ Component: Page, pageProps }) {
  return (
    <ProSidebarProvider>
      <div className="flex flex-col bg-slate-800 h-[100vh]">
        <Header />
        <Page {...pageProps} />
        <Footer />
      </div>
    </ProSidebarProvider>
  );
}
