"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import Link from "next/link"
export default function Linktree(){
    const path = usePathname()
    const patharray = path.split('/').map(element => element === "" ? "/" : element);
    console.log(patharray)
    console.log(path)
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {patharray.map((item, index) => {
                    // Create the href by joining all path parts up to and including the current one
                    const href = `${patharray.slice(0, index + 1).join('/')}`;
                    console.log(href)
                    return (
                        <BreadcrumbItem key={index}>
                            <Link href={href}>{"/"+ item}</Link>
                        </BreadcrumbItem>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
