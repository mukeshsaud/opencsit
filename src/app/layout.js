import { DM_Sans,Antic_Didone, Manrope } from "next/font/google";
import "./globals.css";
import Footer from "@/component/footer.jsx";
import Header from "@/component/header";
import Navbar from "@/component/Navbar";
import 'katex/dist/katex.min.css';


const dmSans=DM_Sans({
  subsets:['latin'],
  weight:['400','500','600','700'],
  variable:"--font-dmsans"
})
const anticDidone=Antic_Didone({
    subsets:['latin'],
    weight:['400'],
    variable:"--font-antic"
})
const manrope= Manrope({
  subsets:['latin'],
   weight: ["200", "300", "400", "500", "600", "700", "800"],
 variable:"--font-manrope"

})

export const metadata = {
  title: "Open Csit",
  description: "for bsc.csit students",
  icons:{
      icon:"/favicon.svg", //for web browser
      apple:"/favicon.png" //iphone
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${anticDidone.variable} ${manrope.variable}`}>
   

      <body className={`min-h-full flex flex-col ${dmSans.className} gap-5`}>
        <Header />
           <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
