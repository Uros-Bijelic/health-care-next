interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return <section className="h-full border-2 border-cyan-500">{children}</section>;
};

export default Layout;
