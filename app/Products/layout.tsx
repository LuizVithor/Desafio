import { ReactNode } from "react"
import Sidebar from "@/common/components/Products/SideBar"

const ProductsLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Sidebar />
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    paddingTop: "64px"
                }}
            >
                {children}
            </div>
        </>
    )
}

export default ProductsLayout