"use client"
import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function Page({params}:{ params: { uid: string } }) {
    const [user, setUser] = useState<any>()
    const [userString, setUserString] = useState<string>("")
    const [error, setError] = useState<string>("")
    useEffect(() => {
        const fetchUser = async () => {
            console.log(process.env.ADMIN_KEY)
            fetch(`/api/users/${params.uid}?key=test`).then(res => res.json()).then(data => {
            setUser(data.data.user)
            console.log(data)
        }
            )
        }
        fetchUser()
    }, []) 
    useEffect(() => {
        setUserString(JSON.stringify(user, null, 2))
    }, [user])
    const name = user?.user_metadata.full_name ? user?.user_metadata.full_name :  "N/A"
    const updateUser = async () => {
        fetch(`/api/users/${params.uid}?key=test`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => res.json()).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setError("")
            }  
        })
    }
    return (
        <div className='w-full h-fit flex items-start flex-col'>
            <h1 className=" p-4">User ID:  {params.uid}</h1>
            <p>Name</p>
            <Input  className="w-fit"
                value={name} 
                onChange={(e) => setUser({
                    ...user, 
                    user_metadata: {
                        ...user.user_metadata,
                        full_name: e.target.value,
                    }
                })}
            />
            <p>Email</p>
            <Input className="w-fit"
                value={user?.email} 
                onChange={(e) => setUser({
                    ...user, 
                    email: e.target.value,
                })}
            />
            <p>Role</p>
            <Select value={user?.user_metadata.role} onValueChange={(value:any) => setUser(
                {...user,
                    user_metadata: {
                        ...user.user_metadata,
                        role: value
                    }
                }

                )}>
                <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Roles" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="admin">admin</SelectItem>
                    <SelectItem value="doctor">doctor</SelectItem>
                    <SelectItem value="user">user</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <p>password</p>
            <Input className="w-fit"
                value={user?.password} 
                onChange={(e) => setUser({
                    ...user, 
                    password: e.target.value,
                })}
            />
            <p>custom</p>
            <Textarea 
                className="w-3/4 h-[500px]"
                value={userString} 
                onChange={(e) => setUserString(e.target.value)}
                onBlur={() => {
                    try {
                    const updatedUser = JSON.parse(userString);
                    setUser(updatedUser);
                    } catch (error) {
                    console.error("Invalid JSON format");
                    }
                }}
                />
            <Button onClick={updateUser}>Save</Button>
            <p>{error}</p>

        </div>
    )
}   