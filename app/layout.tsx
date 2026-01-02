import './globals.css';

export const metadata = {
  title: 'Household Waste Source Segregation Piloting: Follow Up',
  description: 'Field monitoring & KPI system'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        {children}
      </body>
    </html>
  );
}
