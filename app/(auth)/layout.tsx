interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return <section className="h-screen flex-center">{children}</section>;
};

export default Layout;
