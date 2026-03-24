import "./globals.css";

export const metadata = {
  title: "ML DeepDive — Master Machine Learning for Interviews",
  description: "A premium interactive ML revision platform. Think. Explain. Build. Master machine learning concepts from intuition to implementation for top interview performance.",
  keywords: "machine learning, ML interview, XGBoost, deep learning, data science, interview preparation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
