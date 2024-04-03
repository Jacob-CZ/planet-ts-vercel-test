import BubbleBackground from "@/components/bubbleBG";
export default function Layout({ children }:{children: React.ReactNode}) {
    console.log("layout")
    return (
        <BubbleBackground>{children}</BubbleBackground>
    );
    }